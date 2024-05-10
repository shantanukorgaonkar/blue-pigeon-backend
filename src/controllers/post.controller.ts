import { Request, Response } from 'express';
import { IPostDto } from '../dto/post/post.dto';
import { sendSuccess } from '../utils/utils';
import { RequestWithUser } from '../middleware/auth';

export const addPost = (req: RequestWithUser<IPostDto>, res: Response) => {
    const { caption } = req.body
    const files = req.files
    console.log(files, caption, req.userId)
    return sendSuccess(res, 201, "Success", "Created")
}