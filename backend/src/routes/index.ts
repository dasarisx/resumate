import express from 'express';
import authRoutes from './auth';
import resumeRoutes from './resume';
import activityRoutes from './activity';

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/resumes', resumeRoutes);
router.use('/activities', activityRoutes);

export default router;
