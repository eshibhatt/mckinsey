import { Router } from 'express';
import { createQuestion } from '../controllers/questionController';

const router = Router();

router.post('/questions', createQuestion);

export default router;
