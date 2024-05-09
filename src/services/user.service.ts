import { Types } from "mongoose";
import { IUser, UserModel } from "../models/user";

export const addUser = async (user: IUser) => {
    try {
        const result = await UserModel.create<IUser>(user);

        return result;
    } catch (error) {
        throw error;
    }

}

export const findUserById = async (id: Types.ObjectId) => {
    try {
        const result = await UserModel.findById(id).select('-password');
        return result;
    } catch (error) {
        throw error
    }
}

export const findUserByEmail = async (email: string) => {
    try {
        const result = await UserModel.findOne({ email })
        return result;
    } catch (error) {
        throw error;
    }
}

export const deleteUser = async (id: number) => {
    try {
        const result = await UserModel.findByIdAndDelete(id)
        return result;
    } catch (error) {
        throw error;
    }

}



