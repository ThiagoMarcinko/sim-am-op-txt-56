
import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface RegimeIntervencaoSelectProps {
  value: string;
  onChange: (value: string) => void;
}

const RegimeIntervencaoSelect = ({ value, onChange }: RegimeIntervencaoSelectProps) => {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium">Regime da Intervenção</label>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger>
          <SelectValue placeholder="Selecione o regime" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="Direto">Direto</SelectItem>
          <SelectItem value="Indireto">Indireto</SelectItem>
          <SelectItem value="Misto (Direto + Indireto)">Misto (Direto + Indireto)</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default RegimeIntervencaoSelect;
