import { Request, Response } from 'express';
import { Resume } from '../models/resume';
import { AuthRequest } from '../middlewares/authMiddleware';
import PDFDocument from 'pdfkit';
import { Activity } from '../models/activity';
import { User } from '../models/user';

export const createResume = async (req: AuthRequest, res: Response) => {
  try {
    const resume = await Resume.create({
      ...req.body,
      user: req.user._id
    });
    res.status(201).json(resume);
  } catch (error) {
    res.status(400).json({ message: 'Error creating resume' });
  }
};

export const getResumes = async (req: AuthRequest, res: Response) => {
  try {
    const resumes = await Resume.find({ user: req.user._id });
    res.json(resumes);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching resumes' });
  }
};

export const updateResume = async (req: AuthRequest, res: Response) => {
  try {
    const resume = await Resume.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id },
      req.body,
      { new: true }
    );
    if (!resume) {
      return res.status(404).json({ message: 'Resume not found' });
    }
    res.json(resume);
  } catch (error) {
    res.status(400).json({ message: 'Error updating resume' });
  }
};

export const deleteResume = async (req: AuthRequest, res: Response) => {
  try {
    const resume = await Resume.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id
    });
    if (!resume) {
      return res.status(404).json({ message: 'Resume not found' });
    }
    res.json({ message: 'Resume deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting resume' });
  }
};

export const downloadResume = async (req: AuthRequest, res: Response) => {
  try {
    // Create a PDF document
    const doc = new PDFDocument();

    // Set response headers
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename=resume.pdf');

    // Pipe the PDF to the response
    doc.pipe(res);

    // Add content to PDF
    doc.fontSize(20).text('Resume');
    doc.moveDown();

    // Fetch user profile details
    const user = await User.findById(req.user._id).select('name email mobile summary');

    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    // Add user profile info to PDF
    doc.fontSize(20).text(user.name || 'No Name');
    doc.moveDown(0.2);
    doc.fontSize(12).text(`Email: ${user.email || 'N/A'}`);
    doc.fontSize(12).text(`Mobile: ${user.mobile || 'N/A'}`);
    if (user.summary) {
      doc.moveDown(0.2);
      doc.fontSize(12).text(`Summary: ${user.summary}`);
    }

    doc.moveDown();

    // Get activities for the user
    const activities = await Activity.find({ user: req.user._id });

    // Group activities by type
    const groupedActivities = activities.reduce((acc: any, activity) => {
      if (!acc[activity.type]) acc[activity.type] = [];
      acc[activity.type].push(activity);
      return acc;
    }, {});

    // Add each section to PDF
    for (const [type, items] of Object.entries(groupedActivities)) {
      doc.fontSize(16).text(type.toUpperCase());
      doc.moveDown(0.5);
      
      for (const activity of items as any[]) {
        doc.fontSize(12).text(activity.title);
        if (activity.organization) {
          doc.fontSize(10).text(activity.organization, { indent: 20 });
        }
        if (activity.description) {
          doc.fontSize(10).text(activity.description, { indent: 20 });
        }
        doc.moveDown(0.5);
      }
      doc.moveDown();
    }

    // Finalize PDF
    doc.end();
  } catch (error) {
    console.error('PDF generation error:', error);
    res.status(500).json({ message: 'Failed to generate PDF' });
  }
};
