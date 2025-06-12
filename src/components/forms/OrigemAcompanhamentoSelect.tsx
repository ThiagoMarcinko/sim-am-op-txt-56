
import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface OrigemAcompanhamentoSelectProps {
  value: string;
  onChange: (value: string) => void;
}

const OrigemAcompanhamentoSelect = ({ value, onChange }: OrigemAcompanhamentoSelectProps) => {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium">Origem do Acompanhamento</label>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger>
          <SelectValue placeholder="Selecione a origem" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="1">Jurisdicionado</SelectItem>
          <SelectItem value="2">TCE-PR</SelectItem>
          <SelectItem value="3">CREA-PR</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default OrigemAcompanhamentoSelect;
