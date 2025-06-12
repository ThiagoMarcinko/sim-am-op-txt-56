
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { Download } from 'lucide-react';

interface FormData {
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
  const { toast } = useToast();
  const [formData, setFormData] = useState<FormData>({
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

  const entidades = [
    { label: 'Mangueirinha', value: '12377' },
    { label: 'Bandeirantes', value: '12203' }
  ];

  const anosIntervencao = ['2023', '2024', '2025', '2026', '2027', '2028'];

  const tiposDocumento = [
    { label: 'RG', value: '1' },
    { label: 'CPF', value: '2' },
    { label: 'CNPJ', value: '3' },
    { label: 'OAB', value: '4' },
    { label: 'CREA', value: '5' },
    { label: 'CAU', value: '6' },
    { label: 'CTF', value: '7' },
    { label: 'CFTA', value: '8' },
    { label: 'CONTR', value: '97' },
    { label: 'EST', value: '98' }
  ];

  const tiposAtoContrato = [
    { label: 'Contrato', value: '1' },
    { label: 'Ata de Registro de Preços', value: '2' }
  ];

  const tiposOrigemContrato = [
    { label: 'Própria Entidade', value: '1' },
    { label: 'Contratado/Entidade Pública de Outro Estado', value: '2' },
    { label: 'Outra Entidade pública', value: '3' }
  ];

  const anosContrato = Array.from({ length: 28 }, (_, i) => (2000 + i).toString());
  const anosAditivo = Array.from({ length: 28 }, (_, i) => (2000 + i).toString());

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const validateForm = (): boolean => {
    const requiredFields = [
      'idPessoa',
      'cdIntervencao',
      'nrAnoIntervencao',
      'tipoDocumentoResponsavelOrcamento',
      'nrDocumentoResponsavelOrcamento',
      'cdControleLeiAto',
      'idTipoAtoContrato',
      'idTipoOrigemContrato',
      'nrContrato',
      'nrAnoContrato',
      'nrCNPJOrigem',
      'nrAditivoContrato',
      'nrAnoAditivoContrato'
    ];

    for (const field of requiredFields) {
      if (!formData[field as keyof FormData]) {
        toast({
          title: "Erro de Validação",
          description: `O campo ${field} é obrigatório.`,
          variant: "destructive",
        });
        return false;
      }
    }

    // Validações específicas
    if (formData.nrDocumentoResponsavelOrcamento.length > 15) {
      toast({
        title: "Erro de Validação",
        description: "Número do Documento do Responsável deve ter no máximo 15 caracteres.",
        variant: "destructive",
      });
      return false;
    }

    if (formData.cdControleLeiAto.length > 7) {
      toast({
        title: "Erro de Validação",
        description: "Código Controle Lei Ato deve ter no máximo 7 números.",
        variant: "destructive",
      });
      return false;
    }

    if (formData.nrContrato.length > 9) {
      toast({
        title: "Erro de Validação",
        description: "Número do Contrato deve ter no máximo 9 números.",
        variant: "destructive",
      });
      return false;
    }

    if (formData.nrCNPJOrigem.length > 15) {
      toast({
        title: "Erro de Validação",
        description: "CNPJ da Entidade de Origem deve ter no máximo 15 números.",
        variant: "destructive",
      });
      return false;
    }

    if (formData.nrAditivoContrato.length > 9) {
      toast({
        title: "Erro de Validação",
        description: "Número do Aditivo deve ter no máximo 9 números.",
        variant: "destructive",
      });
      return false;
    }

    return true;
  };

  const generateTxtFile = () => {
    if (!validateForm()) {
      return;
    }

    const txtContent = `idPessoa=${formData.idPessoa}
cdIntervencao=${formData.cdIntervencao}
nrAnoIntervencao=${formData.nrAnoIntervencao}
tipoDocumentoResponsavelOrcamento=${formData.tipoDocumentoResponsavelOrcamento}
nrDocumentoResponsavelOrcamento=${formData.nrDocumentoResponsavelOrcamento}
cdControleLeiAto=${formData.cdControleLeiAto}
idTipoAtoContrato=${formData.idTipoAtoContrato}
idTipoOrigemContrato=${formData.idTipoOrigemContrato}
nrContrato=${formData.nrContrato}
nrAnoContrato=${formData.nrAnoContrato}
nrCNPJOrigem=${formData.nrCNPJOrigem}
nrAditivoContrato=${formData.nrAditivoContrato}
nrAnoAditivoContrato=${formData.nrAnoAditivoContrato}`;

    const blob = new Blob([txtContent], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'PlanilhaExecucaoIndiretaAditivo.txt';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);

    toast({
      title: "Arquivo Gerado",
      description: "O arquivo PlanilhaExecucaoIndiretaAditivo.txt foi baixado com sucesso.",
    });
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-4xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle className="text-3xl font-bold text-center">
              Planilha Orçamento de Aditivo de Contrato
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Identificação da Entidade */}
              <div className="space-y-2">
                <Label htmlFor="idPessoa">Identificação da Entidade</Label>
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

              {/* Código da Intervenção */}
              <div className="space-y-2">
                <Label htmlFor="cdIntervencao">Código da Intervenção</Label>
                <Input
                  id="cdIntervencao"
                  type="number"
                  value={formData.cdIntervencao}
                  onChange={(e) => handleInputChange('cdIntervencao', e.target.value)}
                  placeholder="Digite o código da intervenção"
                />
              </div>

              {/* Ano da Intervenção */}
              <div className="space-y-2">
                <Label htmlFor="nrAnoIntervencao">Ano da Intervenção</Label>
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

              {/* Tipo de Documento Responsável Orçamento */}
              <div className="space-y-2">
                <Label htmlFor="tipoDocumentoResponsavelOrcamento">Tipo de Documento Responsável Orçamento</Label>
                <Select value={formData.tipoDocumentoResponsavelOrcamento} onValueChange={(value) => handleInputChange('tipoDocumentoResponsavelOrcamento', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o tipo de documento" />
                  </SelectTrigger>
                  <SelectContent>
                    {tiposDocumento.map((tipo) => (
                      <SelectItem key={tipo.value} value={tipo.value}>
                        {tipo.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Número do Documento do Responsável Orçamento */}
              <div className="space-y-2">
                <Label htmlFor="nrDocumentoResponsavelOrcamento">Número do Documento do Responsável Orçamento</Label>
                <Input
                  id="nrDocumentoResponsavelOrcamento"
                  value={formData.nrDocumentoResponsavelOrcamento}
                  onChange={(e) => handleInputChange('nrDocumentoResponsavelOrcamento', e.target.value)}
                  placeholder="Digite o número do documento (máx. 15 caracteres)"
                  maxLength={15}
                />
              </div>

              {/* Código Controle Lei Ato */}
              <div className="space-y-2">
                <Label htmlFor="cdControleLeiAto">Código Controle Lei Ato</Label>
                <Input
                  id="cdControleLeiAto"
                  type="number"
                  value={formData.cdControleLeiAto}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (value.length <= 7) {
                      handleInputChange('cdControleLeiAto', value);
                    }
                  }}
                  placeholder="Digite o código (máx. 7 números)"
                />
              </div>

              {/* Tipo do Ato do Contrato */}
              <div className="space-y-2">
                <Label htmlFor="idTipoAtoContrato">Tipo do Ato do Contrato</Label>
                <Select value={formData.idTipoAtoContrato} onValueChange={(value) => handleInputChange('idTipoAtoContrato', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o tipo de ato" />
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

              {/* Tipo de Origem do Contrato */}
              <div className="space-y-2">
                <Label htmlFor="idTipoOrigemContrato">Tipo de Origem do Contrato</Label>
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

              {/* Número do Contrato */}
              <div className="space-y-2">
                <Label htmlFor="nrContrato">Número do Contrato</Label>
                <Input
                  id="nrContrato"
                  type="number"
                  value={formData.nrContrato}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (value.length <= 9) {
                      handleInputChange('nrContrato', value);
                    }
                  }}
                  placeholder="Digite o número do contrato (máx. 9 números)"
                />
              </div>

              {/* Ano do Contrato */}
              <div className="space-y-2">
                <Label htmlFor="nrAnoContrato">Ano do Contrato</Label>
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

              {/* CNPJ da Ent. de Origem do Contrato */}
              <div className="space-y-2">
                <Label htmlFor="nrCNPJOrigem">CNPJ da Ent. de Origem do Contrato</Label>
                <Input
                  id="nrCNPJOrigem"
                  type="number"
                  value={formData.nrCNPJOrigem}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (value.length <= 15) {
                      handleInputChange('nrCNPJOrigem', value);
                    }
                  }}
                  placeholder="Digite o CNPJ (máx. 15 números)"
                />
              </div>

              {/* Número do Aditivo */}
              <div className="space-y-2">
                <Label htmlFor="nrAditivoContrato">Número do Aditivo</Label>
                <Input
                  id="nrAditivoContrato"
                  type="number"
                  value={formData.nrAditivoContrato}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (value.length <= 9) {
                      handleInputChange('nrAditivoContrato', value);
                    }
                  }}
                  placeholder="Digite o número do aditivo (máx. 9 números)"
                />
              </div>

              {/* Ano do Aditivo */}
              <div className="space-y-2">
                <Label htmlFor="nrAnoAditivoContrato">Ano do Aditivo</Label>
                <Select value={formData.nrAnoAditivoContrato} onValueChange={(value) => handleInputChange('nrAnoAditivoContrato', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o ano" />
                  </SelectTrigger>
                  <SelectContent>
                    {anosAditivo.map((ano) => (
                      <SelectItem key={ano} value={ano}>
                        {ano}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="mt-8 flex justify-center">
              <Button onClick={generateTxtFile} className="flex items-center gap-2">
                <Download className="w-4 h-4" />
                Gerar Arquivo TXT
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PlanilhaOrcamentoAditivo;
