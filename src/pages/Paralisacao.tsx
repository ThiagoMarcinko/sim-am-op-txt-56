import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';

const Paralisacao = () => {
  const { toast } = useToast();
  const [idPessoa, setIdPessoa] = useState('');
  const [cdIntervencao, setCdIntervencao] = useState('');
  const [nrAnoIntervencao, setNrAnoIntervencao] = useState('');
  const [idOrigemAcompanhamento, setIdOrigemAcompanhamento] = useState('');
  const [nrAcompanhamento, setNrAcompanhamento] = useState('');
  const [idMotivoParalisacao, setIdMotivoParalisacao] = useState('');

  const validateForm = (): boolean => {
    if (!idPessoa) {
      toast({
        title: "Erro de Validação",
        description: "Selecione a Identificação da Entidade",
        variant: "destructive",
      });
      return false;
    }

    if (!cdIntervencao) {
      toast({
        title: "Erro de Validação",
        description: "Código da Intervenção é obrigatório",
        variant: "destructive",
      });
      return false;
    }

    if (!nrAnoIntervencao) {
      toast({
        title: "Erro de Validação",
        description: "Selecione o Ano da Intervenção",
        variant: "destructive",
      });
      return false;
    }

    if (!idOrigemAcompanhamento) {
      toast({
        title: "Erro de Validação",
        description: "Selecione a Origem do Acompanhamento",
        variant: "destructive",
      });
      return false;
    }

    if (!nrAcompanhamento) {
      toast({
        title: "Erro de Validação",
        description: "Número do Acompanhamento é obrigatório",
        variant: "destructive",
      });
      return false;
    }

    if (!idMotivoParalisacao) {
      toast({
        title: "Erro de Validação",
        description: "Selecione o Motivo da Paralisação",
        variant: "destructive",
      });
      return false;
    }

    return true;
  };

  const handleGerarArquivo = () => {
    if (!validateForm()) {
      return;
    }

    const content = `${idPessoa}|${cdIntervencao}|${nrAnoIntervencao}|${idOrigemAcompanhamento}|${nrAcompanhamento}|${idMotivoParalisacao}|`;

    const blob = new Blob([content], { type: 'text/plain' });
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

  const handleLimparCampos = () => {
    setIdPessoa('');
    setCdIntervencao('');
    setNrAnoIntervencao('');
    setIdOrigemAcompanhamento('');
    setNrAcompanhamento('');
    setIdMotivoParalisacao('');

    toast({
      title: "Formulário Limpo",
      description: "Todos os campos foram limpos.",
    });
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-6xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle className="text-3xl font-bold text-center">Paralisação</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <Label htmlFor="idPessoa">Identificação da Entidade</Label>
                <Select value={idPessoa} onValueChange={setIdPessoa}>
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
                  placeholder="Digite o código"
                  value={cdIntervencao}
                  onChange={(e) => setCdIntervencao(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="nrAnoIntervencao">Ano da Intervenção</Label>
                <Select value={nrAnoIntervencao} onValueChange={setNrAnoIntervencao}>
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
                <Select value={idOrigemAcompanhamento} onValueChange={setIdOrigemAcompanhamento}>
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
                  placeholder="Digite o número"
                  value={nrAcompanhamento}
                  onChange={(e) => setNrAcompanhamento(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="idMotivoParalisacao">Motivo da Paralisação</Label>
                <Select value={idMotivoParalisacao} onValueChange={setIdMotivoParalisacao}>
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

            <div className="flex justify-center gap-4 pt-6">
              <Button onClick={handleGerarArquivo} className="bg-gray-600 hover:bg-gray-700">
                Gerar Arquivo
              </Button>
              <Button variant="outline" onClick={handleLimparCampos}>
                Limpar Campos
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Paralisacao;
