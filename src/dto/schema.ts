import { z } from 'zod';

export const userRegistrationSchema = z.object({
    firstName: z.string(),
    lastName: z.string(),
    email: z.string().email({ message: 'Invalid email.' }),
    password: z.string().min(8, { message: 'Password must have a minimum of 8 characters.' }),
});

export const userLoginSchema = z.object({
    email: z.string().email({ message: 'Invalid email.' }),
    password: z.string().min(8, { message: 'Password must have a minimum of 8 characters.' }),
});