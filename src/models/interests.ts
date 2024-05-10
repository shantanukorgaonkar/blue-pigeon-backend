import mongoose, { Types } from 'mongoose';
const { Schema } = mongoose;

export interface IInterests {
    name: string;
}
const interestsEnum = ['Running', 'Scuba Diving', 'Snorkeling', 'Cooking', 'Biking', 'Yoga', 'Dancing', 'Reading Books', 'Drinking'];
const interestsSchema = new Schema<IInterests>({
    name: { type: String, enum: interestsEnum, required: true, unique: true }
});

export const InterestsModel = mongoose.model('Interests', interestsSchema)