import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';

interface FormData {
  idPessoa: string;
  nrEmpenho: string;
  nrAnoEmpenho: string;
  idOrigemEmpenho: string;
  cdIntervencao: string;
  nrAnoIntervencao: string;
}

const EmpenhoIntervencao = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState<FormData>({
    idPessoa: '',
    nrEmpenho: '',
    nrAnoEmpenho: '',
    idOrigemEmpenho: '',
    cdIntervencao: '',
    nrAnoIntervencao: '',
  });

  const validateForm = (): boolean => {
    if (!formData.idPessoa) {
      toast({
        title: "Erro de Validação",
        description: "Selecione a Identificação da Entidade",
        variant: "destructive",
      });
      return false;
    }

    if (!formData.nrEmpenho || formData.nrEmpenho.length > 15) {
      toast({
        title: "Erro de Validação",
        description: "Número do Empenho deve ter no máximo 15 números",
        variant: "destructive",
      });
      return false;
    }

    if (!formData.nrAnoEmpenho) {
      toast({
        title: "Erro de Validação",
        description: "Selecione o Ano do Empenho",
        variant: "destructive",
      });
      return false;
    }

    if (!formData.idOrigemEmpenho || formData.idOrigemEmpenho.length > 7) {
      toast({
        title: "Erro de Validação",
        description: "Origem do Empenho deve ter no máximo 7 números",
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

    return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    const content = `${formData.idPessoa}|${formData.nrEmpenho}|${formData.nrAnoEmpenho}|${formData.idOrigemEmpenho}|${formData.cdIntervencao}|${formData.nrAnoIntervencao}|`;

    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'EmpenhoXIntervencao.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    toast({
      title: "Sucesso",
      description: "Arquivo EmpenhoXIntervencao.txt gerado com sucesso!",
    });
  };

  const handleClear = () => {
    setFormData({
      idPessoa: '',
      nrEmpenho: '',
      nrAnoEmpenho: '',
      idOrigemEmpenho: '',
      cdIntervencao: '',
      nrAnoIntervencao: '',
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

  const handleNrEmpenhoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === '' || (/^\d+$/.test(value) && value.length <= 15)) {
      updateFormData('nrEmpenho', value);
    }
  };

  const handleOrigemEmpenhoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === '' || (/^\d+$/.test(value) && value.length <= 7)) {
      updateFormData('idOrigemEmpenho', value);
    }
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-4xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle className="text-3xl font-bold text-center">Empenho X Intervenção</CardTitle>
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
                  <Label htmlFor="nrEmpenho">Número do Empenho</Label>
                  <Input
                    id="nrEmpenho"
                    type="text"
                    maxLength={15}
                    value={formData.nrEmpenho}
                    onChange={handleNrEmpenhoChange}
                    placeholder="Máximo 15 números"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="nrAnoEmpenho">Ano do Empenho</Label>
                  <Select value={formData.nrAnoEmpenho} onValueChange={(value) => updateFormData('nrAnoEmpenho', value)}>
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
                  <Label htmlFor="idOrigemEmpenho">Origem do Empenho</Label>
                  <Input
                    id="idOrigemEmpenho"
                    type="text"
                    maxLength={7}
                    value={formData.idOrigemEmpenho}
                    onChange={handleOrigemEmpenhoChange}
                    placeholder="Máximo 7 números"
                  />
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
              </div>

              <div className="flex gap-4 justify-center pt-6">
                <Button type="submit" className="px-8">
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

export default EmpenhoIntervencao;
