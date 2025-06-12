
import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface TipoObraSelectProps {
  value: string;
  onChange: (value: string) => void;
}

const TipoObraSelect = ({ value, onChange }: TipoObraSelectProps) => {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium">Tipo da Obra</label>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger>
          <SelectValue placeholder="Selecione o tipo de obra" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="1">Edificação</SelectItem>
          <SelectItem value="2">Pavimentação</SelectItem>
          <SelectItem value="3">Saneamento</SelectItem>
          <SelectItem value="4">Parque ou praça</SelectItem>
          <SelectItem value="5">Equipamento Urbano</SelectItem>
          <SelectItem value="6">Iluminação Pública</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default TipoObraSelect;
