
import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface TipoMedicaoSelectProps {
  value: string;
  onChange: (value: string) => void;
}

const TipoMedicaoSelect = ({ value, onChange }: TipoMedicaoSelectProps) => {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium">Tipo da Medição</label>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger>
          <SelectValue placeholder="Selecione o tipo" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="1">Execução Indireta - Contrato</SelectItem>
          <SelectItem value="2">Execução Indireta - Aditivo</SelectItem>
          <SelectItem value="3">Execução Direta</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default TipoMedicaoSelect;
