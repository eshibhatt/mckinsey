import bcrypt from 'bcryptjs';
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import Account from '../models/accountModel';
import { accountLoginSchema, accountSchema } from '../validator/accountValidator';

export const register = async (req: Request, res: Response) => {
	const validation = accountSchema.safeParse(req.body);
	if (!validation.success) {
		return res.status(400).json({ errors: validation.error.errors });
	}
	if (!req.body.role) {
		req.body.role = 'Delivery Admin';
	}

	try {
		const { username, password, role } = req.body;

		const existingAccount = await Account.findOne({ username }).exec();
		if (existingAccount) {
			return res.status(400).json({ message: 'Username is already taken.' });
		}
		const hashedPassword = await bcrypt.hash(password, 10);
		const account = new Account({ username, password: hashedPassword, role });
		await account.save();

		res.status(201).json({ message: 'User registered successfully.' });
	} catch (error) {
		if (error instanceof Error) {
			res.status(400).json({ error: error.message });
		} else {
			res.status(400).json({ error: 'An unexpected error occurred' });
		}
	}
};

export const login = async (req: Request, res: Response) => {
	const validation = accountLoginSchema.safeParse(req.body);
	if (!validation.success) {
		return res.status(400).json({ errors: validation.error.errors });
	}

	try {
		const { username, password } = req.body;

		const user = await Account.findOne({ username });
		if (!user) {
			return res.status(401).json({ message: 'Invalid credentials' });
		}

		const isMatch = await bcrypt.compare(password, user.password);
		if (!isMatch) {
			return res.status(401).json({ message: 'Invalid credentials' });
		}

		const token = jwt.sign(
			{ userId: user._id, role: user.role },
			process.env.JWT_SECRET as string,
			{
				expiresIn: '1d',
			}
		);

		res.cookie('token', token, {
			httpOnly: true,
			secure: process.env.NODE_ENV === 'production',
			maxAge: 24 * 60 * 60 * 1000,
			sameSite: 'strict',
		});

		res.status(200).json({ message: 'Logged in successfully' });
	} catch (error) {
		if (error instanceof Error) {
			res.status(500).json({ error: error.message });
		} else {
			res.status(500).json({ error: 'An unknown error occurred' });
		}
	}
};

export const logout = (req: Request, res: Response) => {
	if (!req.cookies.token) {
		return res.status(400).json({ message: 'User is not logged in' });
	}

	res.cookie('token', '', {
		httpOnly: true,
		expires: new Date(0),
		sameSite: 'strict',
	});

	res.status(200).json({ message: 'Logged out successfully' });
};
