import { Router } from 'express';
import { Employee } from '../models/Employee';
import { authMiddleware, AuthRequest } from '../middleware/auth';
import { asyncHandler, AppError } from '../middleware/errorHandler';
import { logActivity } from '../utils/activityLogger';
import { v4 as uuidv4 } from 'uuid';

const router = Router();

// Get all employees
router.get('/', authMiddleware, asyncHandler(async (req: AuthRequest, res) => {
  const employees = await Employee.find();
  res.json(employees);
}));

// Get employee by ID
router.get('/:id', authMiddleware, asyncHandler(async (req: AuthRequest, res) => {
  const employee = await Employee.findById(req.params.id);
  if (!employee) {
    throw new AppError(404, 'Employee not found');
  }
  res.json(employee);
}));

// Create new employee
router.post('/', authMiddleware, asyncHandler(async (req: AuthRequest, res) => {
  const { name, email, department, position, phoneNumber } = req.body;
  
  const employeeId = `EMP${Date.now()}`;

  const employee = new Employee({
    employeeId,
    name,
    email,
    department,
    position,
    phoneNumber,
    createdBy: req.userId,
  });

  await employee.save();
  await logActivity(
    'employee_added',
    `Employee "${name}" added`,
    `New employee added to system`,
    req.userId!,
    undefined,
    employee._id as string
  );

  res.status(201).json(employee);
}));

// Update employee
router.put('/:id', authMiddleware, asyncHandler(async (req: AuthRequest, res) => {
  const employee = await Employee.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!employee) {
    throw new AppError(404, 'Employee not found');
  }

  res.json(employee);
}));

// Delete employee
router.delete('/:id', authMiddleware, asyncHandler(async (req: AuthRequest, res) => {
  const employee = await Employee.findByIdAndDelete(req.params.id);
  if (!employee) {
    throw new AppError(404, 'Employee not found');
  }

  res.json({ message: 'Employee deleted' });
}));

export default router;
