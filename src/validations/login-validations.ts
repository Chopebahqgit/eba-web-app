import { z } from 'zod';
import {
	EmailValidation,
	PasswordValidation,
	TextRequiredSchema,
	CheckBoxOptionalSchema,
} from './scema';

export const RegisterSchema = z
	.object({
		email: EmailValidation,
		password: PasswordValidation,
		confirmPassword: PasswordValidation,
		terms: CheckBoxOptionalSchema,
	})
	.refine(data => data.password === data.confirmPassword, {
		path: ['confirmPassword'],
		message: 'Passwords do not match',
	});

export type RegisterInputs = z.infer<typeof RegisterSchema>;

export const LoginSchema = z.object({
	email: EmailValidation,
	password: TextRequiredSchema,
});

export type LoginInputs = z.infer<typeof LoginSchema>;
