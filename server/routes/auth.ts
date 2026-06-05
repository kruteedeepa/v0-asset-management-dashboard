import { Router } from 'express';
import { User } from '../models/User';
import { generateToken } from '../middleware/auth';
import { asyncHandler, AppError } from '../middleware/errorHandler';

const router = Router();

// Google OAuth callback
router.post('/google', asyncHandler(async (req, res) => {
  const { googleId, email, name, profileImage } = req.body;

  if (!googleId || !email) {
    throw new AppError(400, 'Missing required fields');
  }

  let user = await User.findOne({ googleId });

  if (!user) {
    // Create new user
    user = new User({
      googleId,
      email,
      name,
      profileImage,
      role: 'admin', // Default to admin for new users
    });
    await user.save();
  } else {
    // Update existing user
    user.name = name;
    user.profileImage = profileImage;
    await user.save();
  }

  const token = generateToken(user._id.toString(), user.email);

  res.json({
    user,
    token,
  });
}));

// Get current user
router.get('/me', asyncHandler(async (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];
  
  if (!token) {
    throw new AppError(401, 'No token provided');
  }

  // For now, return a placeholder. In production, decode the token and fetch user.
  res.json({ message: 'User info endpoint' });
}));

export default router;
