
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';

interface FormData {
  idPessoa: string;
  cdIntervencao: string;
  nrAnoIntervencao: string;
  idOrigemAcompanhamento: string;
  nrAcompanhamento: string;
  idTipoAtoContrato: string;
  idTipoOrigemContrato: string;
  nrContrato: string;
  nrAnoContrato: string;
  nrCNPJOrigem: string;
}

const ExecucaoIndiretaContrato = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState<FormData>({
    idPessoa: '',
    cdIntervencao: '',
    nrAnoIntervencao: '',
    idOrigemAcompanhamento: '',
    nrAcompanhamento: '',
    idTipoAtoContrato: '',
    idTipoOrigemContrato: '',
    nrContrato: '',
    nrAnoContrato: '',
    nrCNPJOrigem: '',
  });

  const entidades = [
    { label: 'Mangueirinha', value: '12377' },
    { label: 'Bandeirantes', value: '12203' },
  ];

  const anosIntervencao = ['2023', '2024', '2025', '2026', '2027', '2028'];

  const origensAcompanhamento = [
    { label: 'Jurisdicionado', value: '1' },
    { label: 'TCE-PR', value: '2' },
    { label: 'CREA-PR', value: '3' },
  ];

  const tiposAtoContrato = [
    { label: 'Contrato', value: '1' },
    { label: 'Ata de Registro de Preços', value: '2' },
  ];

  const tiposOrigemContrato = [
    { label: 'Própria Entidade', value: '1' },
    { label: 'Contratado/Entidade Pública de Outro Estado', value: '2' },
    { label: 'Outra Entidade pública', value: '3' },
  ];

  const anosContrato = Array.from({ length: 28 }, (_, i) => (2000 + i).toString());

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

    if (!formData.idTipoAtoContrato) {
      toast({
        title: "Erro de Validação",
        description: "Selecione o Tipo do Ato do Contrato",
        variant: "destructive",
      });
      return false;
    }

    if (!formData.idTipoOrigemContrato) {
      toast({
        title: "Erro de Validação",
        description: "Selecione o Tipo de Origem do Contrato",
        variant: "destructive",
      });
      return false;
    }

    if (!formData.nrContrato || formData.nrContrato.length > 9) {
      toast({
        title: "Erro de Validação",
        description: "Número do Contrato deve ter no máximo 9 números",
        variant: "destructive",
      });
      return false;
    }

    if (!formData.nrAnoContrato) {
      toast({
        title: "Erro de Validação",
        description: "Selecione o Ano do Contrato",
        variant: "destructive",
      });
      return false;
    }

    if (!formData.nrCNPJOrigem || formData.nrCNPJOrigem.length > 15) {
      toast({
        title: "Erro de Validação",
        description: "CNPJ da Ent. de Origem do Contrato deve ter no máximo 15 números",
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

    const content = `Identificação da Entidade: ${formData.idPessoa}
Código da Intervenção: ${formData.cdIntervencao}
Ano da Intervenção: ${formData.nrAnoIntervencao}
Origem do Acompanhamento: ${formData.idOrigemAcompanhamento}
Número do Acompanhamento: ${formData.nrAcompanhamento}
Tipo do Ato do Contrato: ${formData.idTipoAtoContrato}
Tipo de Origem do Contrato: ${formData.idTipoOrigemContrato}
Número do Contrato: ${formData.nrContrato}
Ano do Contrato: ${formData.nrAnoContrato}
CNPJ da Ent. de Origem do Contrato: ${formData.nrCNPJOrigem}`;

    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'ExecucaoIndiretaContrato.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    toast({
      title: "Sucesso",
      description: "Arquivo ExecucaoIndiretaContrato.txt gerado com sucesso!",
    });
  };

  const handleClear = () => {
    setFormData({
      idPessoa: '',
      cdIntervencao: '',
      nrAnoIntervencao: '',
      idOrigemAcompanhamento: '',
      nrAcompanhamento: '',
      idTipoAtoContrato: '',
      idTipoOrigemContrato: '',
      nrContrato: '',
      nrAnoContrato: '',
      nrCNPJOrigem: '',
    });

    toast({
      title: "Formulário Limpo",
      description: "Todos os campos foram limpos.",
    });
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-4xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle className="text-3xl font-bold text-center">Execução Indireta - Contrato</CardTitle>
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
                      {anosIntervencao.map((ano) => (
                        <SelectItem key={ano} value={ano}>
                          {ano}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Origem do Acompanhamento</label>
                  <Select value={formData.idOrigemAcompanhamento} onValueChange={(value) => handleInputChange('idOrigemAcompanhamento', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione a origem" />
                    </SelectTrigger>
                    <SelectContent>
                      {origensAcompanhamento.map((origem) => (
                        <SelectItem key={origem.value} value={origem.value}>
                          {origem.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Número do Acompanhamento</label>
                  <Input
                    type="number"
                    value={formData.nrAcompanhamento}
                    onChange={(e) => handleInputChange('nrAcompanhamento', e.target.value)}
                    placeholder="Digite o número do acompanhamento"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Tipo do Ato do Contrato</label>
                  <Select value={formData.idTipoAtoContrato} onValueChange={(value) => handleInputChange('idTipoAtoContrato', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o tipo" />
                    </SelectTrigger>
                    <SelectContent>
                      {tiposAtoContrato.map((tipo) => (
                        <SelectItem key={tipo.value} value={tipo.value}>
                          {tipo.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Tipo de Origem do Contrato</label>
                  <Select value={formData.idTipoOrigemContrato} onValueChange={(value) => handleInputChange('idTipoOrigemContrato', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o tipo de origem" />
                    </SelectTrigger>
                    <SelectContent>
                      {tiposOrigemContrato.map((tipo) => (
                        <SelectItem key={tipo.value} value={tipo.value}>
                          {tipo.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Número do Contrato (máx. 9 números)</label>
                  <Input
                    type="number"
                    value={formData.nrContrato}
                    onChange={(e) => {
                      const value = e.target.value;
                      if (value.length <= 9) {
                        handleInputChange('nrContrato', value);
                      }
                    }}
                    placeholder="Digite o número do contrato"
                    maxLength={9}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Ano do Contrato</label>
                  <Select value={formData.nrAnoContrato} onValueChange={(value) => handleInputChange('nrAnoContrato', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o ano" />
                    </SelectTrigger>
                    <SelectContent>
                      {anosContrato.map((ano) => (
                        <SelectItem key={ano} value={ano}>
                          {ano}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">CNPJ da Ent. de Origem do Contrato (máx. 15 números)</label>
                  <Input
                    type="number"
                    value={formData.nrCNPJOrigem}
                    onChange={(e) => {
                      const value = e.target.value;
                      if (value.length <= 15) {
                        handleInputChange('nrCNPJOrigem', value);
                      }
                    }}
                    placeholder="Digite o CNPJ"
                    maxLength={15}
                  />
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

export default ExecucaoIndiretaContrato;
