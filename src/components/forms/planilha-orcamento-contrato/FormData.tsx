
export interface FormData {
  idPessoa: string;
  cdIntervencao: string;
  nrAnoIntervencao: string;
  tipoDocumentoResponsavelOrcamento: string;
  nrDocumentoResponsavelOrcamento: string;
  cdControleLeiAto: string;
  idTipoAtoContrato: string;
  idTipoOrigemContrato: string;
  nrContrato: string;
  nrAnoContrato: string;
  nrCNPJOrigem: string;
}

export const initialFormData: FormData = {
  idPessoa: '',
  cdIntervencao: '',
  nrAnoIntervencao: '',
  tipoDocumentoResponsavelOrcamento: '',
  nrDocumentoResponsavelOrcamento: '',
  cdControleLeiAto: '',
  idTipoAtoContrato: '',
  idTipoOrigemContrato: '',
  nrContrato: '',
  nrAnoContrato: '',
  nrCNPJOrigem: '',
};

export const entidades = [
  { label: 'Mangueirinha', value: '12377' },
  { label: 'Bandeirantes', value: '12203' }
];

export const anosIntervencao = ['2023', '2024', '2025', '2026', '2027', '2028'];

export const tiposDocumento = [
  { label: 'RG', value: '1' },
  { label: 'CPF', value: '2' },
  { label: 'CNPJ', value: '3' },
  { label: 'OAB', value: '4' },
  { label: 'CREA', value: '5' },
  { label: 'CAU', value: '6' },
  { label: 'CTF', value: '7' },
  { label: 'CFTA', value: '8' },
  { label: 'CONTR', value: '97' },
  { label: 'EST', value: '98' }
];

export const tiposAtoContrato = [
  { label: 'Contrato', value: '1' },
  { label: 'Ata de Registro de Preços', value: '2' }
];

export const tiposOrigemContrato = [
  { label: 'Própria Entidade', value: '1' },
  { label: 'Contratado/Entidade Pública de Outro Estado', value: '2' },
  { label: 'Outra Entidade pública', value: '3' }
];

export const anosContrato = Array.from({ length: 28 }, (_, i) => (2000 + i).toString());
