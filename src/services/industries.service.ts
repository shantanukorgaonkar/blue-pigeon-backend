import { IIndustries, IndustriesModel } from "../models/industries"


export const createIndustry = async (data: IIndustries) => {
    try {
        const newIndustry = IndustriesModel.create(data)
        return newIndustry
    } catch (error) {
        throw error
    }
}

export const findAllIndustries = async () => {
    try {
        const industries = IndustriesModel.find({})
        return industries
    } catch (error) {
        throw error
    }
}