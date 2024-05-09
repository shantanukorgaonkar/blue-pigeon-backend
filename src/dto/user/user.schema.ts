import { z } from 'zod';

export const userRegistrationSchema = z.object({
    firstName: z.string(),
    lastName: z.string(),
    email: z.string().email(),
    password: z.string().min(8),
});

export const userLoginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8),
});

export const updateUserProfileSchema = z.object({
    firstName: z.string().optional(),
    lastName: z.string().optional(),
    email: z.string().email().optional(),
    username: z.string().optional(),
    interests: z.string().array().optional(),
    industry: z.string().array().optional(),
});