import { Request, Response } from 'express';
import { IPostDto } from '../dto/post/post.dto';
import { sendError, sendSuccess } from '../utils/utils';
import { RequestWithUser } from '../middleware/auth';
import upload from "../middleware/file-upload";
import { MulterError } from 'multer';
import { PostModel } from '../models/post';
import { createPost, findAll } from '../services/post.service';
import { ObjectId } from 'mongodb';

const uploadFiles = upload.array('media[]')
export const addPost = (req: RequestWithUser<IPostDto>, res: Response) => {
    uploadFiles(req, res, (err) => {
        if (err instanceof MulterError) {
            return sendError(res, 400, err.message)
        } else if (err instanceof Error) {
            return sendError(res, 400, err.message)
        }

        const { caption } = req.body
        const files = req.files as Express.Multer.File[]

        if (!caption && !files) {
            return sendError(res, 400, "Post must have caption or media.")
        }
        const fileNames: string[] = []
        const post = new PostModel()

        if (files) {
            files.forEach((file) => {
                fileNames.push(file.filename)
            })
            post.media = fileNames
        }
        if (caption) {
            post.caption = caption
        }
        post.user = new ObjectId(req.userId)
        createPost(post).then((result) => {
            return sendSuccess(res, 201, "Post created successfully.", result)
        }).catch((error) => {
            sendError(res, 500, error.message)
        })
    })
}

export const getAllPosts = async (req: RequestWithUser, res: Response) => {
    try {
        const posts = await findAll()
        return sendSuccess(res, 200, "Posts found.", posts)
    } catch (error) {
        sendError(res, 500, error.message)
    }
}

