
import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface MotivoParalisacaoSelectProps {
  value: string;
  onChange: (value: string) => void;
}

const MotivoParalisacaoSelect = ({ value, onChange }: MotivoParalisacaoSelectProps) => {
  const motivos = [
    { value: "1", label: "Falta de recurso próprio" },
    { value: "2", label: "Ausência/ Atraso na liberação de recursos do convênio" },
    { value: "3", label: "Valor orçado insuficiente para conclusão da obra" },
    { value: "4", label: "Alteração de projeto/ Serviços necessários à conclusão da obra não foram previstos" },
    { value: "5", label: "Descumprimento de obrigações contratuais pela empresa contratada" },
    { value: "6", label: "Ação judicial" },
    { value: "7", label: "Não atendimento a exigências legais (Ex. ambientais, pendências em relação à regularidade do terreno, etc.)" },
    { value: "8", label: "Obra incompatível com interesses do município" }
  ];

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium">Motivo da Paralisação</label>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger>
          <SelectValue placeholder="Selecione o motivo" />
        </SelectTrigger>
        <SelectContent>
          {motivos.map((motivo) => (
            <SelectItem key={motivo.value} value={motivo.value}>
              {motivo.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default MotivoParalisacaoSelect;
