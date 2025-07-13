
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Eye, EyeOff, Loader, CheckCircle, XCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../../components/ui/form';
import { useToast } from '../../components/ui/use-toast';

import { RegisterFormData } from '../../lib/types/auth';
import { registerSchema } from '../../lib/validations/auth';
import { checkPasswordStrength, formatPhoneNumber } from '../../lib/utils/auth';
import { authService } from '../../services/auth';
import PasswordStrengthIndicator from '../../components/auth/PasswordStrengthIndicator';

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [usernameStatus, setUsernameStatus] = useState<'idle' | 'checking' | 'available' | 'taken'>('idle');
  const [isLoading, setIsLoading] = useState(false);
  
  const navigate = useNavigate();
  const { toast } = useToast();

  const form = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      fullName: '',
      age: 13,
      email: '',
      phoneNumber: '',
      username: '',
      password: '',
      confirmPassword: '',
    },
  });

  const password = form.watch('password');
  const passwordStrength = checkPasswordStrength(password || '');
  const username = form.watch('username');

  // Real-time username availability check
  useEffect(() => {
    const checkUsername = async () => {
      if (username && username.length >= 3) {
        setUsernameStatus('checking');
        try {
          const result = await authService.checkUsernameAvailability(username);
          setUsernameStatus(result.available ? 'available' : 'taken');
        } catch {
          setUsernameStatus('idle');
        }
      } else {
        setUsernameStatus('idle');
      }
    };

    const timeoutId = setTimeout(checkUsername, 500);
    return () => clearTimeout(timeoutId);
  }, [username]);

  const onSubmit = async (data: RegisterFormData) => {
    setIsLoading(true);
    
    try {
      const formattedData = {
        ...data,
        phoneNumber: formatPhoneNumber(data.phoneNumber),
      };

      const result = await authService.register(formattedData);
      
      if (result.success) {
        toast({
          title: 'Registration successful!',
          description: 'Please check your phone for the verification code.',
        });
        
        // Store registration data for OTP verification
        sessionStorage.setItem('registrationData', JSON.stringify({
          email: formattedData.email,
          phoneNumber: formattedData.phoneNumber,
        }));
        
        navigate('/auth/verify-otp');
      } else {
        toast({
          variant: 'destructive',
          title: 'Registration failed',
          description: result.message || 'Please check your information and try again.',
        });

        // Handle field-specific errors
        if (result.errors) {
          Object.entries(result.errors).forEach(([field, message]) => {
            form.setError(field as keyof RegisterFormData, { message });
          });
        }
      }
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Network error',
        description: 'Please check your connection and try again.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const getUsernameIcon = () => {
    switch (usernameStatus) {
      case 'checking':
        return <Loader className="w-4 h-4 animate-spin text-text-muted" />;
      case 'available':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'taken':
        return <XCircle className="w-4 h-4 text-red-500" />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-bg-primary flex items-center justify-center p-6">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-text-primary">Create Account</h1>
          <p className="mt-2 text-text-secondary">Join VoltStream and start streaming</p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Full Name */}
            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="Enter your full name" 
                      {...field} 
                      disabled={isLoading}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Age */}
            <FormField
              control={form.control}
              name="age"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Age</FormLabel>
                  <FormControl>
                    <Input 
                      type="number" 
                      placeholder="Enter your age" 
                      {...field}
                      onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                      disabled={isLoading}
                      min={13}
                      max={120}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Email */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email Address</FormLabel>
                  <FormControl>
                    <Input 
                      type="email" 
                      placeholder="Enter your email" 
                      {...field} 
                      disabled={isLoading}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Phone Number */}
            <FormField
              control={form.control}
              name="phoneNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl>
                    <Input 
                      type="tel" 
                      placeholder="+1234567890" 
                      {...field}
                      onChange={(e) => field.onChange(formatPhoneNumber(e.target.value))}
                      disabled={isLoading}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Username */}
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input 
                        placeholder="Choose a unique username" 
                        {...field} 
                        disabled={isLoading}
                      />
                      <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                        {getUsernameIcon()}
                      </div>
                    </div>
                  </FormControl>
                  {usernameStatus === 'available' && (
                    <p className="text-sm text-green-500">Username is available!</p>
                  )}
                  {usernameStatus === 'taken' && (
                    <p className="text-sm text-red-500">Username is already taken</p>
                  )}
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Password */}
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input 
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Create a strong password" 
                        {...field} 
                        disabled={isLoading}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-text-muted hover:text-text-secondary"
                        disabled={isLoading}
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </FormControl>
                  <PasswordStrengthIndicator strength={passwordStrength} password={password || ''} />
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Confirm Password */}
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input 
                        type={showConfirmPassword ? 'text' : 'password'}
                        placeholder="Confirm your password" 
                        {...field} 
                        disabled={isLoading}
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-text-muted hover:text-text-secondary"
                        disabled={isLoading}
                      >
                        {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button 
              type="submit" 
              className="w-full" 
              disabled={isLoading || usernameStatus === 'taken' || usernameStatus === 'checking'}
            >
              {isLoading && <Loader className="w-4 h-4 mr-2 animate-spin" />}
              Create Account
            </Button>
          </form>
        </Form>

        <div className="text-center">
          <p className="text-text-secondary">
            Already have an account?{' '}
            <button
              onClick={() => navigate('/auth/login')}
              className="text-primary-green hover:text-primary-green-hover font-medium"
              disabled={isLoading}
            >
              Sign in
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
