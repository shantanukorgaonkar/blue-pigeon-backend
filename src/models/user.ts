import mongoose, { Types } from 'mongoose';
const { Schema } = mongoose;

export interface IUser {
    _id: Types.ObjectId
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    otp?: number;
    industry?: string[];
    interests?: string[];
    username: string
}

const userSchema = new Schema<IUser>({
    firstName: { type: String, required: true, },
    lastName: { type: String, required: true, },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, },
    otp: { type: Number, required: false, min: 6, max: 6 },
    industry: { type: [String], required: false },
    interests: { type: [String], required: false },
    username: { type: String, required: false, unique: true },
});

export const UserModel = mongoose.model<IUser>('User', userSchema)