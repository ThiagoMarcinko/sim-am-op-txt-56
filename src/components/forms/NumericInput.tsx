
import React from 'react';
import { Input } from '@/components/ui/input';

interface NumericInputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  maxLength?: number;
}

const NumericInput = ({ label, value, onChange, placeholder, maxLength }: NumericInputProps) => {
  const handleNumericInputChange = (inputValue: string) => {
    const numericValue = inputValue.replace(/[^0-9]/g, '');
    if (!maxLength || numericValue.length <= maxLength) {
      onChange(numericValue);
    }
  };

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium">{label}</label>
      <Input
        type="text"
        inputMode="numeric"
        value={value}
        onChange={(e) => handleNumericInputChange(e.target.value)}
        placeholder={placeholder}
        maxLength={maxLength}
      />
    </div>
  );
};

export default NumericInput;
