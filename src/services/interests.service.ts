import { IInterests, InterestsModel } from "../models/interests"

export const createInterest = async (data: IInterests) => {
    try {
        const newInterest = InterestsModel.create(data)
        return newInterest
    } catch (error) {
        throw error
    }
}

export const findAllInterests = async () => {
    try {
        const interests = InterestsModel.find({})
        return interests
    } catch (error) {
        throw error
    }
}