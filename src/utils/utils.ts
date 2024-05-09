import { Request, Response } from 'express';
import bcrypt from "bcrypt";
import * as jwt from 'jsonwebtoken'
import { Types } from 'mongoose';
import 'dotenv/config'

export const sendSuccess = (res: Response, statusCode: number, message: string, data: any) => {
    const status = 'Success'
    const result = {
        status,
        message,
        data
    }
    return res.status(statusCode).json(result)
}

export const sendError = (res: Response, statusCode: number, message: string) => {
    const status = 'Error'
    const result = {
        status,
        message
    }
    return res.status(statusCode).json(result)
}

export const hashPassword = async (password: string) => {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword
}

export const verifyPassword = async (password: string, hashedPassword: string) => {
    try {
        const isValid = await bcrypt.compare(password, hashedPassword);
        return isValid;
    } catch (error) {
        throw error;
    }
}

export const generateJwtWebToken = (id: Types.ObjectId) => {
    return jwt.sign({ id }, process.env.JWT_SECRET as string, {
        expiresIn: "7d"
    })
}
