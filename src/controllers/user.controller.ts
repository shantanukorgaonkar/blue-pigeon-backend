import { Request, Response } from 'express';
import { IUser, UserModel } from '../models/user';
import { addUser, findUserById } from '../services/user.service';
import { generateJwtWebToken, hashPassword, sendError, sendSuccess } from '../utils/utils';

interface RequestWithUser extends Request {
    user: IUser
}
export const registerUser = async (req: RequestWithUser, res: Response) => {
    if (req.user) {
        return sendError(res, 400, "User Already Exists");
    }
    const { email, password, firstName, lastName } = req.body;
    if (!email || !password) {
        return sendError(res, 400, "Invalid Request")
    }
    try {
        const hashedPassword = await hashPassword(password);
        const user = new UserModel()
        user.email = email
        user.password = hashedPassword
        user.firstName = firstName
        user.lastName = lastName
        const createduser = await addUser(user);
        if (createduser) {
            const jwtToken = generateJwtWebToken(createduser.id);
            const response = { id: createduser.id, email: createduser.email, token: jwtToken }
            return sendSuccess(res, 201, "User is created", response)
        } else {
            return sendError(res, 400, "Invalid User Data")
        }
    } catch (error) {

        console.log(error);
        return sendError(res, 400, error.message)
    }
}

export const getSelf = async (req: RequestWithUser, res: Response) => {
    try {
        // const userId = req.user._id
        // const user = await findUserById(userId)
        // if (!user) {
        //     sendError(res, 404, "User not found")
        // } else {
        //     return user
        // }
        console.log("yes")
    } catch (error) {
        console.log(error);
        return sendError(res, 400, error.message)
    }
}
