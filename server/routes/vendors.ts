import { Router } from 'express';
import { Vendor } from '../models/Vendor';
import { authMiddleware, AuthRequest } from '../middleware/auth';
import { asyncHandler, AppError } from '../middleware/errorHandler';
import { logActivity } from '../utils/activityLogger';

const router = Router();

// Get all vendors
router.get('/', authMiddleware, asyncHandler(async (req: AuthRequest, res) => {
  const vendors = await Vendor.find();
  res.json(vendors);
}));

// Get vendor by ID
router.get('/:id', authMiddleware, asyncHandler(async (req: AuthRequest, res) => {
  const vendor = await Vendor.findById(req.params.id);
  if (!vendor) {
    throw new AppError(404, 'Vendor not found');
  }
  res.json(vendor);
}));

// Create new vendor
router.post('/', authMiddleware, asyncHandler(async (req: AuthRequest, res) => {
  const { name, email, phoneNumber, address, city, country, zipCode } = req.body;

  const vendor = new Vendor({
    name,
    email,
    phoneNumber,
    address,
    city,
    country,
    zipCode,
    createdBy: req.userId,
  });

  await vendor.save();
  await logActivity(
    'vendor_added',
    `Vendor "${name}" added`,
    `New vendor added to system`,
    req.userId!
  );

  res.status(201).json(vendor);
}));

// Update vendor
router.put('/:id', authMiddleware, asyncHandler(async (req: AuthRequest, res) => {
  const vendor = await Vendor.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!vendor) {
    throw new AppError(404, 'Vendor not found');
  }

  res.json(vendor);
}));

// Delete vendor
router.delete('/:id', authMiddleware, asyncHandler(async (req: AuthRequest, res) => {
  const vendor = await Vendor.findByIdAndDelete(req.params.id);
  if (!vendor) {
    throw new AppError(404, 'Vendor not found');
  }

  res.json({ message: 'Vendor deleted' });
}));

export default router;
