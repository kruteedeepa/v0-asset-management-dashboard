import { Router } from 'express';
import { Asset } from '../models/Asset';
import { Activity } from '../models/Activity';
import { authMiddleware, AuthRequest } from '../middleware/auth';
import { asyncHandler, AppError } from '../middleware/errorHandler';
import { logActivity } from '../utils/activityLogger';
import { v4 as uuidv4 } from 'uuid';
import JsBarcode from 'jsbarcode';
import { createCanvas } from 'canvas';

const router = Router();

// Get all assets
router.get('/', authMiddleware, asyncHandler(async (req: AuthRequest, res) => {
  const assets = await Asset.find();
  res.json(assets);
}));

// Get asset by ID
router.get('/:id', authMiddleware, asyncHandler(async (req: AuthRequest, res) => {
  const asset = await Asset.findById(req.params.id);
  if (!asset) {
    throw new AppError(404, 'Asset not found');
  }
  res.json(asset);
}));

// Get asset by barcode
router.get('/scan/:barcode', authMiddleware, asyncHandler(async (req: AuthRequest, res) => {
  const asset = await Asset.findOne({ barcode: req.params.barcode });
  if (!asset) {
    throw new AppError(404, 'Asset not found');
  }
  res.json(asset);
}));

// Create new asset
router.post('/', authMiddleware, asyncHandler(async (req: AuthRequest, res) => {
  const { name, category, serialNumber, purchaseDate, purchasePrice, location, description } = req.body;
  
  const assetId = `A${Date.now()}`;
  const barcode = uuidv4();

  const asset = new Asset({
    assetId,
    name,
    category,
    serialNumber,
    purchaseDate,
    purchasePrice,
    location,
    description,
    barcode,
    status: 'Available',
    createdBy: req.userId,
  });

  await asset.save();
  await logActivity(
    'asset_added',
    `Asset "${name}" added`,
    `New asset added to inventory`,
    req.userId!,
    asset._id as string
  );

  res.status(201).json(asset);
}));

// Update asset
router.put('/:id', authMiddleware, asyncHandler(async (req: AuthRequest, res) => {
  const asset = await Asset.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!asset) {
    throw new AppError(404, 'Asset not found');
  }

  await logActivity(
    'asset_added',
    `Asset "${asset.name}" updated`,
    'Asset details updated',
    req.userId!,
    asset._id as string
  );

  res.json(asset);
}));

// Delete asset
router.delete('/:id', authMiddleware, asyncHandler(async (req: AuthRequest, res) => {
  const asset = await Asset.findByIdAndDelete(req.params.id);
  if (!asset) {
    throw new AppError(404, 'Asset not found');
  }

  await logActivity(
    'asset_added',
    `Asset "${asset.name}" deleted`,
    'Asset removed from inventory',
    req.userId!,
    asset._id as string
  );

  res.json({ message: 'Asset deleted' });
}));

// Assign asset to employee
router.post('/:id/assign', authMiddleware, asyncHandler(async (req: AuthRequest, res) => {
  const { employeeId } = req.body;
  
  const asset = await Asset.findByIdAndUpdate(
    req.params.id,
    { assignedTo: employeeId, status: 'Assigned' },
    { new: true }
  );

  if (!asset) {
    throw new AppError(404, 'Asset not found');
  }

  await logActivity(
    'asset_assigned',
    `${asset.name} assigned to employee ${employeeId}`,
    `Asset assigned successfully`,
    req.userId!,
    asset._id as string,
    employeeId
  );

  res.json(asset);
}));

// Return asset
router.post('/:id/return', authMiddleware, asyncHandler(async (req: AuthRequest, res) => {
  const asset = await Asset.findByIdAndUpdate(
    req.params.id,
    { assignedTo: undefined, status: 'Available' },
    { new: true }
  );

  if (!asset) {
    throw new AppError(404, 'Asset not found');
  }

  await logActivity(
    'asset_returned',
    `${asset.name} returned`,
    `Asset returned to inventory`,
    req.userId!,
    asset._id as string
  );

  res.json(asset);
}));

// Mark for maintenance
router.post('/:id/maintenance', authMiddleware, asyncHandler(async (req: AuthRequest, res) => {
  const { reason } = req.body;

  const asset = await Asset.findByIdAndUpdate(
    req.params.id,
    { status: 'Maintenance' },
    { new: true }
  );

  if (!asset) {
    throw new AppError(404, 'Asset not found');
  }

  await logActivity(
    'asset_maintenance',
    `${asset.name} sent for maintenance`,
    reason || 'Asset sent for maintenance',
    req.userId!,
    asset._id as string
  );

  res.json(asset);
}));

export default router;
