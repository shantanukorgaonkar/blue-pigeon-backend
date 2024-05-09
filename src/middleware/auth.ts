
import { Request, Response, NextFunction } from 'express';
import { sendError } from '../utils/utils';
import { IUser, UserModel } from '../models/user';
import * as jwt from 'jsonwebtoken'
import 'dotenv/config'
import { findUserById } from '../services/user.service';

export interface IToken extends jwt.JwtPayload {
    id: string
}
export interface RequestWithUser<T = any> extends Request<{}, {}, T> {
    userId: string
}

export const verifyAuth = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    const incomingAuthToken = req.headers.authorization;
    if (!incomingAuthToken) {
        return sendError(res, 401, "Not Authorised");
    }

    if (incomingAuthToken.startsWith('Bearer')) {
        try {
            const token = incomingAuthToken.split(' ')[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
            const userId = (decoded as IToken).id
            const user = await findUserById(userId)

            if (!user) {
                return sendError(res, 404, "User does not exist")
            } else {
                req.userId = user.id
                console.log(req.user)
            }
            next();
        } catch (error) {
            console.log(error)
            return sendError(res, 400, "Invalid Token")
        }
    } else {
        return sendError(res, 400, "Invalid Token")
    }
}

