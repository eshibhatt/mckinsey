import { NextFunction, Request, Response } from 'express';

const roleMiddleware = (requiredRole: string) => {
	return (req: Request, res: Response, next: NextFunction) => {
		const userRole = req.body.user?.role;

		if (!userRole || userRole !== requiredRole) {
			return res.status(403).json({ message: 'Access denied. You do not have the required role.' });
		}

		next();
	};
};

export default roleMiddleware;
