import express from 'express';
import { protect } from '../middlewares/authMiddleware'; 
import { register, login, getUserProfile, updateUserProfile } from '../controllers/authController';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/profile', protect, getUserProfile);
router.put('/profile', protect, updateUserProfile);


export default router;
