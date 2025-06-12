
import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface ClassificacaoObraSelectProps {
  value: string;
  onChange: (value: string) => void;
}

const ClassificacaoObraSelect = ({ value, onChange }: ClassificacaoObraSelectProps) => {
  const classificacoes = [
    { value: "1", label: "Abatedouro" },
    { value: "2", label: "Barração" },
    { value: "3", label: "Creche" },
    { value: "4", label: "Edifício Administrativo" },
    { value: "5", label: "Escola/Colégio" },
    { value: "6", label: "Hospital" },
    { value: "7", label: "Posto de Saúde" },
    { value: "8", label: "Unidade Habitacional" },
    { value: "9", label: "Outros Edifícios" },
    { value: "10", label: "Malha Viária Urbana" },
    { value: "11", label: "Estrada Municipal" },
    { value: "12", label: "Estrada Rural" },
    { value: "13", label: "Obra de Arte Especial" },
    { value: "14", label: "Abastecimento de Água" },
    { value: "15", label: "Aterro Sanitário" },
    { value: "16", label: "Canalização de Rio" },
    { value: "17", label: "Cemitério" },
    { value: "18", label: "Dragagem" },
    { value: "19", label: "Esgoto" },
    { value: "20", label: "Fundo de Vale" },
    { value: "21", label: "Galeria Pluvial" },
    { value: "22", label: "Outras Obras de Saneamento" },
    { value: "23", label: "Parque ou Praça" },
    { value: "24", label: "Abrigo de ônibus" },
    { value: "25", label: "Outros Equipamentos Urbanos" },
    { value: "26", label: "Iluminação Pública" }
  ];

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium">Classificação da Obra</label>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger>
          <SelectValue placeholder="Selecione a classificação" />
        </SelectTrigger>
        <SelectContent className="max-h-60">
          {classificacoes.map((item) => (
            <SelectItem key={item.value} value={item.value}>
              {item.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default ClassificacaoObraSelect;
