import { Router } from 'express';
import { createCandidate, getCandidates } from '../controllers/candidateController';
import { protect } from '../middleware/authMiddleware';
import roleMiddleware from '../middleware/roleMiddleware';

const router = Router();

router.post('/candidates', protect, roleMiddleware('Admin'), createCandidate);
router.get('/candidates', protect, getCandidates);

export default router;
