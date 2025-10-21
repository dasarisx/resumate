import mongoose from 'mongoose';

const activitySchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  type: { type: String, required: true },
  organization: String,
  duration: String,
  link: String,
  description: String,
}, { timestamps: true });

export const Activity = mongoose.model('Activity', activitySchema);
