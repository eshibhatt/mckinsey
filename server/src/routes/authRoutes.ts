import { Router } from 'express';
import { login, logout, register } from '../controllers/authController';
import { protect } from '../middleware/authMiddleware';

const router = Router();

router.post('/register', register);
router.post('/login', login);
router.post('/logout', protect, logout);

export default router;
