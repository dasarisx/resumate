import mongoose from 'mongoose';

const resumeSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  summary: String,
  experience: [{
    company: String,
    position: String,
    startDate: Date,
    endDate: Date,
    description: String
  }],
  education: [{
    institution: String,
    degree: String,
    field: String,
    graduationDate: Date
  }],
  skills: [String],
  achievements: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Achievement' }]
}, { timestamps: true });

export const Resume = mongoose.model('Resume', resumeSchema);
