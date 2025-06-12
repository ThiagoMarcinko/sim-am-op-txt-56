
import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface TipoIntervencaoSelectProps {
  value: string;
  onChange: (value: string) => void;
}

const TipoIntervencaoSelect = ({ value, onChange }: TipoIntervencaoSelectProps) => {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium">Tipo da Intervenção</label>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger>
          <SelectValue placeholder="Selecione o tipo" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="1">Execução de obra</SelectItem>
          <SelectItem value="2">Projeto</SelectItem>
          <SelectItem value="3">Outras Atividades Técnicas</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default TipoIntervencaoSelect;
