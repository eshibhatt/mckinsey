import { Router } from 'express';
import { createQuestion } from '../controllers/QuestionController';

const router = Router();

router.post('/questions', createQuestion);

export default router;
