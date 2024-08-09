import { Router } from 'express';
import { createQuestion, getQuestions } from '../controllers/questionController';
import { protect } from '../middleware/authMiddleware';
import roleMiddleware from '../middleware/roleMiddleware';

const router = Router();

router.post('/create-question',
     protect, roleMiddleware('Admin'),
      createQuestion);
router.get('/list-questions', getQuestions);

export default router;
