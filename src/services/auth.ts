
import { RegisterFormData, LoginFormData, AuthResponse } from '../lib/types/auth';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api';

class AuthService {
  async register(data: RegisterFormData): Promise<AuthResponse> {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      return result;
    } catch (error) {
      return {
        success: false,
        message: 'Network error. Please try again.',
      };
    }
  }

  async login(data: LoginFormData): Promise<AuthResponse> {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      
      if (result.success && data.rememberMe) {
        // Store token in localStorage for remember me
        localStorage.setItem('auth_token', result.data.token);
      }

      return result;
    } catch (error) {
      return {
        success: false,
        message: 'Network error. Please try again.',
      };
    }
  }

  async verifyOTP(code: string, phone?: string, email?: string): Promise<AuthResponse> {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/verify-otp`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code, phoneNumber: phone, email }),
      });

      const result = await response.json();
      return result;
    } catch (error) {
      return {
        success: false,
        message: 'Network error. Please try again.',
      };
    }
  }

  async resendOTP(phone?: string, email?: string): Promise<AuthResponse> {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/resend-otp`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ phoneNumber: phone, email }),
      });

      const result = await response.json();
      return result;
    } catch (error) {
      return {
        success: false,
        message: 'Network error. Please try again.',
      };
    }
  }

  async checkUsernameAvailability(username: string): Promise<{ available: boolean }> {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/check-username?username=${encodeURIComponent(username)}`);
      const result = await response.json();
      return result;
    } catch (error) {
      return { available: false };
    }
  }
}

export const authService = new AuthService();
