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
  tipoDocumentoResponsavelOrcamento: string;
  nrDocumentoResponsavelOrcamento: string;
  cdControleLeiAto: string;
  vlTotal: string;
  dtBase: string;
  tipoPlanilhaOrcamento: string;
}

const PlanilhaOrcamento = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState<FormData>({
    idPessoa: '',
    cdIntervencao: '',
    nrAnoIntervencao: '',
    tipoDocumentoResponsavelOrcamento: '',
    nrDocumentoResponsavelOrcamento: '',
    cdControleLeiAto: '',
    vlTotal: '',
    dtBase: '',
    tipoPlanilhaOrcamento: '',
  });

  const isFormValid = () => {
    return Object.values(formData).every(value => value !== '');
  };

  const generateTxtFile = () => {
    const txtContent = [
      formData.idPessoa,
      formData.cdIntervencao,
      formData.nrAnoIntervencao,
      formData.tipoDocumentoResponsavelOrcamento,
      formData.nrDocumentoResponsavelOrcamento,
      formData.cdControleLeiAto,
      formData.vlTotal,
      formData.dtBase,
      formData.tipoPlanilhaOrcamento
    ].join('|') + '|';

    const blob = new Blob([txtContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'PlanilhaOrcamento.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    toast({
      title: "Sucesso",
      description: "Arquivo PlanilhaOrcamento.txt gerado com sucesso!",
    });
  };

  const handleClear = () => {
    setFormData({
      idPessoa: '',
      cdIntervencao: '',
      nrAnoIntervencao: '',
      tipoDocumentoResponsavelOrcamento: '',
      nrDocumentoResponsavelOrcamento: '',
      cdControleLeiAto: '',
      vlTotal: '',
      dtBase: '',
      tipoPlanilhaOrcamento: '',
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

  return (
    <div className="p-6">
      <div className="max-w-4xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle className="text-3xl font-bold text-center">Planilha Orçamento</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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

              {/* 4. Tipo de Documento Responsável Orçamento */}
              <div className="space-y-2">
                <Label htmlFor="tipoDocumentoResponsavelOrcamento">Tipo de Documento Responsável Orçamento</Label>
                <Select value={formData.tipoDocumentoResponsavelOrcamento} onValueChange={(value) => updateFormData('tipoDocumentoResponsavelOrcamento', value)}>
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

              {/* 5. Número do Documento do Responsável Orçamento */}
              <div className="space-y-2">
                <Label htmlFor="nrDocumentoResponsavelOrcamento">Número do Documento do Responsável Orçamento</Label>
                <Input
                  id="nrDocumentoResponsavelOrcamento"
                  type="text"
                  maxLength={15}
                  value={formData.nrDocumentoResponsavelOrcamento}
                  onChange={(e) => updateFormData('nrDocumentoResponsavelOrcamento', e.target.value)}
                  placeholder="Máximo 15 caracteres"
                />
              </div>

              {/* 6. Código Controle Lei Ato */}
              <div className="space-y-2">
                <Label htmlFor="cdControleLeiAto">Código Controle Lei Ato</Label>
                <Input
                  id="cdControleLeiAto"
                  type="number"
                  value={formData.cdControleLeiAto}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (value.length <= 7) {
                      updateFormData('cdControleLeiAto', value);
                    }
                  }}
                  placeholder="Máximo 7 números"
                />
              </div>

              {/* 7. Valor Total */}
              <div className="space-y-2">
                <Label htmlFor="vlTotal">Valor Total</Label>
                <Input
                  id="vlTotal"
                  type="text"
                  value={formData.vlTotal}
                  onChange={(e) => {
                    const value = e.target.value;
                    // Permitir apenas números e pontos decimais no formato 000.00
                    const regex = /^\d*\.?\d{0,2}$/;
                    if (regex.test(value)) {
                      updateFormData('vlTotal', value);
                    }
                  }}
                  placeholder="000.00"
                />
              </div>

              {/* 8. Data Base */}
              <div className="space-y-2">
                <Label htmlFor="dtBase">Data Base</Label>
                <Input
                  id="dtBase"
                  type="date"
                  value={formData.dtBase}
                  onChange={(e) => updateFormData('dtBase', e.target.value)}
                />
              </div>

              {/* 9. Tipo de Planilha de Orçamento */}
              <div className="space-y-2">
                <Label htmlFor="tipoPlanilhaOrcamento">Tipo de Planilha de Orçamento</Label>
                <Select value={formData.tipoPlanilhaOrcamento} onValueChange={(value) => updateFormData('tipoPlanilhaOrcamento', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">Base (Orçamento de Execução Direta ou Orçamento da Licitação)</SelectItem>
                    <SelectItem value="2">Contrato (Planilha da Proposta Contratada)</SelectItem>
                    <SelectItem value="3">Aditivo (Planilha da Proposta Contratada alterada ou Planilha do Aditivo)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex gap-4 justify-center pt-6">
              <Button
                onClick={generateTxtFile}
                disabled={!isFormValid()}
                className="px-8"
              >
                Gerar Arquivo
              </Button>
              <Button type="button" variant="outline" onClick={handleClear} className="px-8">
                Limpar Campos
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PlanilhaOrcamento;
