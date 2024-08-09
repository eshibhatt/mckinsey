import bcrypt from 'bcryptjs';
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import Account from '../models/accountModel';

export const register = async (req: Request, res: Response) => {
	const { username, password, role } = req.body;

	try {
		const hashedPassword = await bcrypt.hash(password, 10);
		const account = new Account({ username, password: hashedPassword, role });
		await account.save();

		res.status(201).json({ message: 'User registered successfully.' });
	} catch (error: any) {
		res.status(400).json({ error: error.message });
	}
};

export const login = async (req: Request, res: Response) => {
	const { username, password } = req.body;

	try {
		const account = await Account.findOne({ username });
		if (!account || !(await bcrypt.compare(password, account.password))) {
			return res.status(401).json({ message: 'Invalid username or password.' });
		}

		const token = jwt.sign({ id: account._id, role: account.role }, process.env.JWT_SECRET!, {
			expiresIn: '1h',
		});

		res.status(200).json({ token });
	} catch (error: any) {
		res.status(400).json({ error: error.message });
	}
};
