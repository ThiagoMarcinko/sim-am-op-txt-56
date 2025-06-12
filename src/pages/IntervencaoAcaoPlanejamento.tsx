
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { useFileDownload } from '@/hooks/useFileDownload';
import EntidadeSelect from '@/components/forms/EntidadeSelect';
import AnoSelect from '@/components/forms/AnoSelect';
import NumericInput from '@/components/forms/NumericInput';
import FormActions from '@/components/forms/FormActions';

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
  const { downloadFile } = useFileDownload();
  const [formData, setFormData] = useState<FormData>({
    idPessoa: '',
    idOrigemAcao: '',
    cdAcao: '',
    cdControleLeiAto: '',
    cdIntervencao: '',
    nrAnoIntervencao: '',
  });

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

  const handleSubmit = () => {
    if (!validateForm()) {
      return;
    }

    const content = `${formData.idPessoa}|${formData.idOrigemAcao}|${formData.cdAcao}|${formData.cdControleLeiAto}|${formData.cdIntervencao}|${formData.nrAnoIntervencao}|`;
    downloadFile(content, 'AcaoXIntervencao.txt', 'Arquivo AcaoXIntervencao.txt gerado com sucesso!');
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
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <EntidadeSelect
                  value={formData.idPessoa}
                  onChange={(value) => handleInputChange('idPessoa', value)}
                />

                <NumericInput
                  label="Origem da Ação (máx. 7 números)"
                  value={formData.idOrigemAcao}
                  onChange={(value) => handleInputChange('idOrigemAcao', value)}
                  placeholder="Digite a origem da ação"
                  maxLength={7}
                />

                <NumericInput
                  label="Código da Ação (máx. 4 caracteres)"
                  value={formData.cdAcao}
                  onChange={(value) => handleInputChange('cdAcao', value)}
                  placeholder="Digite o código da ação"
                  maxLength={4}
                />

                <NumericInput
                  label="Código Controle Lei Ato (máx. 7 números)"
                  value={formData.cdControleLeiAto}
                  onChange={(value) => handleInputChange('cdControleLeiAto', value)}
                  placeholder="Digite o código controle lei ato"
                  maxLength={7}
                />

                <NumericInput
                  label="Código da Intervenção"
                  value={formData.cdIntervencao}
                  onChange={(value) => handleInputChange('cdIntervencao', value)}
                  placeholder="Digite o código da intervenção"
                />

                <AnoSelect
                  value={formData.nrAnoIntervencao}
                  onChange={(value) => handleInputChange('nrAnoIntervencao', value)}
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

export default IntervencaoAcaoPlanejamento;
