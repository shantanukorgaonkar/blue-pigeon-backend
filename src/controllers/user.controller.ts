import { Request, Response } from 'express';
import { IUser, UserModel } from '../models/user';
import { addUser, findUserByEmail, findUserById } from '../services/user.service';
import { generateJwtWebToken, hashPassword, sendError, sendSuccess, verifyPassword } from '../utils/utils';
import { RequestWithUser } from '../middleware/auth';


export const registerUser = async (req: Request, res: Response) => {
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
        const userId = req.userId
        const user = await findUserById(userId)
        if (!user) {
            sendError(res, 404, "User not found")
        } else {
            return sendSuccess(res, 200, "User found", user)
        }

    } catch (error) {
        console.log(error);
        return sendError(res, 400, error.message)
    }
}
export const loginUser = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return sendError(res, 400, "Invalid Request");
    }
    try {
        const user = await findUserByEmail(email);
        if (!user) {
            return sendError(res, 404, "User Does not exist");
        }
        const isPasswordValid = await verifyPassword(password, user.password);
        if (isPasswordValid) {
            const jwtToken = generateJwtWebToken(user.id);
            const response = { id: user.id, email: user.email, token: jwtToken }
            return sendSuccess(res, 200, "Logged In", response)
        } else {
            return sendError(res, 400, "Incorrect Password")
        }
    } catch (error) {
        console.log(error)
        return sendError(res, 400, error.message)
    }
}