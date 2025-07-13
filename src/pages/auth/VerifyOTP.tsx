
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Loader, RefreshCw, ArrowLeft } from 'lucide-react';

import { Button } from '../../components/ui/button';
import { useToast } from '../../components/ui/use-toast';
import OTPInput from '../../components/auth/OTPInput';

import { authService } from '../../services/auth';

const VerifyOTP = () => {
  const [otp, setOtp] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(0);
  const [registrationData, setRegistrationData] = useState<{
    email?: string;
    phoneNumber?: string;
  } | null>(null);
  const [otpError, setOtpError] = useState(false);
  
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // Get registration data from session storage
    const storedData = sessionStorage.getItem('registrationData');
    if (storedData) {
      setRegistrationData(JSON.parse(storedData));
    } else {
      // If no registration data, redirect to register
      navigate('/auth/register');
    }
  }, [navigate]);

  useEffect(() => {
    // Countdown timer for resend cooldown
    if (resendCooldown > 0) {
      const timer = setTimeout(() => {
        setResendCooldown(resendCooldown - 1);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [resendCooldown]);

  useEffect(() => {
    // Auto-submit when OTP is complete
    if (otp.length === 6 && !isVerifying) {
      handleVerifyOTP();
    }
  }, [otp]);

  const handleVerifyOTP = async () => {
    if (otp.length !== 6) return;

    setIsVerifying(true);
    setOtpError(false);
    
    try {
      const result = await authService.verifyOTP(
        otp,
        registrationData?.phoneNumber,
        registrationData?.email
      );
      
      if (result.success) {
        toast({
          title: 'Account verified!',
          description: 'Your account has been successfully created.',
        });
        
        // Clear registration data
        sessionStorage.removeItem('registrationData');
        
        // Store user data if provided
        if (result.data) {
          sessionStorage.setItem('user', JSON.stringify(result.data.user));
          sessionStorage.setItem('auth_token', result.data.token);
        }
        
        navigate('/');
      } else {
        setOtpError(true);
        toast({
          variant: 'destructive',
          title: 'Verification failed',
          description: result.message || 'Invalid code. Please try again.',
        });
        
        // Clear OTP on error
        setOtp('');
      }
    } catch (error) {
      setOtpError(true);
      toast({
        variant: 'destructive',
        title: 'Network error',
        description: 'Please check your connection and try again.',
      });
    } finally {
      setIsVerifying(false);
    }
  };

  const handleResendOTP = async () => {
    if (resendCooldown > 0 || isResending) return;

    setIsResending(true);
    
    try {
      const result = await authService.resendOTP(
        registrationData?.phoneNumber,
        registrationData?.email
      );
      
      if (result.success) {
        toast({
          title: 'Code sent!',
          description: 'A new verification code has been sent.',
        });
        
        setResendCooldown(60); // 60 second cooldown
        setOtp(''); // Clear current OTP
        setOtpError(false);
      } else {
        toast({
          variant: 'destructive',
          title: 'Failed to resend',
          description: result.message || 'Please try again later.',
        });
      }
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Network error',
        description: 'Please check your connection and try again.',
      });
    } finally {
      setIsResending(false);
    }
  };

  const handleChangeContact = () => {
    // Allow user to go back and change phone/email
    navigate('/auth/register');
  };

  if (!registrationData) {
    return (
      <div className="min-h-screen bg-bg-primary flex items-center justify-center">
        <Loader className="w-8 h-8 animate-spin text-primary-green" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bg-primary flex items-center justify-center p-6">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <button
            onClick={() => navigate('/auth/register')}
            className="inline-flex items-center text-text-muted hover:text-text-secondary mb-6"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to registration
          </button>
          
          <h1 className="text-3xl font-bold text-text-primary">Verify Your Account</h1>
          <p className="mt-2 text-text-secondary">
            We've sent a 6-digit code to:
          </p>
          
          <div className="mt-4 space-y-1">
            {registrationData.phoneNumber && (
              <p className="text-text-primary font-medium">
                📱 {registrationData.phoneNumber}
              </p>
            )}
            {registrationData.email && (
              <p className="text-text-primary font-medium">
                ✉️ {registrationData.email}
              </p>
            )}
          </div>
        </div>

        <div className="space-y-6">
          {/* OTP Input */}
          <div className="space-y-4">
            <OTPInput
              value={otp}
              onChange={setOtp}
              disabled={isVerifying}
              error={otpError}
            />
            
            {otpError && (
              <p className="text-center text-sm text-red-500">
                Invalid code. Please try again.
              </p>
            )}
          </div>

          {/* Manual Verify Button (backup) */}
          {otp.length === 6 && !isVerifying && (
            <Button 
              onClick={handleVerifyOTP}
              className="w-full"
              disabled={isVerifying}
            >
              {isVerifying && <Loader className="w-4 h-4 mr-2 animate-spin" />}
              Verify Code
            </Button>
          )}

          {/* Resend Options */}
          <div className="text-center space-y-4">
            <div className="text-sm text-text-muted">
              Didn't receive the code?
            </div>
            
            <div className="flex flex-col space-y-2">
              <Button
                variant="outline"
                onClick={handleResendOTP}
                disabled={resendCooldown > 0 || isResending}
                className="w-full"
              >
                {isResending ? (
                  <Loader className="w-4 h-4 mr-2 animate-spin" />
                ) : (
                  <RefreshCw className="w-4 h-4 mr-2" />
                )}
                {resendCooldown > 0 
                  ? `Resend in ${resendCooldown}s`
                  : 'Resend Code'
                }
              </Button>
              
              <Button
                variant="ghost"
                onClick={handleChangeContact}
                className="w-full text-text-muted"
              >
                Change phone number or email
              </Button>
            </div>
          </div>

          {/* Help Text */}
          <div className="text-center text-xs text-text-muted space-y-1">
            <p>The code expires in 10 minutes.</p>
            <p>Check your spam folder if you don't see the email.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifyOTP;
