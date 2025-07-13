
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Eye, EyeOff, Loader } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Checkbox } from '../../components/ui/checkbox';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../../components/ui/form';
import { useToast } from '../../components/ui/use-toast';

import { LoginFormData } from '../../lib/types/auth';
import { loginSchema } from '../../lib/validations/auth';
import { authService } from '../../services/auth';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const navigate = useNavigate();
  const { toast } = useToast();

  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      usernameOrEmail: '',
      password: '',
      rememberMe: false,
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true);
    
    try {
      const result = await authService.login(data);
      
      if (result.success) {
        toast({
          title: 'Welcome back!',
          description: 'You have successfully signed in.',
        });
        
        // Store user data and redirect
        if (result.data) {
          sessionStorage.setItem('user', JSON.stringify(result.data.user));
          if (!data.rememberMe) {
            sessionStorage.setItem('auth_token', result.data.token);
          }
        }
        
        navigate('/');
      } else {
        toast({
          variant: 'destructive',
          title: 'Sign in failed',
          description: result.message || 'Invalid credentials. Please try again.',
        });

        // Handle specific error cases
        if (result.message.includes('locked')) {
          form.setError('usernameOrEmail', { 
            message: 'Account temporarily locked due to multiple failed attempts' 
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

  return (
    <div className="min-h-screen bg-bg-primary flex items-center justify-center p-6">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-text-primary">Welcome Back</h1>
          <p className="mt-2 text-text-secondary">Sign in to your VoltStream account</p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Username or Email */}
            <FormField
              control={form.control}
              name="usernameOrEmail"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username or Email</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="Enter your username or email" 
                      {...field} 
                      disabled={isLoading}
                      autoFocus
                    />
                  </FormControl>
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
                        placeholder="Enter your password" 
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
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Remember Me and Forgot Password */}
            <div className="flex items-center justify-between">
              <FormField
                control={form.control}
                name="rememberMe"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        disabled={isLoading}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel className="text-sm font-normal">
                        Remember me
                      </FormLabel>
                    </div>
                  </FormItem>
                )}
              />
              
              <button
                type="button"
                onClick={() => navigate('/auth/forgot-password')}
                className="text-sm text-primary-green hover:text-primary-green-hover font-medium"
                disabled={isLoading}
              >
                Forgot password?
              </button>
            </div>

            <Button 
              type="submit" 
              className="w-full" 
              disabled={isLoading}
            >
              {isLoading && <Loader className="w-4 h-4 mr-2 animate-spin" />}
              Sign In
            </Button>
          </form>
        </Form>

        <div className="text-center">
          <p className="text-text-secondary">
            Don't have an account?{' '}
            <button
              onClick={() => navigate('/auth/register')}
              className="text-primary-green hover:text-primary-green-hover font-medium"
              disabled={isLoading}
            >
              Create account
            </button>
          </p>
        </div>

        {/* Future: Social Login Options */}
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-bg-tertiary" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-bg-primary px-2 text-text-muted">Coming Soon</span>
          </div>
        </div>
        
        <div className="grid grid-cols-3 gap-3 opacity-50">
          <Button variant="outline" disabled className="w-full">
            Google
          </Button>
          <Button variant="outline" disabled className="w-full">
            Facebook
          </Button>
          <Button variant="outline" disabled className="w-full">
            Apple
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Login;
