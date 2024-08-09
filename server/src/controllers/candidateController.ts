import { Request, Response } from 'express';
import Candidate from '../models/candidateModel';
import { candidateSchema } from '../validator/candidateValidator';

export const createCandidate = async (req: Request, res: Response) => {
	const validation = candidateSchema.safeParse(req.body);
	if (!validation.success) {
		return res.status(400).json({ errors: validation.error.errors });
	}
	try {
		const candidate = new Candidate(req.body);
		await candidate.save();
		res.status(201).json(candidate);
	} catch (error) {
		if (error instanceof Error) {
			res.status(400).json({ error: error.message });
		} else {
			res.status(400).json({ error: 'An unexpected error occurred.' });
		}
	}
};

export const getCandidates = async (req: Request, res: Response) => {
	try {
		const candidates = await Candidate.find();
		res.status(200).json(candidates);
	} catch (error) {
		if (error instanceof Error) {
			res.status(400).json({ error: error.message });
		} else {
			res.status(400).json({ error: 'An unexpected error occurred.' });
		}
	}
};

export const getCandidateById = async (req: Request, res: Response) => {
	if (!req.params.id) {
		return res.status(400).json({ error: 'Candidate ID is required.' });
	}
	try {
		const candidate = await Candidate.findById(req.params.id);
		if (!candidate) {
			return res.status(404).json({ message: 'Candidate not found' });
		}
		res.status(200).json(candidate);
	} catch (error) {
		if (error instanceof Error) {
			res.status(400).json({ error: error.message });
		} else {
			res.status(400).json({ error: 'An unexpected error occurred.' });
		}
	}
};

export const updateCandidate = async (req: Request, res: Response) => {
	if (!req.params.id) {
		return res.status(400).json({ error: 'Candidate ID is required.' });
	}
	const validation = candidateSchema.safeParse(req.body);
	if (!validation.success) {
		return res.status(400).json({ errors: validation.error.errors });
	}
	try {
		const candidate = await Candidate.findByIdAndUpdate(req.params.id, req.body, {
			new: true,
			runValidators: true,
		});
		if (!candidate) {
			return res.status(404).json({ message: 'Candidate not found' });
		}
		res.status(200).json(candidate);
	} catch (error) {
		if (error instanceof Error) {
			res.status(400).json({ error: error.message });
		} else {
			res.status(400).json({ error: 'An unexpected error occurred.' });
		}
	}
};

export const deleteCandidate = async (req: Request, res: Response) => {
	if (!req.params.id) {
		return res.status(400).json({ error: 'Candidate ID is required.' });
	}
	try {
		const candidate = await Candidate.findByIdAndDelete(req.params.id);
		if (!candidate) {
			return res.status(404).json({ message: 'Candidate not found' });
		}
		res.status(200).json({ message: 'Candidate deleted successfully' });
	} catch (error) {
		if (error instanceof Error) {
			res.status(400).json({ error: error.message });
		} else {
			res.status(400).json({ error: 'An unexpected error occurred.' });
		}
	}
};
