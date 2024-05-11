import { FriendListModel, IFriendList } from "../models/friend-list"

export const createFriend = async (data: IFriendList) => {
    try {
        const addedFriend = await FriendListModel.create(data)
        return addedFriend
    } catch (error) {
        throw error
    }

}

export const findFriendsByUser = async (userId: string) => {

    try {
        const friends = await FriendListModel.find({ $or: [{ sender: userId }, { receiver: userId }] })
            .populate({ path: 'sender', select: ["-password", "-createdAt", "-updatedAt"] })
            .populate({ path: 'receiver', select: ["-password", "-createdAt", "-updatedAt"] })
        return friends
    } catch (error) {
        throw error
    }
}