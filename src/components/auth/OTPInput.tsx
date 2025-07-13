
import React, { useRef, useState, useEffect } from 'react';
import { cn } from '../../lib/utils';

interface OTPInputProps {
  length?: number;
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
  error?: boolean;
}

const OTPInput: React.FC<OTPInputProps> = ({
  length = 6,
  value,
  onChange,
  disabled = false,
  error = false
}) => {
  const [activeInput, setActiveInput] = useState(0);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    inputRefs.current = inputRefs.current.slice(0, length);
  }, [length]);

  useEffect(() => {
    if (inputRefs.current[activeInput]) {
      inputRefs.current[activeInput]?.focus();
    }
  }, [activeInput]);

  const handleChange = (index: number, inputValue: string) => {
    if (disabled) return;

    const newValue = value.split('');
    
    // Only allow numeric input
    if (!/^\d*$/.test(inputValue)) return;
    
    newValue[index] = inputValue;
    const newOTP = newValue.join('');
    
    onChange(newOTP);

    // Move to next input if current is filled
    if (inputValue && index < length - 1) {
      setActiveInput(index + 1);
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (disabled) return;

    if (e.key === 'Backspace') {
      const newValue = value.split('');
      
      if (newValue[index]) {
        newValue[index] = '';
        onChange(newValue.join(''));
      } else if (index > 0) {
        setActiveInput(index - 1);
        newValue[index - 1] = '';
        onChange(newValue.join(''));
      }
    } else if (e.key === 'ArrowLeft' && index > 0) {
      setActiveInput(index - 1);
    } else if (e.key === 'ArrowRight' && index < length - 1) {
      setActiveInput(index + 1);
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    if (disabled) return;
    
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text/plain');
    const numericData = pastedData.replace(/\D/g, '').slice(0, length);
    
    onChange(numericData);
    
    if (numericData.length < length) {
      setActiveInput(numericData.length);
    }
  };

  return (
    <div className="flex justify-center space-x-3">
      {[...Array(length)].map((_, index) => (
        <input
          key={index}
          ref={(ref) => (inputRefs.current[index] = ref)}
          type="text"
          inputMode="numeric"
          maxLength={1}
          value={value[index] || ''}
          onChange={(e) => handleChange(index, e.target.value)}
          onKeyDown={(e) => handleKeyDown(index, e)}
          onPaste={handlePaste}
          onFocus={() => setActiveInput(index)}
          disabled={disabled}
          className={cn(
            'w-12 h-12 text-center text-lg font-semibold rounded-lg border-2 transition-all duration-200',
            'focus:outline-none focus:ring-2 focus:ring-primary-green focus:border-transparent',
            error
              ? 'border-red-500 bg-red-50 text-red-900'
              : 'border-bg-tertiary bg-bg-secondary text-text-primary',
            disabled && 'opacity-50 cursor-not-allowed',
            activeInput === index && !disabled && 'border-primary-green'
          )}
        />
      ))}
    </div>
  );
};

export default OTPInput;
