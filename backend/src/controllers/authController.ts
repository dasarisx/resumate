import { Request, Response } from 'express';
import { User } from '../models/user';
import { generateToken } from '../utils/jwt';
import { AuthRequest } from '../middlewares/authMiddleware';

export const register = async (req: Request, res: Response) => {
  try {
    const { email, password, name } = req.body;
    if (!email || !password || !name) {
      return res.status(400).json({ message: 'All fields are required' });
    }
    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Ensure password is a string and not empty
    if (typeof password !== "string" || password.length < 6) {
      return res.status(400).json({ message: 'Password must be at least 6 characters' });
    }

    const user = await User.create({ email, password, name });
    const token = generateToken(user._id.toString());

    res.status(201).json({
      token,
      user: {
        id: user._id,
        email: user.email,
        name: user.name
      }
    });
  } catch (error: any) {
    // Log error for debugging
    console.error("Register error:", error);
    res.status(500).json({ message: error.message || 'Server error' });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    // Type assertion to access comparePassword
    if (user && (await (user as any).comparePassword(password))) {
      res.json({
        token: generateToken(user._id.toString()),
        user: {
          id: user._id,
          email: user.email,
          name: user.name
        }
      });
    } else {
      res.status(401).json({ message: 'Invalid credentials' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const getUserProfile = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?._id; // retrieved from token by protect middleware
    if (!userId) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    const user = await User.findById(userId).select('email name mobile summary');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({
      email: user.email,
      name: user.name,
      mobile: user.mobile,
      summary: user.summary
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message || 'Server error' });
  }
};

export const updateUserProfile = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?._id; // retrieved from token by protect middleware
    if (!userId) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    const { mobile, summary } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { mobile, summary },
      { new: true, runValidators: true, select: 'email name mobile summary' }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({
      email: updatedUser.email,
      name: updatedUser.name,
      mobile: updatedUser.mobile,
      summary: updatedUser.summary
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message || 'Server error' });
  }
};

// At the top of your file or in your server entrypoint, ensure you connect to MongoDB before handling requests.
// This error means your backend is not connected to MongoDB.

// Make sure connectDB() is called before your server starts listening.
// This should be in your src/server.ts, not in the controller itself.
// Example for src/server.ts:

/*
import dotenv from 'dotenv';
import app from './app';
import { connectDB } from './config/db';

dotenv.config();

const PORT = process.env.PORT || 5000;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
*/
