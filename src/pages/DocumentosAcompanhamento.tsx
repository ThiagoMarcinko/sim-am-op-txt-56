
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface FormData {
  idPessoa: string;
  cdIntervencao: string;
  nrAnoIntervencao: string;
  idOrigemAcompanhamento: string;
  nrAcompanhamento: string;
  cdControleLeiAto: string;
}

const DocumentosAcompanhamento = () => {
  const [formData, setFormData] = useState<FormData>({
    idPessoa: '',
    cdIntervencao: '',
    nrAnoIntervencao: '',
    idOrigemAcompanhamento: '',
    nrAcompanhamento: '',
    cdControleLeiAto: '',
  });

  const isFormValid = () => {
    return Object.values(formData).every(value => value !== '');
  };

  const generateTxtFile = () => {
    const txtContent = [
      formData.idPessoa,
      formData.cdIntervencao,
      formData.nrAnoIntervencao,
      formData.idOrigemAcompanhamento,
      formData.nrAcompanhamento,
      formData.cdControleLeiAto
    ].join('|') + '|';

    const blob = new Blob([txtContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'DocumentoAcompanhamento.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const updateFormData = (field: keyof FormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleControleLeiAtoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Permite apenas números e limita a 7 dígitos
    if (value === '' || (/^\d+$/.test(value) && value.length <= 7)) {
      updateFormData('cdControleLeiAto', value);
    }
  };

  return (
    <div className="p-6">
      <div className="max-w-6xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle className="text-3xl font-bold text-center">Documentos de Acompanhamento</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* 1. Identificação da Entidade */}
              <div className="space-y-2">
                <Label htmlFor="idPessoa">Identificação da Entidade</Label>
                <Select value={formData.idPessoa} onValueChange={(value) => updateFormData('idPessoa', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione a entidade" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="12377">Mangueirinha</SelectItem>
                    <SelectItem value="12203">Bandeirantes</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* 2. Código da Intervenção */}
              <div className="space-y-2">
                <Label htmlFor="cdIntervencao">Código da Intervenção</Label>
                <Input
                  id="cdIntervencao"
                  type="number"
                  value={formData.cdIntervencao}
                  onChange={(e) => updateFormData('cdIntervencao', e.target.value)}
                  placeholder="Digite o código"
                />
              </div>

              {/* 3. Ano da Intervenção */}
              <div className="space-y-2">
                <Label htmlFor="nrAnoIntervencao">Ano da Intervenção</Label>
                <Select value={formData.nrAnoIntervencao} onValueChange={(value) => updateFormData('nrAnoIntervencao', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o ano" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="2023">2023</SelectItem>
                    <SelectItem value="2024">2024</SelectItem>
                    <SelectItem value="2025">2025</SelectItem>
                    <SelectItem value="2026">2026</SelectItem>
                    <SelectItem value="2027">2027</SelectItem>
                    <SelectItem value="2028">2028</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* 4. Origem do Acompanhamento */}
              <div className="space-y-2">
                <Label htmlFor="idOrigemAcompanhamento">Origem do Acompanhamento</Label>
                <Select value={formData.idOrigemAcompanhamento} onValueChange={(value) => updateFormData('idOrigemAcompanhamento', value)}>
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

              {/* 5. Número do Acompanhamento */}
              <div className="space-y-2">
                <Label htmlFor="nrAcompanhamento">Número do Acompanhamento</Label>
                <Input
                  id="nrAcompanhamento"
                  type="number"
                  value={formData.nrAcompanhamento}
                  onChange={(e) => updateFormData('nrAcompanhamento', e.target.value)}
                  placeholder="Digite o número"
                />
              </div>

              {/* 6. Código Controle Lei Ato */}
              <div className="space-y-2">
                <Label htmlFor="cdControleLeiAto">Código Controle Lei Ato</Label>
                <Input
                  id="cdControleLeiAto"
                  type="text"
                  maxLength={7}
                  value={formData.cdControleLeiAto}
                  onChange={handleControleLeiAtoChange}
                  placeholder="Máximo 7 números"
                />
              </div>
            </div>

            <div className="flex justify-center pt-6">
              <Button
                onClick={generateTxtFile}
                disabled={!isFormValid()}
                className="px-8 py-3 text-lg"
              >
                Gerar .txt
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DocumentosAcompanhamento;
