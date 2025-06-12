
import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface ClassificacaoIntervencaoSelectProps {
  value: string;
  onChange: (value: string) => void;
}

const ClassificacaoIntervencaoSelect = ({ value, onChange }: ClassificacaoIntervencaoSelectProps) => {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium">Classificação da Intervenção</label>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger>
          <SelectValue placeholder="Selecione a classificação" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="1">Construção</SelectItem>
          <SelectItem value="2">Ampliação</SelectItem>
          <SelectItem value="3">Reforma</SelectItem>
          <SelectItem value="4">Outro</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default ClassificacaoIntervencaoSelect;
