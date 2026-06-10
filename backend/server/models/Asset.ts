import mongoose, { Schema, Document } from 'mongoose';

export interface IAsset extends Document {
  _id: string;
  assetId: string;
  name: string;
  category: string;
  serialNumber: string;
  status: 'Assigned' | 'Available' | 'Maintenance';
  assignedTo?: string;
  purchaseDate: Date;
  purchasePrice: number;
  location: string;
  description?: string;
  barcode?: string;
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
}

const assetSchema = new Schema<IAsset>(
  {
    assetId: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    category: { type: String, required: true },
    serialNumber: { type: String, required: true, unique: true },
    status: { 
      type: String, 
      enum: ['Assigned', 'Available', 'Maintenance'], 
      default: 'Available' 
    },
    assignedTo: String,
    purchaseDate: Date,
    purchasePrice: Number,
    location: String,
    description: String,
    barcode: String,
    createdBy: { type: String, required: true },
  },
  { timestamps: true }
);

export const Asset = mongoose.model<IAsset>('Asset', assetSchema);
