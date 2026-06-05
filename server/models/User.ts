import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  _id: string;
  email: string;
  name: string;
  role: 'admin' | 'manager' | 'user';
  googleId?: string;
  profileImage?: string;
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new Schema<IUser>(
  {
    email: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    role: { type: String, enum: ['admin', 'manager', 'user'], default: 'user' },
    googleId: String,
    profileImage: String,
  },
  { timestamps: true }
);

export const User = mongoose.model<IUser>('User', userSchema);
