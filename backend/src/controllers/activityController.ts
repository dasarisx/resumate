import { Request, Response } from 'express';
import { Activity } from '../models/activity';
import { AuthRequest } from '../middlewares/authMiddleware';

export const createActivity = async (req: AuthRequest, res: Response) => {
  try {
    const activity = await Activity.create({
      ...req.body,
      user: req.user._id
    });
    res.status(201).json(activity);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const getActivities = async (req: AuthRequest, res: Response) => {
  try {
    const activities = await Activity.find({ user: req.user._id });
    res.json(activities);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getActivityById = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const activity = await Activity.findOne({ _id: id, user: req.user._id });

    if (!activity) {
      return res.status(404).json({ message: 'Activity not found' });
    }

    res.json(activity);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const updateActivity = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const activity = await Activity.findOneAndUpdate(
      { _id: id, user: req.user._id }, // ensure user can only update own activities
      req.body,
      { new: true, runValidators: true }
    );

    if (!activity) {
      return res.status(404).json({ message: 'Activity not found or not authorized' });
    }

    res.json(activity);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteActivity = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const activity = await Activity.findOneAndDelete({ _id: id, user: req.user._id });

    if (!activity) {
      return res.status(404).json({ message: 'Activity not found or not authorized' });
    }

    res.json({ message: 'Activity deleted successfully' });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
