import mongoose, { Types } from 'mongoose';
const { Schema } = mongoose;

export interface IIndustries {
    name: string;
}
const industryEnum = ['Advertising', 'Finance', 'Software Technology', 'Healthcare and Biotechnology', 'Media and Broadcasting', 'Pharmacy'];
const industrySchema = new Schema<IIndustries>({
    name: { type: String, enum: industryEnum, required: true, unique: true }

});

export const IndustriesModel = mongoose.model('Industries', industrySchema)