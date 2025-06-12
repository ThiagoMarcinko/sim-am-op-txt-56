
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
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <div className="flex gap-4 justify-center pt-6">
      <Button 
        type="submit" 
        disabled={!isFormValid}
        className="px-8"
        onClick={handleSubmit}
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
