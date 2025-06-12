
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { useFileDownload } from '@/hooks/useFileDownload';
import EntidadeSelect from '@/components/forms/EntidadeSelect';
import AnoSelect from '@/components/forms/AnoSelect';
import NumericInput from '@/components/forms/NumericInput';
import FormActions from '@/components/forms/FormActions';
import OrigemAcompanhamentoSelect from '@/components/forms/OrigemAcompanhamentoSelect';
import TipoMedicaoSelect from '@/components/forms/TipoMedicaoSelect';
import PercentualInput from '@/components/forms/PercentualInput';

interface FormData {
  idPessoa: string;
  cdIntervencao: string;
  nrAnoIntervencao: string;
  idOrigemAcompanhamento: string;
  nrAcompanhamento: string;
  idTipoMedicao: string;
  nrPercentualFisicoMedicao: string;
}

const Medicao = () => {
  const { toast } = useToast();
  const { downloadFile } = useFileDownload();
  const [formData, setFormData] = useState<FormData>({
    idPessoa: '',
    cdIntervencao: '',
    nrAnoIntervencao: '',
    idOrigemAcompanhamento: '',
    nrAcompanhamento: '',
    idTipoMedicao: '',
    nrPercentualFisicoMedicao: '',
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

    if (!formData.idTipoMedicao) {
      toast({
        title: "Erro de Validação",
        description: "Selecione o Tipo da Medição",
        variant: "destructive",
      });
      return false;
    }

    if (!formData.nrPercentualFisicoMedicao) {
      toast({
        title: "Erro de Validação",
        description: "Percentual Físico da Medição é obrigatório",
        variant: "destructive",
      });
      return false;
    }

    const percentual = parseFloat(formData.nrPercentualFisicoMedicao);
    if (isNaN(percentual) || percentual < 0 || percentual > 100) {
      toast({
        title: "Erro de Validação",
        description: "Percentual deve ser entre 0 e 100",
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

    const content = `${formData.idPessoa}|${formData.cdIntervencao}|${formData.nrAnoIntervencao}|${formData.idOrigemAcompanhamento}|${formData.nrAcompanhamento}|${formData.idTipoMedicao}|${formData.nrPercentualFisicoMedicao}|`;

    downloadFile(content, 'Medicao.txt', "Arquivo Medicao.txt gerado com sucesso!");
  };

  const handleClear = () => {
    setFormData({
      idPessoa: '',
      cdIntervencao: '',
      nrAnoIntervencao: '',
      idOrigemAcompanhamento: '',
      nrAcompanhamento: '',
      idTipoMedicao: '',
      nrPercentualFisicoMedicao: '',
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
            <CardTitle className="text-3xl font-bold text-center">Medição</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
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

              <TipoMedicaoSelect
                value={formData.idTipoMedicao}
                onChange={(value) => updateFormData('idTipoMedicao', value)}
              />

              <PercentualInput
                label="Percentual Físico da Medição (%)"
                value={formData.nrPercentualFisicoMedicao}
                onChange={(value) => updateFormData('nrPercentualFisicoMedicao', value)}
                placeholder="0.00 - 100.00"
              />
            </div>

            <FormActions
              onSubmit={handleSubmit}
              onClear={handleClear}
              isFormValid={isFormValid()}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Medicao;
