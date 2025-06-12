
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import SelectInput from '@/components/forms/SelectInput';
import { FormData, entidades, anosIntervencao, tiposDocumento, tiposAtoContrato, tiposOrigemContrato, anosContrato } from './FormData';

interface FormFieldsProps {
  formData: FormData;
  onInputChange: (field: keyof FormData, value: string) => void;
}

const FormFields = ({ formData, onInputChange }: FormFieldsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Identificação da Entidade */}
      <SelectInput
        label="Identificação da Entidade"
        value={formData.idPessoa}
        onChange={(value) => onInputChange('idPessoa', value)}
        placeholder="Selecione a entidade"
        options={entidades}
        id="idPessoa"
      />

      {/* Código da Intervenção */}
      <div className="space-y-2">
        <Label htmlFor="cdIntervencao">Código da Intervenção</Label>
        <Input
          id="cdIntervencao"
          type="number"
          value={formData.cdIntervencao}
          onChange={(e) => onInputChange('cdIntervencao', e.target.value)}
          placeholder="Digite o código da intervenção"
        />
      </div>

      {/* Ano da Intervenção */}
      <SelectInput
        label="Ano da Intervenção"
        value={formData.nrAnoIntervencao}
        onChange={(value) => onInputChange('nrAnoIntervencao', value)}
        placeholder="Selecione o ano"
        options={anosIntervencao.map(ano => ({ label: ano, value: ano }))}
        id="nrAnoIntervencao"
      />

      {/* Tipo de Documento Responsável Orçamento */}
      <SelectInput
        label="Tipo de Documento Responsável Orçamento"
        value={formData.tipoDocumentoResponsavelOrcamento}
        onChange={(value) => onInputChange('tipoDocumentoResponsavelOrcamento', value)}
        placeholder="Selecione o tipo de documento"
        options={tiposDocumento}
        id="tipoDocumentoResponsavelOrcamento"
      />

      {/* Número do Documento do Responsável Orçamento */}
      <div className="space-y-2">
        <Label htmlFor="nrDocumentoResponsavelOrcamento">Número do Documento do Responsável Orçamento</Label>
        <Input
          id="nrDocumentoResponsavelOrcamento"
          value={formData.nrDocumentoResponsavelOrcamento}
          onChange={(e) => onInputChange('nrDocumentoResponsavelOrcamento', e.target.value)}
          placeholder="Digite o número do documento (máx. 15 caracteres)"
          maxLength={15}
        />
      </div>

      {/* Código Controle Lei Ato */}
      <div className="space-y-2">
        <Label htmlFor="cdControleLeiAto">Código Controle Lei Ato</Label>
        <Input
          id="cdControleLeiAto"
          type="number"
          value={formData.cdControleLeiAto}
          onChange={(e) => {
            const value = e.target.value;
            if (value.length <= 7) {
              onInputChange('cdControleLeiAto', value);
            }
          }}
          placeholder="Digite o código (máx. 7 números)"
        />
      </div>

      {/* Tipo do Ato do Contrato */}
      <SelectInput
        label="Tipo do Ato do Contrato"
        value={formData.idTipoAtoContrato}
        onChange={(value) => onInputChange('idTipoAtoContrato', value)}
        placeholder="Selecione o tipo de ato"
        options={tiposAtoContrato}
        id="idTipoAtoContrato"
      />

      {/* Tipo de Origem do Contrato */}
      <SelectInput
        label="Tipo de Origem do Contrato"
        value={formData.idTipoOrigemContrato}
        onChange={(value) => onInputChange('idTipoOrigemContrato', value)}
        placeholder="Selecione o tipo de origem"
        options={tiposOrigemContrato}
        id="idTipoOrigemContrato"
      />

      {/* Número do Contrato */}
      <div className="space-y-2">
        <Label htmlFor="nrContrato">Número do Contrato</Label>
        <Input
          id="nrContrato"
          type="number"
          value={formData.nrContrato}
          onChange={(e) => {
            const value = e.target.value;
            if (value.length <= 9) {
              onInputChange('nrContrato', value);
            }
          }}
          placeholder="Digite o número do contrato (máx. 9 números)"
        />
      </div>

      {/* Ano do Contrato */}
      <SelectInput
        label="Ano do Contrato"
        value={formData.nrAnoContrato}
        onChange={(value) => onInputChange('nrAnoContrato', value)}
        placeholder="Selecione o ano"
        options={anosContrato.map(ano => ({ label: ano, value: ano }))}
        id="nrAnoContrato"
      />

      {/* CNPJ da Ent. de Origem do Contrato */}
      <div className="space-y-2">
        <Label htmlFor="nrCNPJOrigem">CNPJ da Ent. de Origem do Contrato</Label>
        <Input
          id="nrCNPJOrigem"
          type="number"
          value={formData.nrCNPJOrigem}
          onChange={(e) => {
            const value = e.target.value;
            if (value.length <= 15) {
              onInputChange('nrCNPJOrigem', value);
            }
          }}
          placeholder="Digite o CNPJ (máx. 15 números)"
        />
      </div>
    </div>
  );
};

export default FormFields;
