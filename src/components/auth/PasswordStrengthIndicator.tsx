
import React from 'react';
import { PasswordStrength } from '../../lib/types/auth';
import { cn } from '../../lib/utils';

interface PasswordStrengthIndicatorProps {
  strength: PasswordStrength;
  password: string;
}

const PasswordStrengthIndicator: React.FC<PasswordStrengthIndicatorProps> = ({ 
  strength, 
  password 
}) => {
  if (!password) return null;

  const getStrengthColor = (score: number) => {
    switch (score) {
      case 0: return 'bg-red-500';
      case 1: return 'bg-orange-500';
      case 2: return 'bg-yellow-500';
      case 3: return 'bg-blue-500';
      case 4: return 'bg-green-500';
      default: return 'bg-gray-300';
    }
  };

  const getStrengthText = (score: number) => {
    switch (score) {
      case 0: return 'Very Weak';
      case 1: return 'Weak';
      case 2: return 'Fair';
      case 3: return 'Good';
      case 4: return 'Strong';
      default: return '';
    }
  };

  return (
    <div className="mt-2 space-y-2">
      {/* Strength Bar */}
      <div className="flex space-x-1">
        {[...Array(5)].map((_, index) => (
          <div
            key={index}
            className={cn(
              'h-2 flex-1 rounded-sm transition-all duration-200',
              index <= strength.score 
                ? getStrengthColor(strength.score)
                : 'bg-bg-tertiary'
            )}
          />
        ))}
      </div>

      {/* Strength Text */}
      <div className="flex justify-between items-center">
        <span className={cn(
          'text-sm font-medium',
          strength.score >= 3 ? 'text-green-500' : 
          strength.score >= 2 ? 'text-yellow-500' : 'text-red-500'
        )}>
          {getStrengthText(strength.score)}
        </span>
      </div>

      {/* Requirements */}
      {strength.score < 4 && (
        <div className="space-y-1">
          {strength.feedback.slice(1).map((feedback, index) => (
            <div key={index} className="flex items-center space-x-2">
              <div className="w-1 h-1 bg-text-muted rounded-full" />
              <span className="text-xs text-text-muted">{feedback}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PasswordStrengthIndicator;
