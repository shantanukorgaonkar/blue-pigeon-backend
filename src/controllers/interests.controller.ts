import { Request, Response } from 'express';
import { findAllInterests } from '../services/interests.service';
import { sendError, sendSuccess } from '../utils/utils';

export const getAllInterests = async (req: Request, res: Response) => {
    try {
        const interests = await findAllInterests()
        return sendSuccess(res, 200, "Interests found.", interests)
    } catch (error) {
        sendError(res, 500, "Something went wrong!")
    }
}