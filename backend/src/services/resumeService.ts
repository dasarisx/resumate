import { Resume } from '../models/resume';
import { Achievement } from '../models/achievement';

export class ResumeService {
  static async addAchievement(resumeId: string, achievementData: any) {
    const achievement = await Achievement.create({
      ...achievementData,
      resume: resumeId
    });
    
    await Resume.findByIdAndUpdate(
      resumeId,
      { $push: { achievements: achievement._id } }
    );

    return achievement;
  }

  static async generateSummary(resumeId: string) {
    const resume = await Resume.findById(resumeId)
      .populate('achievements')
      .populate('user', 'name');

    // TODO: Implement AI summary generation
    return `Professional summary for ${resume?.user?.name}`;
  }
}
