
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import FormActions from '@/components/forms/FormActions';
import FormFields from '@/components/forms/planilha-orcamento-contrato/FormFields';
import { FormData, initialFormData } from '@/components/forms/planilha-orcamento-contrato/FormData';
import { validateForm, isFormValid, generateFileContent } from '@/components/forms/planilha-orcamento-contrato/FormValidation';

const PlanilhaOrcamentoContrato = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState<FormData>(initialFormData);

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = () => {
    if (!validateForm(formData, toast)) {
      return;
    }

    const txtContent = generateFileContent(formData);

    const blob = new Blob([txtContent], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'PlanilhaExecucaoIndiretaContrato.txt';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);

    toast({
      title: "Arquivo Gerado",
      description: "O arquivo PlanilhaExecucaoIndiretaContrato.txt foi baixado com sucesso.",
    });
  };

  const handleClear = () => {
    setFormData(initialFormData);

    toast({
      title: "Formulário Limpo",
      description: "Todos os campos foram limpos.",
    });
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-4xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle className="text-3xl font-bold text-center">
              Planilha Orçamento de Contrato
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form className="space-y-6">
              <FormFields
                formData={formData}
                onInputChange={handleInputChange}
              />

              <FormActions
                onSubmit={handleSubmit}
                onClear={handleClear}
                isFormValid={isFormValid(formData)}
              />
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PlanilhaOrcamentoContrato;
