
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { useFileDownload } from '@/hooks/useFileDownload';
import EntidadeSelect from '@/components/forms/EntidadeSelect';
import AnoSelect from '@/components/forms/AnoSelect';
import NumericInput from '@/components/forms/NumericInput';
import OrigemAcompanhamentoSelect from '@/components/forms/OrigemAcompanhamentoSelect';
import FormActions from '@/components/forms/FormActions';

interface FormData {
  idPessoa: string;
  cdIntervencao: string;
  nrAnoIntervencao: string;
  idOrigemAcompanhamento: string;
  nrAcompanhamento: string;
  cdControleLeiAto: string;
}

const DocumentosAcompanhamento = () => {
  const { toast } = useToast();
  const { downloadFile } = useFileDownload();
  const [formData, setFormData] = useState<FormData>({
    idPessoa: '',
    cdIntervencao: '',
    nrAnoIntervencao: '',
    idOrigemAcompanhamento: '',
    nrAcompanhamento: '',
    cdControleLeiAto: '',
  });

  const isFormValid = () => {
    return Object.values(formData).every(value => value !== '');
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

    if (!formData.cdControleLeiAto || formData.cdControleLeiAto.length > 7) {
      toast({
        title: "Erro de Validação",
        description: "Código Controle Lei Ato deve ter no máximo 7 números",
        variant: "destructive",
      });
      return false;
    }

    return true;
  };

  const handleSubmit = () => {
    if (!validateForm()) {
      return;
    }

    const content = `${formData.idPessoa}|${formData.cdIntervencao}|${formData.nrAnoIntervencao}|${formData.idOrigemAcompanhamento}|${formData.nrAcompanhamento}|${formData.cdControleLeiAto}|`;
    downloadFile(content, 'DocumentoAcompanhamento.txt', 'Arquivo DocumentoAcompanhamento.txt gerado com sucesso!');
  };

  const handleClear = () => {
    setFormData({
      idPessoa: '',
      cdIntervencao: '',
      nrAnoIntervencao: '',
      idOrigemAcompanhamento: '',
      nrAcompanhamento: '',
      cdControleLeiAto: '',
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
            <CardTitle className="text-3xl font-bold text-center">Documentos de Acompanhamento</CardTitle>
          </CardHeader>
          <CardContent>
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <EntidadeSelect
                  value={formData.idPessoa}
                  onChange={(value) => updateFormData('idPessoa', value)}
                />

                <NumericInput
                  label="Código da Intervenção"
                  value={formData.cdIntervencao}
                  onChange={(value) => updateFormData('cdIntervencao', value)}
                  placeholder="Digite o código"
                />

                <AnoSelect
                  value={formData.nrAnoIntervencao}
                  onChange={(value) => updateFormData('nrAnoIntervencao', value)}
                />

                <OrigemAcompanhamentoSelect
                  value={formData.idOrigemAcompanhamento}
                  onChange={(value) => updateFormData('idOrigemAcompanhamento', value)}
                />

                <NumericInput
                  label="Número do Acompanhamento"
                  value={formData.nrAcompanhamento}
                  onChange={(value) => updateFormData('nrAcompanhamento', value)}
                  placeholder="Digite o número"
                />

                <NumericInput
                  label="Código Controle Lei Ato"
                  value={formData.cdControleLeiAto}
                  onChange={(value) => updateFormData('cdControleLeiAto', value)}
                  placeholder="Máximo 7 números"
                  maxLength={7}
                />
              </div>

              <FormActions
                onSubmit={handleSubmit}
                onClear={handleClear}
                isFormValid={isFormValid()}
              />
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DocumentosAcompanhamento;
