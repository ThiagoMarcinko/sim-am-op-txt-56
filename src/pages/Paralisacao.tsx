import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import Layout from '@/components/Layout';

interface FormData {
  idPessoa: string;
  cdIntervencao: string;
  nrAnoIntervencao: string;
  idOrigemAcompanhamento: string;
  nrAcompanhamento: string;
  idMotivoParalisacao: string;
}

const Paralisacao = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState<FormData>({
    idPessoa: '',
    cdIntervencao: '',
    nrAnoIntervencao: '',
    idOrigemAcompanhamento: '',
    nrAcompanhamento: '',
    idMotivoParalisacao: '',
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
      formData.idMotivoParalisacao
    ].join('|') + '|';

    const blob = new Blob([txtContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Paralisacao.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    toast({
      title: "Sucesso",
      description: "Arquivo Paralisacao.txt gerado com sucesso!",
    });
  };

  const handleClear = () => {
    setFormData({
      idPessoa: '',
      cdIntervencao: '',
      nrAnoIntervencao: '',
      idOrigemAcompanhamento: '',
      nrAcompanhamento: '',
      idMotivoParalisacao: '',
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
    <Layout>
      <div className="p-6">
        <div className="max-w-6xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle className="text-3xl font-bold text-center">Paralisação</CardTitle>
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

                {/* 6. Motivo da Paralisação */}
                <div className="space-y-2">
                  <Label htmlFor="idMotivoParalisacao">Motivo da Paralisação</Label>
                  <Select value={formData.idMotivoParalisacao} onValueChange={(value) => updateFormData('idMotivoParalisacao', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o motivo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">Falta de recurso próprio</SelectItem>
                      <SelectItem value="2">Ausência/ Atraso na liberação de recursos do convênio</SelectItem>
                      <SelectItem value="3">Valor orçado insuficiente para conclusão da obra</SelectItem>
                      <SelectItem value="4">Alteração de projeto/ Serviços necessários à conclusão da obra não foram previstos</SelectItem>
                      <SelectItem value="5">Descumprimento de obrigações contratuais pela empresa contratada</SelectItem>
                      <SelectItem value="6">Ação judicial</SelectItem>
                      <SelectItem value="7">Não atendimento a exigências legais (Ex. ambientais, pendências em relação à regularidade do terreno, etc.)</SelectItem>
                      <SelectItem value="8">Obra incompatível com interesses do município</SelectItem>
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
    </Layout>
  );
};

export default Paralisacao;
