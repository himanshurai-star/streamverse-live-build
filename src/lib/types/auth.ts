import { User } from './index';

export interface RegisterFormData {
  fullName: string;
  age: number;
  email: string;
  phoneNumber: string;
  username: string;
  password: string;
  confirmPassword: string;
}

export interface LoginFormData {
  usernameOrEmail: string;
  password: string;
  rememberMe: boolean;
}

export interface OTPVerificationData {
  code: string;
  phoneNumber?: string;
  email?: string;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  data?: {
    user: User;
    token: string;
  };
  errors?: Record<string, string>;
}

export interface PasswordStrength {
  score: number; // 0-4
  feedback: string[];
  hasUppercase: boolean;
  hasLowercase: boolean;
  hasNumber: boolean;
  hasSpecialChar: boolean;
  isLongEnough: boolean;
}
