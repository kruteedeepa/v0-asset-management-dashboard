import mongoose, { Schema, Document } from 'mongoose';

export interface IEmployee extends Document {
  _id: string;
  employeeId: string;
  name: string;
  email: string;
  department: string;
  position: string;
  phoneNumber: string;
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
}

const employeeSchema = new Schema<IEmployee>(
  {
    employeeId: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    department: String,
    position: String,
    phoneNumber: String,
    createdBy: { type: String, required: true },
  },
  { timestamps: true }
);

export const Employee = mongoose.model<IEmployee>('Employee', employeeSchema);
