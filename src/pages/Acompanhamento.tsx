
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';

interface FormData {
  idPessoa: string;
  cdIntervencao: string;
  nrAnoIntervencao: string;
  idOrigemAcompanhamento: string;
  nrAcompanhamento: string;
  dtAcompanhamento: string;
  idTipoAcompanhamento: string;
  tpDocumentoResponsavelAcompanhamento: string;
  nrDocumentoResponsavelAcompanhamento: string;
  dsObservacao: string;
}

const Acompanhamento = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState<FormData>({
    idPessoa: '',
    cdIntervencao: '',
    nrAnoIntervencao: '',
    idOrigemAcompanhamento: '',
    nrAcompanhamento: '',
    dtAcompanhamento: '',
    idTipoAcompanhamento: '',
    tpDocumentoResponsavelAcompanhamento: '',
    nrDocumentoResponsavelAcompanhamento: '',
    dsObservacao: '',
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

    if (!formData.dtAcompanhamento) {
      toast({
        title: "Erro de Validação",
        description: "Data do Acompanhamento é obrigatória",
        variant: "destructive",
      });
      return false;
    }

    if (!formData.idTipoAcompanhamento) {
      toast({
        title: "Erro de Validação",
        description: "Selecione o Tipo do Acompanhamento",
        variant: "destructive",
      });
      return false;
    }

    if (!formData.tpDocumentoResponsavelAcompanhamento) {
      toast({
        title: "Erro de Validação",
        description: "Selecione o Tipo de Documento do Responsável",
        variant: "destructive",
      });
      return false;
    }

    if (!formData.nrDocumentoResponsavelAcompanhamento || formData.nrDocumentoResponsavelAcompanhamento.length > 15) {
      toast({
        title: "Erro de Validação",
        description: "Número do Documento deve ter no máximo 15 caracteres",
        variant: "destructive",
      });
      return false;
    }

    if (!formData.dsObservacao) {
      toast({
        title: "Erro de Validação",
        description: "Observações são obrigatórias",
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
Data do Acompanhamento: ${formData.dtAcompanhamento}
Tipo do Acompanhamento: ${formData.idTipoAcompanhamento}
Tipo de Documento Responsável: ${formData.tpDocumentoResponsavelAcompanhamento}
Número do Documento Responsável: ${formData.nrDocumentoResponsavelAcompanhamento}
Observações: ${formData.dsObservacao}`;

    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Acompanhamento.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    toast({
      title: "Sucesso",
      description: "Arquivo Acompanhamento.txt gerado com sucesso!",
    });
  };

  const handleClear = () => {
    setFormData({
      idPessoa: '',
      cdIntervencao: '',
      nrAnoIntervencao: '',
      idOrigemAcompanhamento: '',
      nrAcompanhamento: '',
      dtAcompanhamento: '',
      idTipoAcompanhamento: '',
      tpDocumentoResponsavelAcompanhamento: '',
      nrDocumentoResponsavelAcompanhamento: '',
      dsObservacao: '',
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
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-4xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle className="text-3xl font-bold text-center">Acompanhamento</CardTitle>
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
                  <Label htmlFor="dtAcompanhamento">Data do Acompanhamento</Label>
                  <Input
                    id="dtAcompanhamento"
                    type="date"
                    value={formData.dtAcompanhamento}
                    onChange={(e) => updateFormData('dtAcompanhamento', e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="idTipoAcompanhamento">Tipo do Acompanhamento</Label>
                  <Select value={formData.idTipoAcompanhamento} onValueChange={(value) => updateFormData('idTipoAcompanhamento', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o tipo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">Medição</SelectItem>
                      <SelectItem value="2">Paralisação</SelectItem>
                      <SelectItem value="3">Conclusão</SelectItem>
                      <SelectItem value="4">Cancelamento de Intervenção</SelectItem>
                      <SelectItem value="5">Cadastro Indevido</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="tpDocumentoResponsavelAcompanhamento">Tipo de Documento Responsável Acompanhamento</Label>
                  <Select value={formData.tpDocumentoResponsavelAcompanhamento} onValueChange={(value) => updateFormData('tpDocumentoResponsavelAcompanhamento', value)}>
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

                <div className="space-y-2">
                  <Label htmlFor="nrDocumentoResponsavelAcompanhamento">Nº do Doc. do Responsável Acompanhamento</Label>
                  <Input
                    id="nrDocumentoResponsavelAcompanhamento"
                    type="text"
                    maxLength={15}
                    value={formData.nrDocumentoResponsavelAcompanhamento}
                    onChange={(e) => updateFormData('nrDocumentoResponsavelAcompanhamento', e.target.value)}
                    placeholder="Máximo 15 caracteres"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="dsObservacao">Observações</Label>
                <Textarea
                  id="dsObservacao"
                  value={formData.dsObservacao}
                  onChange={(e) => updateFormData('dsObservacao', e.target.value)}
                  placeholder="Digite as observações"
                  className="min-h-[100px]"
                />
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

export default Acompanhamento;
