import { Router } from 'express';
import { createQuestion, getQuestions } from '../controllers/questionController';
import authMiddleware from '../middleware/authMiddleware';
import roleMiddleware from '../middleware/roleMiddleware';

const router = Router();

router.post('/questions', authMiddleware, roleMiddleware('Admin'), createQuestion);
router.get('/questions', authMiddleware, getQuestions);

export default router;
