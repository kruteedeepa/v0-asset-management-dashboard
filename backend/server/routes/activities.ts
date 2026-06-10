import { Router } from 'express';
import { Activity } from '../models/Activity';
import { authMiddleware, AuthRequest } from '../middleware/auth';
import { asyncHandler, AppError } from '../middleware/errorHandler';

const router = Router();

// Get all activities
router.get('/', authMiddleware, asyncHandler(async (req: AuthRequest, res) => {
  const activities = await Activity.find()
    .sort({ createdAt: -1 })
    .limit(50);
  res.json(activities);
}));

// Get activities by asset
router.get('/asset/:assetId', authMiddleware, asyncHandler(async (req: AuthRequest, res) => {
  const activities = await Activity.find({ assetId: req.params.assetId })
    .sort({ createdAt: -1 });
  res.json(activities);
}));

// Get activities by employee
router.get('/employee/:employeeId', authMiddleware, asyncHandler(async (req: AuthRequest, res) => {
  const activities = await Activity.find({ employeeId: req.params.employeeId })
    .sort({ createdAt: -1 });
  res.json(activities);
}));

export default router;
