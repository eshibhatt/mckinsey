import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export const protect = (req: Request, res: Response, next: NextFunction) => {
	let token;

	if (req.cookies.token) {
		token = req.cookies.token;
	}

	if (!token) {
		return res.status(401).json({ message: 'Not authorized, no token' });
	}

	try {
		const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
		req.body.user = decoded; // Attach decoded user information to request
		next();
	} catch (error) {
		res.status(401).json({ message: 'Not authorized, token failed' });
	}
};
