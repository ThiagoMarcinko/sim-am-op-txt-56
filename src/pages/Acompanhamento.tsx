
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface FormData {
  idPessoa: string;
  cdIntervencao: string;
  nrAnoIntervencao: string;
  idOrigemAcompanhamento: string;
  nrAcompanhamento: string;
  dtAcompanhamento: string;
  idTipoAcompanhamento: string;
  tpDocumentoResponsavelAcompanhamento: string;
  nrDocumentoResponsavelAcompanhamento: string;
  dsObservacao: string;
}

const Acompanhamento = () => {
  const [formData, setFormData] = useState<FormData>({
    idPessoa: '',
    cdIntervencao: '',
    nrAnoIntervencao: '',
    idOrigemAcompanhamento: '',
    nrAcompanhamento: '',
    dtAcompanhamento: '',
    idTipoAcompanhamento: '',
    tpDocumentoResponsavelAcompanhamento: '',
    nrDocumentoResponsavelAcompanhamento: '',
    dsObservacao: '',
  });

  const isFormValid = () => {
    return Object.values(formData).every(value => value !== '');
  };

  const generateTxtFile = () => {
    const txtContent = [
      formData.idPessoa,
      formData.cdIntervencao,
      formData.nrAnoIntervencao,
      formData.idOrigemAcompanhamento,
      formData.nrAcompanhamento,
      formData.dtAcompanhamento,
      formData.idTipoAcompanhamento,
      formData.tpDocumentoResponsavelAcompanhamento,
      formData.nrDocumentoResponsavelAcompanhamento,
      formData.dsObservacao
    ].join('|') + '|';

    const blob = new Blob([txtContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Acompanhamento.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const updateFormData = (field: keyof FormData, value: string) => {
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
            <CardTitle className="text-3xl font-bold text-center">Acompanhamento</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* 1. Identificação da Entidade */}
              <div className="space-y-2">
                <Label htmlFor="idPessoa">Identificação da Entidade</Label>
                <Select value={formData.idPessoa} onValueChange={(value) => updateFormData('idPessoa', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione a entidade" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="12377">Mangueirinha</SelectItem>
                    <SelectItem value="12203">Bandeirantes</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* 2. Código da Intervenção */}
              <div className="space-y-2">
                <Label htmlFor="cdIntervencao">Código da Intervenção</Label>
                <Input
                  id="cdIntervencao"
                  type="number"
                  value={formData.cdIntervencao}
                  onChange={(e) => updateFormData('cdIntervencao', e.target.value)}
                  placeholder="Digite o código"
                />
              </div>

              {/* 3. Ano da Intervenção */}
              <div className="space-y-2">
                <Label htmlFor="nrAnoIntervencao">Ano da Intervenção</Label>
                <Select value={formData.nrAnoIntervencao} onValueChange={(value) => updateFormData('nrAnoIntervencao', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o ano" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="2023">2023</SelectItem>
                    <SelectItem value="2024">2024</SelectItem>
                    <SelectItem value="2025">2025</SelectItem>
                    <SelectItem value="2026">2026</SelectItem>
                    <SelectItem value="2027">2027</SelectItem>
                    <SelectItem value="2028">2028</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* 4. Origem do Acompanhamento */}
              <div className="space-y-2">
                <Label htmlFor="idOrigemAcompanhamento">Origem do Acompanhamento</Label>
                <Select value={formData.idOrigemAcompanhamento} onValueChange={(value) => updateFormData('idOrigemAcompanhamento', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione a origem" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">Jurisdicionado</SelectItem>
                    <SelectItem value="2">TCE-PR</SelectItem>
                    <SelectItem value="3">CREA-PR</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* 5. Número do Acompanhamento */}
              <div className="space-y-2">
                <Label htmlFor="nrAcompanhamento">Número do Acompanhamento</Label>
                <Input
                  id="nrAcompanhamento"
                  type="number"
                  value={formData.nrAcompanhamento}
                  onChange={(e) => updateFormData('nrAcompanhamento', e.target.value)}
                  placeholder="Digite o número"
                />
              </div>

              {/* 6. Data do Acompanhamento */}
              <div className="space-y-2">
                <Label htmlFor="dtAcompanhamento">Data do Acompanhamento</Label>
                <Input
                  id="dtAcompanhamento"
                  type="date"
                  value={formData.dtAcompanhamento}
                  onChange={(e) => updateFormData('dtAcompanhamento', e.target.value)}
                />
              </div>

              {/* 7. Tipo do Acompanhamento */}
              <div className="space-y-2">
                <Label htmlFor="idTipoAcompanhamento">Tipo do Acompanhamento</Label>
                <Select value={formData.idTipoAcompanhamento} onValueChange={(value) => updateFormData('idTipoAcompanhamento', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">Medição</SelectItem>
                    <SelectItem value="2">Paralisação</SelectItem>
                    <SelectItem value="3">Conclusão</SelectItem>
                    <SelectItem value="4">Cancelamento de Intervenção</SelectItem>
                    <SelectItem value="5">Cadastro Indevido</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* 8. Tipo de Documento Responsável Acompanhamento */}
              <div className="space-y-2">
                <Label htmlFor="tpDocumentoResponsavelAcompanhamento">Tipo de Documento Responsável Acompanhamento</Label>
                <Select value={formData.tpDocumentoResponsavelAcompanhamento} onValueChange={(value) => updateFormData('tpDocumentoResponsavelAcompanhamento', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">RG</SelectItem>
                    <SelectItem value="2">CPF</SelectItem>
                    <SelectItem value="3">CNPJ</SelectItem>
                    <SelectItem value="4">OAB</SelectItem>
                    <SelectItem value="5">CREA</SelectItem>
                    <SelectItem value="6">CAU</SelectItem>
                    <SelectItem value="7">CTF</SelectItem>
                    <SelectItem value="8">CFTA</SelectItem>
                    <SelectItem value="97">CONTR</SelectItem>
                    <SelectItem value="98">EST</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* 9. Número do Documento do Responsável Acompanhamento */}
              <div className="space-y-2">
                <Label htmlFor="nrDocumentoResponsavelAcompanhamento">Nº do Doc. do Responsável Acompanhamento</Label>
                <Input
                  id="nrDocumentoResponsavelAcompanhamento"
                  type="text"
                  maxLength={15}
                  value={formData.nrDocumentoResponsavelAcompanhamento}
                  onChange={(e) => updateFormData('nrDocumentoResponsavelAcompanhamento', e.target.value)}
                  placeholder="Máximo 15 caracteres"
                />
              </div>
            </div>

            {/* 10. Observações */}
            <div className="space-y-2">
              <Label htmlFor="dsObservacao">Observações</Label>
              <Textarea
                id="dsObservacao"
                value={formData.dsObservacao}
                onChange={(e) => updateFormData('dsObservacao', e.target.value)}
                placeholder="Digite as observações"
                className="min-h-[100px]"
              />
            </div>

            <div className="flex justify-center pt-6">
              <Button
                onClick={generateTxtFile}
                disabled={!isFormValid()}
                className="px-8 py-3 text-lg"
              >
                Gerar .txt
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Acompanhamento;
