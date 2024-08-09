import { Request, Response } from 'express';
import Question from '../models/Questions'


export const createQuestion = async (req: Request, res: Response) => {
	try {
		const question = new Question(req.body);
		await question.save();
		res.status(201).json(question);
	} catch (error) {
		res.status(400).json({ error: 'Server error' });
	}
};
