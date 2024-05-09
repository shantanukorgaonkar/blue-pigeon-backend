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