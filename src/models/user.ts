import mongoose, { Types } from 'mongoose';
const { Schema } = mongoose;

export interface IUser {
    id: number
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    otp?: number;
    industries?: string[];
    interests?: string[];
    username: string
}

const userSchema = new Schema<IUser>(
    {
        firstName: { type: String, required: true, },
        lastName: { type: String, required: true, },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true, },
        otp: { type: Number, required: false, min: 6, max: 6 },
        industries: { type: [Schema.Types.ObjectId], required: false, ref: 'Industries' },
        interests: { type: [Schema.Types.ObjectId], required: false, ref: 'Interests' },
        username: { type: String, sparse: true, unique: true },
    },
    {
        timestamps: true
    });

export const UserModel = mongoose.model<IUser>('User', userSchema)