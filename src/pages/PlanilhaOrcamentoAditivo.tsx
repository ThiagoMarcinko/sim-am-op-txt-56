import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from '@/hooks/use-toast';

interface FormDataAditivoContrato {
  idPessoa: string;
  cdIntervencao: string;
  nrAnoIntervencao: string;
  tipoDocumentoResponsavelOrcamento: string;
  nrDocumentoResponsavelOrcamento: string;
  cdControleLeiAto: string;
  idTipoAtoContrato: string;
  idTipoOrigemContrato: string;
  nrContrato: string;
  nrAnoContrato: string;
  nrCNPJOrigem: string;
  nrAditivoContrato: string;
  nrAnoAditivoContrato: string;
}

const PlanilhaOrcamentoAditivo = () => {
  const [formData, setFormData] = useState<FormDataAditivoContrato>({
    idPessoa: '',
    cdIntervencao: '',
    nrAnoIntervencao: '',
    tipoDocumentoResponsavelOrcamento: '',
    nrDocumentoResponsavelOrcamento: '',
    cdControleLeiAto: '',
    idTipoAtoContrato: '',
    idTipoOrigemContrato: '',
    nrContrato: '',
    nrAnoContrato: '',
    nrCNPJOrigem: '',
    nrAditivoContrato: '',
    nrAnoAditivoContrato: '',
  });

  const updateFormData = (field: keyof FormDataAditivoContrato, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const validateForm = (): boolean => {
    for (const [key, value] of Object.entries(formData)) {
      if (value.trim() === '') {
        toast({
          title: "Validação",
          description: `O campo ${key} é obrigatório.`,
        });
        return false;
      }
    }
    return true;
  };

  const clearForm = () => {
    setFormData({
      idPessoa: '',
      cdIntervencao: '',
      nrAnoIntervencao: '',
      tipoDocumentoResponsavelOrcamento: '',
      nrDocumentoResponsavelOrcamento: '',
      cdControleLeiAto: '',
      idTipoAtoContrato: '',
      idTipoOrigemContrato: '',
      nrContrato: '',
      nrAnoContrato: '',
      nrCNPJOrigem: '',
      nrAditivoContrato: '',
      nrAnoAditivoContrato: '',
    });

    toast({
      title: "Formulário Limpo",
      description: "Todos os campos foram limpos.",
    });
  };

  const generateTxtFile = () => {
    if (!validateForm()) {
      return;
    }

    const content = `${formData.idPessoa}|${formData.cdIntervencao}|${formData.nrAnoIntervencao}|${formData.tipoDocumentoResponsavelOrcamento}|${formData.nrDocumentoResponsavelOrcamento}|${formData.cdControleLeiAto}|${formData.idTipoAtoContrato}|${formData.idTipoOrigemContrato}|${formData.nrContrato}|${formData.nrAnoContrato}|${formData.nrCNPJOrigem}|${formData.nrAditivoContrato}|${formData.nrAnoAditivoContrato}|`;

    try {
      const blob = new Blob([content], { type: 'text/plain' });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'PlanilhaOrcamentoAditivo.txt';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);

      toast({
        title: "Arquivo Gerado",
        description: "O arquivo PlanilhaOrcamentoAditivo.txt foi gerado com sucesso!",
      });
    } catch (error) {
      toast({
        title: "Erro",
        description: "Ocorreu um erro ao gerar o arquivo.",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="p-6">
      <div className="max-w-4xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle className="text-3xl font-bold text-center">Planilha Orçamento de Aditivo de Contrato</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Identificação da Entidade */}
              <div className="space-y-2">
                <Label htmlFor="idPessoa">Identificação da Entidade</Label>
                <Select value={formData.idPessoa} onValueChange={value => updateFormData('idPessoa', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione a entidade" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="12377">Mangueirinha</SelectItem>
                    <SelectItem value="12203">Bandeirantes</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Código da Intervenção */}
              <div className="space-y-2">
                <Label htmlFor="cdIntervencao">Código da Intervenção</Label>
                <Input
                  id="cdIntervencao"
                  type="text"
                  value={formData.cdIntervencao}
                  onChange={e => updateFormData('cdIntervencao', e.target.value)}
                  placeholder="Digite o código"
                />
              </div>

              {/* Ano da Intervenção */}
              <div className="space-y-2">
                <Label htmlFor="nrAnoIntervencao">Ano da Intervenção</Label>
                <Select value={formData.nrAnoIntervencao} onValueChange={value => updateFormData('nrAnoIntervencao', value)}>
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

              {/* Tipo de Documento Responsável Orçamento */}
              <div className="space-y-2">
                <Label htmlFor="tipoDocumentoResponsavelOrcamento">Tipo de Documento Responsável Orçamento</Label>
                <Select value={formData.tipoDocumentoResponsavelOrcamento} onValueChange={value => updateFormData('tipoDocumentoResponsavelOrcamento', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">RG</SelectItem>
                    <SelectItem value="2">CPF</SelectItem>
                    <SelectItem value="3">CNPJ</SelectItem>
                    <SelectItem value="4">OAB</SelectItem>
                    <SelectItem value="5">CREA</SelectItem>
                    <SelectItem value="6">CAU</SelectItem>
                    <SelectItem value="7">CTF</SelectItem>
                    <SelectItem value="8">CFTA</SelectItem>
                    <SelectItem value="97">CONTR</SelectItem>
                    <SelectItem value="98">EST</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Número do Documento do Responsável Orçamento */}
              <div className="space-y-2">
                <Label htmlFor="nrDocumentoResponsavelOrcamento">Número do Documento do Responsável Orçamento</Label>
                <Input
                  id="nrDocumentoResponsavelOrcamento"
                  type="text"
                  maxLength={15}
                  value={formData.nrDocumentoResponsavelOrcamento}
                  onChange={e => updateFormData('nrDocumentoResponsavelOrcamento', e.target.value)}
                  placeholder="Digite o número do documento"
                />
              </div>

              {/* Código Controle Lei Ato */}
              <div className="space-y-2">
                <Label htmlFor="cdControleLeiAto">Código Controle Lei Ato</Label>
                <Input
                  id="cdControleLeiAto"
                  type="text"
                  value={formData.cdControleLeiAto}
                  onChange={e => {
                    const value = e.target.value;
                    if (value.length <= 7) {
                      updateFormData('cdControleLeiAto', value);
                    }
                  }}
                  placeholder="Máximo 7 números"
                />
              </div>

              {/* Tipo de Ato */}
              <div className="space-y-2">
                <Label htmlFor="idTipoAtoContrato">Tipo de Ato</Label>
                <Select value={formData.idTipoAtoContrato} onValueChange={value => updateFormData('idTipoAtoContrato', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">Contrato</SelectItem>
                    <SelectItem value="2">Ata de Registro de Preços</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Tipo de Origem */}
              <div className="space-y-2">
                <Label htmlFor="idTipoOrigemContrato">Tipo de Origem</Label>
                <Select value={formData.idTipoOrigemContrato} onValueChange={value => updateFormData('idTipoOrigemContrato', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o tipo de origem" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">Licitação</SelectItem>
                    <SelectItem value="2">Dispensa</SelectItem>
                    <SelectItem value="3">Inexigibilidade</SelectItem>
                    <SelectItem value="4">Convênio/Congênere</SelectItem>
                    <SelectItem value="5">Outro</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Número do Contrato */}
              <div className="space-y-2">
                <Label htmlFor="nrContrato">Número do Contrato</Label>
                <Input
                  id="nrContrato"
                  type="text"
                  value={formData.nrContrato}
                  onChange={e => updateFormData('nrContrato', e.target.value)}
                  placeholder="Digite o número do contrato"
                />
              </div>

              {/* Ano do Contrato */}
              <div className="space-y-2">
                <Label htmlFor="nrAnoContrato">Ano do Contrato</Label>
                <Select value={formData.nrAnoContrato} onValueChange={value => updateFormData('nrAnoContrato', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o ano" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="2020">2020</SelectItem>
                    <SelectItem value="2021">2021</SelectItem>
                    <SelectItem value="2022">2022</SelectItem>
                    <SelectItem value="2023">2023</SelectItem>
                    <SelectItem value="2024">2024</SelectItem>
                    <SelectItem value="2025">2025</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Número CNPJ de Origem */}
              <div className="space-y-2">
                <Label htmlFor="nrCNPJOrigem">Número CNPJ de Origem</Label>
                <Input
                  id="nrCNPJOrigem"
                  type="text"
                  value={formData.nrCNPJOrigem}
                  onChange={e => updateFormData('nrCNPJOrigem', e.target.value)}
                  placeholder="Digite o CNPJ de origem"
                />
              </div>

              {/* Número do Aditivo do Contrato */}
              <div className="space-y-2">
                <Label htmlFor="nrAditivoContrato">Número do Aditivo do Contrato</Label>
                <Input
                  id="nrAditivoContrato"
                  type="text"
                  value={formData.nrAditivoContrato}
                  onChange={e => updateFormData('nrAditivoContrato', e.target.value)}
                  placeholder="Digite o número do aditivo"
                />
              </div>

              {/* Ano do Aditivo do Contrato */}
              <div className="space-y-2">
                <Label htmlFor="nrAnoAditivoContrato">Ano do Aditivo do Contrato</Label>
                <Select value={formData.nrAnoAditivoContrato} onValueChange={value => updateFormData('nrAnoAditivoContrato', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o ano" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="2020">2020</SelectItem>
                    <SelectItem value="2021">2021</SelectItem>
                    <SelectItem value="2022">2022</SelectItem>
                    <SelectItem value="2023">2023</SelectItem>
                    <SelectItem value="2024">2024</SelectItem>
                    <SelectItem value="2025">2025</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex gap-4 justify-center pt-6">
              <Button
                onClick={generateTxtFile}
                disabled={!Object.values(formData).every(value => value !== '')}
                className="px-8"
              >
                Gerar Arquivo
              </Button>
              <Button type="button" variant="outline" onClick={clearForm} className="px-8">
                Limpar Campos
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PlanilhaOrcamentoAditivo;
