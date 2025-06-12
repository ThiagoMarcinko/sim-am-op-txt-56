
import React from 'react';
import { Input } from '@/components/ui/input';

interface DecimalInputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
}

const DecimalInput = ({ label, value, onChange, placeholder }: DecimalInputProps) => {
  const handleChange = (inputValue: string) => {
    if (inputValue === '' || /^\d*\.?\d*$/.test(inputValue)) {
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

export default DecimalInput;
