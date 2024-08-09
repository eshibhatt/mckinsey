import { Request, Response } from 'express';
import Question from '../models/questionModel';

export const createQuestion = async (req: Request, res: Response) => {
	try {
		const question = new Question(req.body);
		await question.save();
		res.status(201).json(question);
	} catch (error: any) {
		res.status(400).json({ error: error.message });
	}
};

export const getQuestions = async (req: Request, res: Response) => {
	try {
		const questions = await Question.find();
		res.status(200).json(questions);
	} catch (error: any) {
		res.status(400).json({ error: error.message });
	}
};

// Other CRUD operations (update, delete) can be added here
