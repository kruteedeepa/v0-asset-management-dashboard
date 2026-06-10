import mongoose, { Schema, Document } from 'mongoose';

export interface IVendor extends Document {
  _id: string;
  name: string;
  email: string;
  phoneNumber: string;
  address: string;
  city: string;
  country: string;
  zipCode: string;
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
}

const vendorSchema = new Schema<IVendor>(
  {
    name: { type: String, required: true },
    email: String,
    phoneNumber: String,
    address: String,
    city: String,
    country: String,
    zipCode: String,
    createdBy: { type: String, required: true },
  },
  { timestamps: true }
);

export const Vendor = mongoose.model<IVendor>('Vendor', vendorSchema);
