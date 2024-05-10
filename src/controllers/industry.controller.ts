import { Request, Response } from 'express';
import { createIndustry, findAllIndustries } from '../services/industries.service';
import { sendError, sendSuccess } from '../utils/utils';
import { IndustriesModel } from '../models/industries';

export const getAllIndustries = async (req: Request, res: Response) => {
    try {
        const industries = await findAllIndustries()
        return sendSuccess(res, 200, "Industries found.", industries)
    } catch (error) {
        sendError(res, 500, "Something went wrong!")
    }
}

