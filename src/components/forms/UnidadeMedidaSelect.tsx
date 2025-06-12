
import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface UnidadeMedidaSelectProps {
  value: string;
  onChange: (value: string) => void;
}

const UnidadeMedidaSelect = ({ value, onChange }: UnidadeMedidaSelectProps) => {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium">Unidade de Medida</label>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger>
          <SelectValue placeholder="Selecione a unidade" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="1">Hora</SelectItem>
          <SelectItem value="2">Hectare</SelectItem>
          <SelectItem value="3">Quilograma</SelectItem>
          <SelectItem value="4">Quilômetro</SelectItem>
          <SelectItem value="5">Metro quadrado</SelectItem>
          <SelectItem value="6">Metro Cúbico</SelectItem>
          <SelectItem value="7">Tonelada</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default UnidadeMedidaSelect;
