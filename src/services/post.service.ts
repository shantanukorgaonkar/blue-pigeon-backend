import { IPost, PostModel } from "../models/post"

export const createPost = async (data: IPost) => {
    try {
        const newPost = PostModel.create(data)
        return newPost
    } catch (error) {
        throw error
    }
}

export const findAll = async () => {
    try {
        const posts = PostModel.find({})
        return posts
    } catch (error) {
        throw error
    }
}

export const findByUserId = async (userId: string) => {
    try {
        const posts = PostModel.find({ user: { _id: userId } })
        return posts
    } catch (error) {
        throw error
    }
}