import { z } from 'zod';

export const FirstNameSchema = z
  .string()
  .trim()
  .min(1, { message: 'First name cannot be empty.' })
  .max(30, { message: 'First name must be 30 characters or less.' });

export const LastNameSchema = z
  .string()
  .trim()
  .min(1, { message: 'Last name cannot be empty.' })
  .max(30, { message: 'Last name must be 30 characters or less.' });

export const UsernameSchema = z
  .string()
  .min(3, { message: 'Username is too short' })
  .max(20, { message: 'Username is too long' })
  .regex(/^[a-zA-Z0-9_]+$/, {
    message: 'Username can only include letters, numbers, and underscores',
  })
  // users can type the username in any case, but we store it in lowercase
  .transform(value => value.toLowerCase());

export const EmailSchema = z
  .string()
  .email({ message: 'Email is invalid' })
  .min(3, { message: 'Email is too short' })
  .max(100, { message: 'Email is too long' })
  // users can type the email in any case, but we store it in lowercase
  .transform(value => value.toLowerCase());

export const PasswordSchema = z
  .string()
  .min(8, { message: 'Password must be at least 8 characters long' })
  .max(124, { message: 'Password must be at most 124 characters long' })
  .regex(/[A-Z]/, { message: 'Password must contain at least one uppercase letter' })
  .regex(/[\W_]/, { message: 'Password must contain at least one special character' })
  .regex(/[0-9]/, { message: 'Password must contain at least one number' });

export const SignupSchema = z
  .object({
    firstName: FirstNameSchema,
    lastName: LastNameSchema,
    username: UsernameSchema,
    email: EmailSchema,
    password: PasswordSchema,
    confirmPassword: z.string(),
  })
  .refine(({ password, confirmPassword }) => password === confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'], // This will attach the error to the passwordConfirm field
  });

export const LoginSchema = z.object({
  email: z
    .string()
    .email()
    .transform(value => value.toLowerCase()),
  password: z.string(),
  rememberMe: z.literal('on').optional(),
  redirectTo: z.string().optional(),
});
