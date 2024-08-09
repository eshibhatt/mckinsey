import { Router } from 'express';
import { createQuestion, getQuestions,deleteQuestion,updateQuestion } from '../controllers/questionController';
import { protect } from '../middleware/authMiddleware';
import roleMiddleware from '../middleware/roleMiddleware';

const router = Router();

router.post('/create-question', protect, roleMiddleware('Admin'), createQuestion);
router.get('/list-question', protect, getQuestions);
router.delete('/delete-question/:id', protect, roleMiddleware('Admin'), deleteQuestion);
router.put('/update-question/:id', protect, roleMiddleware('Admin'), updateQuestion);

export default router;
