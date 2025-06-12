
import React from 'react';
import { Button } from '@/components/ui/button';

interface FormActionsProps {
  onSubmit: () => void;
  onClear: () => void;
  isFormValid: boolean;
  submitText?: string;
  clearText?: string;
}

const FormActions = ({ 
  onSubmit, 
  onClear, 
  isFormValid, 
  submitText = "Gerar Arquivo",
  clearText = "Limpar Campos" 
}: FormActionsProps) => {
  return (
    <div className="flex gap-4 justify-center pt-6">
      <Button 
        type="submit" 
        disabled={!isFormValid}
        className="px-8"
        onClick={onSubmit}
      >
        {submitText}
      </Button>
      <Button type="button" variant="outline" onClick={onClear} className="px-8">
        {clearText}
      </Button>
    </div>
  );
};

export default FormActions;
