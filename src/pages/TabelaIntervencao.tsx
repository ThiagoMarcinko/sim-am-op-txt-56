
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { format } from 'date-fns';
import { useFileDownload } from '@/hooks/useFileDownload';
import EntidadeSelect from '@/components/forms/EntidadeSelect';
import AnoSelect from '@/components/forms/AnoSelect';
import NumericInput from '@/components/forms/NumericInput';
import FormActions from '@/components/forms/FormActions';
import TipoIntervencaoSelect from '@/components/forms/TipoIntervencaoSelect';
import ClassificacaoIntervencaoSelect from '@/components/forms/ClassificacaoIntervencaoSelect';
import TipoObraSelect from '@/components/forms/TipoObraSelect';
import ClassificacaoObraSelect from '@/components/forms/ClassificacaoObraSelect';
import UnidadeMedidaSelect from '@/components/forms/UnidadeMedidaSelect';
import DatePicker from '@/components/forms/DatePicker';
import RegimeIntervencaoSelect from '@/components/forms/RegimeIntervencaoSelect';
import TextInput from '@/components/forms/TextInput';
import DecimalInput from '@/components/forms/DecimalInput';

interface FormData {
  idPessoa: string;
  cdIntervencao: string;
  nrAnoIntervencao: string;
  idTipoIntervencao: string;
  idClassificacaoIntervencao: string;
  nomeIntervencao: string;
  idTipoObra: string;
  idClassificacaoObra: string;
  dsObjeto: string;
  nrMedida: string;
  idUnidadeMedidaIntervencao: string;
  vlIntervencao: string;
  dtBaseIntervencao: Date | undefined;
  nrPrazoExecucao: string;
  dtInicio: Date | undefined;
  idTipoRegimeIntervencao: string;
}

const TabelaIntervencao = () => {
  const { downloadFile } = useFileDownload();
  const [formData, setFormData] = useState<FormData>({
    idPessoa: '',
    cdIntervencao: '',
    nrAnoIntervencao: '',
    idTipoIntervencao: '',
    idClassificacaoIntervencao: '',
    nomeIntervencao: '',
    idTipoObra: '',
    idClassificacaoObra: '',
    dsObjeto: '',
    nrMedida: '',
    idUnidadeMedidaIntervencao: '',
    vlIntervencao: '',
    dtBaseIntervencao: undefined,
    nrPrazoExecucao: '',
    dtInicio: undefined,
    idTipoRegimeIntervencao: '',
  });

  const isFormValid = () => {
    return Object.entries(formData).every(([key, value]) => {
      if (key === 'dtBaseIntervencao' || key === 'dtInicio') {
        return value !== undefined;
      }
      return value !== '';
    });
  };

  const generateTxtFile = () => {
    const regimeMap: { [key: string]: string } = {
      'Direto': '1',
      'Indireto': '2',
      'Misto (Direto + Indireto)': '3'
    };

    const formatDate = (date: Date | undefined) => {
      if (!date) return '';
      return format(date, 'yyyy-MM-dd');
    };

    const txtContent = [
      formData.idPessoa,
      formData.cdIntervencao,
      formData.nrAnoIntervencao,
      formData.idTipoIntervencao,
      formData.idClassificacaoIntervencao,
      formData.nomeIntervencao,
      formData.idTipoObra,
      formData.idClassificacaoObra,
      formData.dsObjeto,
      formData.nrMedida,
      formData.idUnidadeMedidaIntervencao,
      formData.vlIntervencao,
      formatDate(formData.dtBaseIntervencao),
      formData.nrPrazoExecucao,
      formatDate(formData.dtInicio),
      regimeMap[formData.idTipoRegimeIntervencao] || formData.idTipoRegimeIntervencao
    ].join('|') + '|';

    downloadFile(txtContent, 'Intervencao.txt', "Arquivo Intervencao.txt gerado com sucesso!");
  };

  const handleClear = () => {
    setFormData({
      idPessoa: '',
      cdIntervencao: '',
      nrAnoIntervencao: '',
      idTipoIntervencao: '',
      idClassificacaoIntervencao: '',
      nomeIntervencao: '',
      idTipoObra: '',
      idClassificacaoObra: '',
      dsObjeto: '',
      nrMedida: '',
      idUnidadeMedidaIntervencao: '',
      vlIntervencao: '',
      dtBaseIntervencao: undefined,
      nrPrazoExecucao: '',
      dtInicio: undefined,
      idTipoRegimeIntervencao: '',
    });
  };

  const updateFormData = (field: keyof FormData, value: string | Date | undefined) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className="p-6">
      <div className="max-w-6xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle className="text-3xl font-bold text-center">Intervenção</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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

              <TipoIntervencaoSelect 
                value={formData.idTipoIntervencao} 
                onChange={(value) => updateFormData('idTipoIntervencao', value)} 
              />

              <ClassificacaoIntervencaoSelect 
                value={formData.idClassificacaoIntervencao} 
                onChange={(value) => updateFormData('idClassificacaoIntervencao', value)} 
              />

              <TextInput
                label="Nome da Intervenção"
                value={formData.nomeIntervencao}
                onChange={(value) => updateFormData('nomeIntervencao', value)}
                placeholder="Digite o nome da intervenção"
              />

              <TipoObraSelect 
                value={formData.idTipoObra} 
                onChange={(value) => updateFormData('idTipoObra', value)} 
              />

              <ClassificacaoObraSelect 
                value={formData.idClassificacaoObra} 
                onChange={(value) => updateFormData('idClassificacaoObra', value)} 
              />

              <TextInput
                label="Descrição do Objeto"
                value={formData.dsObjeto}
                onChange={(value) => updateFormData('dsObjeto', value)}
                placeholder="Digite a descrição do objeto"
              />

              <DecimalInput
                label="Medida"
                value={formData.nrMedida}
                onChange={(value) => updateFormData('nrMedida', value)}
                placeholder="Digite a medida"
              />

              <UnidadeMedidaSelect 
                value={formData.idUnidadeMedidaIntervencao} 
                onChange={(value) => updateFormData('idUnidadeMedidaIntervencao', value)} 
              />

              <DecimalInput
                label="Valor da Intervenção"
                value={formData.vlIntervencao}
                onChange={(value) => updateFormData('vlIntervencao', value)}
                placeholder="Digite o valor"
              />

              <DatePicker
                label="Data Base do Valor da Intervenção"
                value={formData.dtBaseIntervencao}
                onChange={(date) => updateFormData('dtBaseIntervencao', date)}
              />

              <NumericInput
                label="Prazo de Execução (dias)"
                value={formData.nrPrazoExecucao}
                onChange={(value) => updateFormData('nrPrazoExecucao', value)}
                placeholder="Digite o prazo em dias"
              />

              <DatePicker
                label="Data de Início da Intervenção"
                value={formData.dtInicio}
                onChange={(date) => updateFormData('dtInicio', date)}
              />

              <RegimeIntervencaoSelect 
                value={formData.idTipoRegimeIntervencao} 
                onChange={(value) => updateFormData('idTipoRegimeIntervencao', value)} 
              />
            </div>

            <FormActions
              onSubmit={generateTxtFile}
              onClear={handleClear}
              isFormValid={isFormValid()}
              submitText="Gerar Arquivo TXT"
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TabelaIntervencao;
