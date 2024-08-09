import { Request, Response } from 'express';
import Candidate from '../models/candidateModel';

export const createCandidate = async (req: Request, res: Response) => {
	try {
		const candidate = new Candidate(req.body);
		await candidate.save();
		res.status(201).json(candidate);
	} catch (error: any) {
		res.status(400).json({ error: error.message });
	}
};

export const getCandidates = async (req: Request, res: Response) => {
	try {
		const candidates = await Candidate.find();
		res.status(200).json(candidates);
	} catch (error: any) {
		res.status(400).json({ error: error.message });
	}
};

// Other CRUD operations (update, delete) can be added here
