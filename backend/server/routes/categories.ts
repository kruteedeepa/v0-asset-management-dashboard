import { Router } from 'express';
import { Category } from '../models/Category';
import { authMiddleware, AuthRequest } from '../middleware/auth';
import { asyncHandler, AppError } from '../middleware/errorHandler';
import { logActivity } from '../utils/activityLogger';

const router = Router();

// Get all categories
router.get('/', authMiddleware, asyncHandler(async (req: AuthRequest, res) => {
  const categories = await Category.find();
  res.json(categories);
}));

// Get category by ID
router.get('/:id', authMiddleware, asyncHandler(async (req: AuthRequest, res) => {
  const category = await Category.findById(req.params.id);
  if (!category) {
    throw new AppError(404, 'Category not found');
  }
  res.json(category);
}));

// Create new category
router.post('/', authMiddleware, asyncHandler(async (req: AuthRequest, res) => {
  const { name, description } = req.body;

  const category = new Category({
    name,
    description,
    createdBy: req.userId,
  });

  await category.save();
  await logActivity(
    'category_added',
    `Category "${name}" added`,
    `New category created`,
    req.userId!
  );

  res.status(201).json(category);
}));

// Update category
router.put('/:id', authMiddleware, asyncHandler(async (req: AuthRequest, res) => {
  const category = await Category.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!category) {
    throw new AppError(404, 'Category not found');
  }

  res.json(category);
}));

// Delete category
router.delete('/:id', authMiddleware, asyncHandler(async (req: AuthRequest, res) => {
  const category = await Category.findByIdAndDelete(req.params.id);
  if (!category) {
    throw new AppError(404, 'Category not found');
  }

  res.json({ message: 'Category deleted' });
}));

export default router;
