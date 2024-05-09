import mongoose, { Types } from 'mongoose';
const { Schema } = mongoose;

export interface IFriendList {
    sender: Types.ObjectId;
    friend: Types.ObjectId;
}

const postSchema = new Schema<IFriendList>({
    sender: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
    friend: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
});

export const FriendListModel = mongoose.model('FriendList', postSchema)