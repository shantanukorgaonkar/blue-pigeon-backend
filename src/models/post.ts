import mongoose, { Types } from 'mongoose';
const { Schema } = mongoose;

export interface IPost {
    caption: string;
    user: Types.ObjectId;
    media: string[];
}

const postSchema = new Schema<IPost>(
    {
        caption: { type: String, required: false, },
        user: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
        media: { type: [String], required: false, },
    },
    {
        timestamps: true
    });

export const PostModel = mongoose.model('Post', postSchema)