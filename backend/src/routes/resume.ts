import express from 'express';
import { downloadResume } from '../controllers/resumeController';
import { protect } from '../middlewares/authMiddleware';

const router = express.Router();

router.use(protect);
router.get('/download', downloadResume);

export default router;
