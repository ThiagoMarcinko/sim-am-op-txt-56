
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
  cdIntervencao: string;
  nrAnoIntervencao: string;
  cdBem: string;
}

const IntervencaoBem = () => {
  const { toast } = useToast();
  const { downloadFile } = useFileDownload();
  const [formData, setFormData] = useState<FormData>({
    idPessoa: '',
    cdIntervencao: '',
    nrAnoIntervencao: '',
    cdBem: '',
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

    if (!formData.cdBem) {
      toast({
        title: "Erro de Validação",
        description: "Código do Bem é obrigatório",
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

    const content = `${formData.idPessoa}|${formData.cdIntervencao}|${formData.nrAnoIntervencao}|${formData.cdBem}|`;

    downloadFile(content, 'IntervencaoXBem.txt', "Arquivo IntervencaoXBem.txt gerado com sucesso!");
  };

  const handleClear = () => {
    setFormData({
      idPessoa: '',
      cdIntervencao: '',
      nrAnoIntervencao: '',
      cdBem: '',
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
            <CardTitle className="text-3xl font-bold text-center">Intervenção X Bem</CardTitle>
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

              <NumericInput
                label="Código do Bem"
                value={formData.cdBem}
                onChange={(value) => updateFormData('cdBem', value)}
                placeholder="Digite o código do bem"
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

export default IntervencaoBem;
