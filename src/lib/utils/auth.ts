
import { PasswordStrength } from '../types/auth';

export const checkPasswordStrength = (password: string): PasswordStrength => {
  const hasUppercase = /[A-Z]/.test(password);
  const hasLowercase = /[a-z]/.test(password);
  const hasNumber = /\d/.test(password);
  const hasSpecialChar = /[@$!%*?&]/.test(password);
  const isLongEnough = password.length >= 8;

  const criteriaCount = [hasUppercase, hasLowercase, hasNumber, hasSpecialChar, isLongEnough].filter(Boolean).length;
  
  let score = 0;
  let feedback: string[] = [];

  if (criteriaCount === 5) {
    score = 4;
    feedback.push('Strong password');
  } else if (criteriaCount >= 4) {
    score = 3;
    feedback.push('Good password');
  } else if (criteriaCount >= 3) {
    score = 2;
    feedback.push('Fair password');
  } else if (criteriaCount >= 2) {
    score = 1;
    feedback.push('Weak password');
  } else {
    score = 0;
    feedback.push('Very weak password');
  }

  if (!isLongEnough) feedback.push('At least 8 characters');
  if (!hasUppercase) feedback.push('Add uppercase letter');
  if (!hasLowercase) feedback.push('Add lowercase letter');
  if (!hasNumber) feedback.push('Add number');
  if (!hasSpecialChar) feedback.push('Add special character');

  return {
    score,
    feedback,
    hasUppercase,
    hasLowercase,
    hasNumber,
    hasSpecialChar,
    isLongEnough
  };
};

export const formatPhoneNumber = (phone: string): string => {
  // Remove all non-digit characters
  const cleaned = phone.replace(/\D/g, '');
  
  // Add + prefix if not present
  if (cleaned.length > 0 && !phone.startsWith('+')) {
    return '+' + cleaned;
  }
  
  return phone;
};

export const isValidUsername = (username: string): boolean => {
  return /^[a-zA-Z0-9]+$/.test(username) && username.length <= 50;
};
