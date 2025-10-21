import mongoose from 'mongoose';

const achievementSchema = new mongoose.Schema({
  resume: { type: mongoose.Schema.Types.ObjectId, ref: 'Resume' },
  title: { type: String, required: true },
  description: String,
  date: Date,
  type: { type: String, enum: ['award', 'certification', 'project'] },
  url: String
}, { timestamps: true });

export const Achievement = mongoose.model('Achievement', achievementSchema);
