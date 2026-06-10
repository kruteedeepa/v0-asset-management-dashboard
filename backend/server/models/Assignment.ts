import mongoose, { Schema, Document } from 'mongoose';

export interface IAssignment extends Document {
  _id: string;
  assetId: string;
  employeeId: string;
  assignedDate: Date;
  returnDate?: Date;
  reason: string;
  status: 'Active' | 'Returned';
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
}

const assignmentSchema = new Schema<IAssignment>(
  {
    assetId: { type: String, required: true },
    employeeId: { type: String, required: true },
    assignedDate: { type: Date, default: Date.now },
    returnDate: Date,
    reason: String,
    status: { 
      type: String, 
      enum: ['Active', 'Returned'], 
      default: 'Active' 
    },
    createdBy: { type: String, required: true },
  },
  { timestamps: true }
);

export const Assignment = mongoose.model<IAssignment>('Assignment', assignmentSchema);
