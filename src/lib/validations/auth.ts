
import { z } from 'zod';

export const registerSchema = z.object({
  fullName: z
    .string()
    .min(1, 'Full name is required')
    .max(100, 'Full name must be less than 100 characters')
    .regex(/^[a-zA-Z\s\-']+$/, 'Only letters, spaces, hyphens, and apostrophes allowed'),
  
  age: z
    .number()
    .min(13, 'You must be at least 13 years old')
    .max(120, 'Please enter a valid age'),
  
  email: z
    .string()
    .min(1, 'Email is required')
    .email('Please enter a valid email address'),
  
  phoneNumber: z
    .string()
    .min(1, 'Phone number is required')
    .regex(/^\+[1-9]\d{1,14}$/, 'Please enter a valid international phone number'),
  
  username: z
    .string()
    .min(1, 'Username is required')
    .max(50, 'Username must be less than 50 characters')
    .regex(/^[a-zA-Z0-9]+$/, 'Username can only contain letters and numbers'),
  
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/, 
      'Password must include uppercase, lowercase, number, and special character'),
  
  confirmPassword: z.string().min(1, 'Please confirm your password')
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

export const loginSchema = z.object({
  usernameOrEmail: z
    .string()
    .min(1, 'Username or email is required'),
  
  password: z
    .string()
    .min(1, 'Password is required'),
  
  rememberMe: z.boolean().default(false)
});

export const otpSchema = z.object({
  code: z
    .string()
    .length(6, 'OTP must be exactly 6 digits')
    .regex(/^\d{6}$/, 'OTP must contain only numbers')
});
