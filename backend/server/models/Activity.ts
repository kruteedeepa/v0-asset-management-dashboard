import mongoose, { Schema, Document } from 'mongoose';

export interface IActivity extends Document {
  _id: string;
  type: 'asset_added' | 'asset_assigned' | 'asset_returned' | 'asset_maintenance' | 'employee_added' | 'vendor_added' | 'category_added';
  title: string;
  description: string;
  assetId?: string;
  employeeId?: string;
  createdBy: string;
  createdAt: Date;
}

const activitySchema = new Schema<IActivity>(
  {
    type: {
      type: String,
      enum: ['asset_added', 'asset_assigned', 'asset_returned', 'asset_maintenance', 'employee_added', 'vendor_added', 'category_added'],
      required: true,
    },
    title: { type: String, required: true },
    description: String,
    assetId: String,
    employeeId: String,
    createdBy: { type: String, required: true },
  },
  { timestamps: true }
);

export const Activity = mongoose.model<IActivity>('Activity', activitySchema);
