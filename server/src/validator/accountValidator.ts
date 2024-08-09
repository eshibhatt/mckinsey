import { z } from 'zod';

export const accountSchema = z.object({
	name: z.string().min(1, 'Name is required'),
	email: z.string().email('Invalid email format'),
	password: z.string().min(6, 'Password must be at least 6 characters long'),
	role: z.enum(['Admin', 'Delivery Admin']).default('Delivery Admin'),
});

export const accountLoginSchema = z.object({
    email: z.string().email('Invalid email format'),
    password: z.string().min(6, 'Password must be at least 6 characters long'),
});
