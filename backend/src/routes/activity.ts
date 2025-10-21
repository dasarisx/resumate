import express from 'express';
import { createActivity, getActivities, getActivityById, updateActivity, deleteActivity } from '../controllers/activityController';
import { protect } from '../middlewares/authMiddleware';

const router = express.Router();

router.use(protect);
router.route('/')
  .post(createActivity)
  .get(getActivities);

router.route('/:id')
  .get(getActivityById)
  .put(updateActivity)
  .delete(deleteActivity);  

export default router;
