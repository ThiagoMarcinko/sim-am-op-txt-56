
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { useFileDownload } from '@/hooks/useFileDownload';
import EntidadeSelect from '@/components/forms/EntidadeSelect';
import AnoSelect from '@/components/forms/AnoSelect';
import NumericInput from '@/components/forms/NumericInput';
import FormActions from '@/components/forms/FormActions';
import OrigemAcompanhamentoSelect from '@/components/forms/OrigemAcompanhamentoSelect';
import MotivoParalisacaoSelect from '@/components/forms/MotivoParalisacaoSelect';

const Paralisacao = () => {
  const { toast } = useToast();
  const { downloadFile } = useFileDownload();
  const [idPessoa, setIdPessoa] = useState('');
  const [cdIntervencao, setCdIntervencao] = useState('');
  const [nrAnoIntervencao, setNrAnoIntervencao] = useState('');
  const [idOrigemAcompanhamento, setIdOrigemAcompanhamento] = useState('');
  const [nrAcompanhamento, setNrAcompanhamento] = useState('');
  const [idMotivoParalisacao, setIdMotivoParalisacao] = useState('');

  const isFormValid = () => {
    return idPessoa !== '' && 
           cdIntervencao !== '' && 
           nrAnoIntervencao !== '' && 
           idOrigemAcompanhamento !== '' && 
           nrAcompanhamento !== '' && 
           idMotivoParalisacao !== '';
  };

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

    downloadFile(content, 'Paralisacao.txt', "Arquivo Paralisacao.txt gerado com sucesso!");
  };

  const handleLimparCampos = () => {
    setIdPessoa('');
    setCdIntervencao('');
    setNrAnoIntervencao('');
    setIdOrigemAcompanhamento('');
    setNrAcompanhamento('');
    setIdMotivoParalisacao('');
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
              <EntidadeSelect 
                value={idPessoa} 
                onChange={setIdPessoa} 
              />

              <NumericInput
                label="Código da Intervenção"
                value={cdIntervencao}
                onChange={setCdIntervencao}
                placeholder="Digite o código"
              />

              <AnoSelect 
                value={nrAnoIntervencao} 
                onChange={setNrAnoIntervencao} 
              />

              <OrigemAcompanhamentoSelect
                value={idOrigemAcompanhamento}
                onChange={setIdOrigemAcompanhamento}
              />

              <NumericInput
                label="Número do Acompanhamento"
                value={nrAcompanhamento}
                onChange={setNrAcompanhamento}
                placeholder="Digite o número"
              />

              <MotivoParalisacaoSelect
                value={idMotivoParalisacao}
                onChange={setIdMotivoParalisacao}
              />
            </div>

            <FormActions
              onSubmit={handleGerarArquivo}
              onClear={handleLimparCampos}
              isFormValid={isFormValid()}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Paralisacao;
