
import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface AnoSelectProps {
  value: string;
  onChange: (value: string) => void;
  label?: string;
  placeholder?: string;
}

const AnoSelect = ({ 
  value, 
  onChange, 
  label = "Ano da Intervenção",
  placeholder = "Selecione o ano" 
}: AnoSelectProps) => {
  const anos = ['2023', '2024', '2025', '2026', '2027', '2028'];

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium">{label}</label>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger>
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {anos.map((ano) => (
            <SelectItem key={ano} value={ano}>
              {ano}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default AnoSelect;
