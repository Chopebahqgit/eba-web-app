import { z } from 'zod';

export const EmailValidation = z.email('Please enter a valid email');
export const PasswordValidation = z
	.string()
	.min(8, { message: 'Password must be at least 8 characters' })
	.regex(/[0-9]/, { message: 'Password must contain at least 1 number' })
	.regex(/[a-z]/, { message: 'Password must contain at least 1 lowercase letter' })
	.regex(/[A-Z]/, { message: 'Password must contain at least 1 uppercase letter' });
export const TextRequiredSchema = z.string().trim().min(1, 'This field is required');
export const TextOptionalSchema = z.string().trim().optional();
export const CheckBoxOptionalSchema = z.boolean().optional();
