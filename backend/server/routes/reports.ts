import { Router } from 'express';
import { Report } from '../models/Report';
import { Asset } from '../models/Asset';
import { Assignment } from '../models/Assignment';
import { authMiddleware, AuthRequest } from '../middleware/auth';
import { asyncHandler, AppError } from '../middleware/errorHandler';

const router = Router();

// Get all reports
router.get('/', authMiddleware, asyncHandler(async (req: AuthRequest, res) => {
  const reports = await Report.find().sort({ createdAt: -1 });
  res.json(reports);
}));

// Generate assets report
router.post('/generate/assets', authMiddleware, asyncHandler(async (req: AuthRequest, res) => {
  const { filters } = req.body;

  let query: any = {};
  if (filters?.status) query.status = filters.status;
  if (filters?.category) query.category = filters.category;
  if (filters?.assignedTo) query.assignedTo = filters.assignedTo;

  const assets = await Asset.find(query);

  const report = new Report({
    name: `Assets Report - ${new Date().toLocaleDateString()}`,
    type: 'assets',
    filters,
    generatedBy: req.userId,
  });

  await report.save();

  res.json({
    report,
    data: assets,
  });
}));

// Generate assignments report
router.post('/generate/assignments', authMiddleware, asyncHandler(async (req: AuthRequest, res) => {
  const { filters } = req.body;

  let query: any = {};
  if (filters?.status) query.status = filters.status;
  if (filters?.employeeId) query.employeeId = filters.employeeId;

  const assignments = await Assignment.find(query);

  const report = new Report({
    name: `Assignments Report - ${new Date().toLocaleDateString()}`,
    type: 'assignments',
    filters,
    generatedBy: req.userId,
  });

  await report.save();

  res.json({
    report,
    data: assignments,
  });
}));

// Generate maintenance report
router.post('/generate/maintenance', authMiddleware, asyncHandler(async (req: AuthRequest, res) => {
  const assets = await Asset.find({ status: 'Maintenance' });

  const report = new Report({
    name: `Maintenance Report - ${new Date().toLocaleDateString()}`,
    type: 'maintenance',
    generatedBy: req.userId,
  });

  await report.save();

  res.json({
    report,
    data: assets,
  });
}));

export default router;
