import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';

interface FormData {
  idPessoa: string;
  idOrigemAcao: string;
  cdAcao: string;
  cdControleLeiAto: string;
  cdIntervencao: string;
  nrAnoIntervencao: string;
}

const IntervencaoAcaoPlanejamento = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState<FormData>({
    idPessoa: '',
    idOrigemAcao: '',
    cdAcao: '',
    cdControleLeiAto: '',
    cdIntervencao: '',
    nrAnoIntervencao: '',
  });

  const entidades = [
    { label: 'Mangueirinha', value: '12377' },
    { label: 'Bandeirantes', value: '12203' },
  ];

  const anos = ['2023', '2024', '2025', '2026', '2027', '2028'];

  const isFormValid = () => {
    return Object.values(formData).every(value => value !== '');
  };

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
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

    if (!formData.idOrigemAcao || formData.idOrigemAcao.length > 7) {
      toast({
        title: "Erro de Validação",
        description: "Origem da Ação deve ter no máximo 7 números",
        variant: "destructive",
      });
      return false;
    }

    if (!formData.cdAcao || formData.cdAcao.length > 4) {
      toast({
        title: "Erro de Validação",
        description: "Código da Ação deve ter no máximo 4 caracteres",
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

    const content = `${formData.idPessoa}|${formData.idOrigemAcao}|${formData.cdAcao}|${formData.cdControleLeiAto}|${formData.cdIntervencao}|${formData.nrAnoIntervencao}|`;

    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'AcaoXIntervencao.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    toast({
      title: "Sucesso",
      description: "Arquivo AcaoXIntervencao.txt gerado com sucesso!",
    });
  };

  const handleClear = () => {
    setFormData({
      idPessoa: '',
      idOrigemAcao: '',
      cdAcao: '',
      cdControleLeiAto: '',
      cdIntervencao: '',
      nrAnoIntervencao: '',
    });

    toast({
      title: "Formulário Limpo",
      description: "Todos os campos foram limpos.",
    });
  };

  return (
    <div className="p-6">
      <div className="max-w-4xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle className="text-3xl font-bold text-center">
              Intervenção X Ação do Planejamento
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Identificação da Entidade</label>
                  <Select value={formData.idPessoa} onValueChange={(value) => handleInputChange('idPessoa', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione a entidade" />
                    </SelectTrigger>
                    <SelectContent>
                      {entidades.map((entidade) => (
                        <SelectItem key={entidade.value} value={entidade.value}>
                          {entidade.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Origem da Ação (máx. 7 números)</label>
                  <Input
                    type="number"
                    value={formData.idOrigemAcao}
                    onChange={(e) => {
                      const value = e.target.value;
                      if (value.length <= 7) {
                        handleInputChange('idOrigemAcao', value);
                      }
                    }}
                    placeholder="Digite a origem da ação"
                    maxLength={7}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Código da Ação (máx. 4 caracteres)</label>
                  <Input
                    type="number"
                    value={formData.cdAcao}
                    onChange={(e) => {
                      const value = e.target.value;
                      if (value.length <= 4) {
                        handleInputChange('cdAcao', value);
                      }
                    }}
                    placeholder="Digite o código da ação"
                    maxLength={4}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Código Controle Lei Ato (máx. 7 números)</label>
                  <Input
                    type="number"
                    value={formData.cdControleLeiAto}
                    onChange={(e) => {
                      const value = e.target.value;
                      if (value.length <= 7) {
                        handleInputChange('cdControleLeiAto', value);
                      }
                    }}
                    placeholder="Digite o código controle lei ato"
                    maxLength={7}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Código da Intervenção</label>
                  <Input
                    type="number"
                    value={formData.cdIntervencao}
                    onChange={(e) => handleInputChange('cdIntervencao', e.target.value)}
                    placeholder="Digite o código da intervenção"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Ano da Intervenção</label>
                  <Select value={formData.nrAnoIntervencao} onValueChange={(value) => handleInputChange('nrAnoIntervencao', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o ano" />
                    </SelectTrigger>
                    <SelectContent>
                      {anos.map((ano) => (
                        <SelectItem key={ano} value={ano}>
                          {ano}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
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

export default IntervencaoAcaoPlanejamento;
