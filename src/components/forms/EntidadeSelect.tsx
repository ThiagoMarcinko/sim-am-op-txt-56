
import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface EntidadeSelectProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

const EntidadeSelect = ({ value, onChange, placeholder = "Selecione a entidade" }: EntidadeSelectProps) => {
  const entidades = [
    { label: 'Mangueirinha', value: '12377' },
    { label: 'Bandeirantes', value: '12203' },
  ];

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium">Identificação da Entidade</label>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger>
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {entidades.map((entidade) => (
            <SelectItem key={entidade.value} value={entidade.value}>
              {entidade.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default EntidadeSelect;
