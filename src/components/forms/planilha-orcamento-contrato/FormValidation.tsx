
import { FormData } from './FormData';

export const validateForm = (formData: FormData, toast: any): boolean => {
  const requiredFields = [
    'idPessoa',
    'cdIntervencao',
    'nrAnoIntervencao',
    'tipoDocumentoResponsavelOrcamento',
    'nrDocumentoResponsavelOrcamento',
    'cdControleLeiAto',
    'idTipoAtoContrato',
    'idTipoOrigemContrato',
    'nrContrato',
    'nrAnoContrato',
    'nrCNPJOrigem'
  ];

  for (const field of requiredFields) {
    if (!formData[field as keyof FormData]) {
      toast({
        title: "Erro de Validação",
        description: `O campo ${field} é obrigatório.`,
        variant: "destructive",
      });
      return false;
    }
  }

  // Validações específicas
  if (formData.nrDocumentoResponsavelOrcamento.length > 15) {
    toast({
      title: "Erro de Validação",
      description: "Número do Documento do Responsável deve ter no máximo 15 caracteres.",
      variant: "destructive",
    });
    return false;
  }

  if (formData.cdControleLeiAto.length > 7) {
    toast({
      title: "Erro de Validação",
      description: "Código Controle Lei Ato deve ter no máximo 7 números.",
      variant: "destructive",
    });
    return false;
  }

  if (formData.nrContrato.length > 9) {
    toast({
      title: "Erro de Validação",
      description: "Número do Contrato deve ter no máximo 9 números.",
      variant: "destructive",
    });
    return false;
  }

  if (formData.nrCNPJOrigem.length > 15) {
    toast({
      title: "Erro de Validação",
      description: "CNPJ da Entidade de Origem deve ter no máximo 15 números.",
      variant: "destructive",
    });
    return false;
  }

  return true;
};

export const isFormValid = (formData: FormData): boolean => {
  return Object.values(formData).every(value => value !== '');
};

export const generateFileContent = (formData: FormData): string => {
  return `${formData.idPessoa}|${formData.cdIntervencao}|${formData.nrAnoIntervencao}|${formData.tipoDocumentoResponsavelOrcamento}|${formData.nrDocumentoResponsavelOrcamento}|${formData.cdControleLeiAto}|${formData.idTipoAtoContrato}|${formData.idTipoOrigemContrato}|${formData.nrContrato}|${formData.nrAnoContrato}|${formData.nrCNPJOrigem}|`;
};
