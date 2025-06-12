
import React from 'react';
import { Input } from '@/components/ui/input';

interface PercentualInputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
}

const PercentualInput = ({ label, value, onChange, placeholder }: PercentualInputProps) => {
  const handleChange = (inputValue: string) => {
    const numericValue = parseFloat(inputValue);
    
    if (inputValue === '' || (!isNaN(numericValue) && numericValue >= 0 && numericValue <= 100)) {
      onChange(inputValue);
    }
  };

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium">{label}</label>
      <Input
        type="text"
        inputMode="decimal"
        value={value}
        onChange={(e) => handleChange(e.target.value)}
        placeholder={placeholder}
      />
    </div>
  );
};

export default PercentualInput;
