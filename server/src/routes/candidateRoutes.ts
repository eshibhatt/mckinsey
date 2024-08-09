import { Router } from 'express';
import { createCandidate, getCandidates } from '../controllers/candidateController';
import authMiddleware from '../middleware/authMiddleware';
import roleMiddleware from '../middleware/roleMiddleware';

const router = Router();

router.post('/candidates', authMiddleware, roleMiddleware('Admin'), createCandidate);
router.get('/candidates', authMiddleware, getCandidates);

export default router;
