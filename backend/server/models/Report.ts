import mongoose, { Schema, Document } from 'mongoose';

export interface IReport extends Document {
  _id: string;
  name: string;
  type: 'assets' | 'assignments' | 'maintenance' | 'custom';
  filters?: Record<string, any>;
  generatedBy: string;
  fileUrl?: string;
  createdAt: Date;
  updatedAt: Date;
}

const reportSchema = new Schema<IReport>(
  {
    name: { type: String, required: true },
    type: { 
      type: String, 
      enum: ['assets', 'assignments', 'maintenance', 'custom'], 
      required: true 
    },
    filters: mongoose.Schema.Types.Mixed,
    generatedBy: { type: String, required: true },
    fileUrl: String,
  },
  { timestamps: true }
);

export const Report = mongoose.model<IReport>('Report', reportSchema);
