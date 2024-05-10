import mongoose, { Types } from 'mongoose';
const { Schema } = mongoose;

export interface IFriendList {
    sender: Types.ObjectId;
    receiver: Types.ObjectId;
}

const friendListSchema = new Schema<IFriendList>(
    {
        sender: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
        receiver: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
    },
    {
        timestamps: true
    });

export const FriendListModel = mongoose.model('FriendList', friendListSchema)