import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';

interface FormData {
  idPessoa: string;
  cdIntervencao: string;
  nrAnoIntervencao: string;
  idOrigemAcompanhamento: string;
  nrAcompanhamento: string;
  cdControleLeiAto: string;
}

const DocumentosAcompanhamento = () => {
  const { toast } = useToast();
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

  const validateForm = (): boolean => {
    if (!formData.idPessoa) {
      toast({
        title: "Erro de Validação",
        description: "Selecione a Identificação da Entidade",
        variant: "destructive",
      });
      return false;
    }

    if (!formData.cdIntervencao) {
      toast({
        title: "Erro de Validação",
        description: "Código da Intervenção é obrigatório",
        variant: "destructive",
      });
      return false;
    }

    if (!formData.nrAnoIntervencao) {
      toast({
        title: "Erro de Validação",
        description: "Selecione o Ano da Intervenção",
        variant: "destructive",
      });
      return false;
    }

    if (!formData.idOrigemAcompanhamento) {
      toast({
        title: "Erro de Validação",
        description: "Selecione a Origem do Acompanhamento",
        variant: "destructive",
      });
      return false;
    }

    if (!formData.nrAcompanhamento) {
      toast({
        title: "Erro de Validação",
        description: "Número do Acompanhamento é obrigatório",
        variant: "destructive",
      });
      return false;
    }

    if (!formData.cdControleLeiAto || formData.cdControleLeiAto.length > 7) {
      toast({
        title: "Erro de Validação",
        description: "Código Controle Lei Ato deve ter no máximo 7 números",
        variant: "destructive",
      });
      return false;
    }

    return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    const content = `${formData.idPessoa}|${formData.cdIntervencao}|${formData.nrAnoIntervencao}|${formData.idOrigemAcompanhamento}|${formData.nrAcompanhamento}|${formData.cdControleLeiAto}|`;

    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'DocumentoAcompanhamento.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    toast({
      title: "Sucesso",
      description: "Arquivo DocumentoAcompanhamento.txt gerado com sucesso!",
    });
  };

  const handleClear = () => {
    setFormData({
      idPessoa: '',
      cdIntervencao: '',
      nrAnoIntervencao: '',
      idOrigemAcompanhamento: '',
      nrAcompanhamento: '',
      cdControleLeiAto: '',
    });

    toast({
      title: "Formulário Limpo",
      description: "Todos os campos foram limpos.",
    });
  };

  const updateFormData = (field: keyof FormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleControleLeiAtoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === '' || (/^\d+$/.test(value) && value.length <= 7)) {
      updateFormData('cdControleLeiAto', value);
    }
  };

  return (
    <div className="p-6">
      <div className="max-w-4xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle className="text-3xl font-bold text-center">Documentos de Acompanhamento</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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

              <div className="flex gap-4 justify-center pt-6">
                <Button 
                  type="submit" 
                  disabled={!isFormValid()}
                  className="px-8"
                >
                  Gerar Arquivo
                </Button>
                <Button type="button" variant="outline" onClick={handleClear} className="px-8">
                  Limpar Campos
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DocumentosAcompanhamento;
