import { Request, Response } from 'express';
import Question from '../models/questionModel';
import { questionSchema } from '../validator/questionValidator';
export const createQuestion = async (req: Request, res: Response) => {
	const validation = questionSchema.safeParse(req.body);
	if (!validation.success) {
		return res.status(400).json({ errors: validation.error.errors });
	}

	try {
		const { text, options, marks, negativeMarks, correctOption, tags } = req.body;
		const question = new Question({
			text,
			options,
			marks,
			negativeMarks,
			correctOption,
			tags,
		});
		await question.save();
		res.status(201).json(question);
	} catch (error) {
		if (error instanceof Error) {
			res.status(400).json({ error: error.message });
		} else {
			res.status(400).json({ error: 'An unexpected error occurred.' });
		}
	}
};

export const getQuestions = async (req: Request, res: Response) => {
	try {
		const questions = await Question.find();
		res.status(200).json(questions);
	} catch (error) {
		if (error instanceof Error) {
			res.status(400).json({ error: error.message });
		} else {
			res.status(400).json({ error: 'An unexpected error occurred.' });
		}
	}
};

export const getQuestionById = async (req: Request, res: Response) => {
	if (!req.params.id) {
		return res.status(400).json({ error: 'Question ID is required.' });
	}
	try {
		const question = await Question.findById(req.params.id);
		if (!question) {
			return res.status(404).json({ message: 'Question not found' });
		}
		res.status(200).json(question);
	} catch (error) {
		if (error instanceof Error) {
			res.status(400).json({ error: error.message });
		} else {
			res.status(400).json({ error: 'An unexpected error occurred.' });
		}
	}
};

export const updateQuestion = async (req: Request, res: Response) => {
	if (!req.params.id) {
		return res.status(400).json({ error: 'Question ID is required to update.' });
	}
	const validation = questionSchema.safeParse(req.body);
	if (!validation.success) {
		return res.status(400).json({ errors: validation.error.errors });
	}
	try {
		const question = await Question.findByIdAndUpdate(req.params.id, req.body, {
			new: true,
			runValidators: true,
		});
		if (!question) {
			return res.status(404).json({ message: 'Question not found' });
		}
		res.status(200).json(question);
	} catch (error) {
		if (error instanceof Error) {
			res.status(400).json({ error: error.message });
		} else {
			res.status(400).json({ error: 'An unexpected error occurred.' });
		}
	}
};

export const deleteQuestion = async (req: Request, res: Response) => {
	if (!req.params.id) {
		return res.status(400).json({ error: 'Question ID is required to delete.' });
	}
	try {
		const question = await Question.findByIdAndDelete(req.params.id);
		if (!question) {
			return res.status(404).json({ message: 'Question not found' });
		}
		res.status(200).json({ message: 'Question deleted successfully' });
	} catch (error) {
		if (error instanceof Error) {
			res.status(400).json({ error: error.message });
		} else {
			res.status(400).json({ error: 'An unexpected error occurred.' });
		}
	}
};
