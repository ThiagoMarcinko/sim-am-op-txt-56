
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

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

    const blob = new Blob([txtContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Intervencao.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
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

              {/* 4. Tipo da Intervenção */}
              <div className="space-y-2">
                <Label htmlFor="idTipoIntervencao">Tipo da Intervenção</Label>
                <Select value={formData.idTipoIntervencao} onValueChange={(value) => updateFormData('idTipoIntervencao', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">Execução de obra</SelectItem>
                    <SelectItem value="2">Projeto</SelectItem>
                    <SelectItem value="3">Outras Atividades Técnicas</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* 5. Classificação da Intervenção */}
              <div className="space-y-2">
                <Label htmlFor="idClassificacaoIntervencao">Classificação da Intervenção</Label>
                <Select value={formData.idClassificacaoIntervencao} onValueChange={(value) => updateFormData('idClassificacaoIntervencao', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione a classificação" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">Construção</SelectItem>
                    <SelectItem value="2">Ampliação</SelectItem>
                    <SelectItem value="3">Reforma</SelectItem>
                    <SelectItem value="4">Outro</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* 6. Nome da Intervenção */}
              <div className="space-y-2">
                <Label htmlFor="nomeIntervencao">Nome da Intervenção</Label>
                <Input
                  id="nomeIntervencao"
                  value={formData.nomeIntervencao}
                  onChange={(e) => updateFormData('nomeIntervencao', e.target.value)}
                  placeholder="Digite o nome da intervenção"
                />
              </div>

              {/* 7. Tipo da Obra */}
              <div className="space-y-2">
                <Label htmlFor="idTipoObra">Tipo da Obra</Label>
                <Select value={formData.idTipoObra} onValueChange={(value) => updateFormData('idTipoObra', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o tipo de obra" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">Edificação</SelectItem>
                    <SelectItem value="2">Pavimentação</SelectItem>
                    <SelectItem value="3">Saneamento</SelectItem>
                    <SelectItem value="4">Parque ou praça</SelectItem>
                    <SelectItem value="5">Equipamento Urbano</SelectItem>
                    <SelectItem value="6">Iluminação Pública</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* 8. Classificação da Obra */}
              <div className="space-y-2">
                <Label htmlFor="idClassificacaoObra">Classificação da Obra</Label>
                <Select value={formData.idClassificacaoObra} onValueChange={(value) => updateFormData('idClassificacaoObra', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione a classificação" />
                  </SelectTrigger>
                  <SelectContent className="max-h-60">
                    <SelectItem value="1">Abatedouro</SelectItem>
                    <SelectItem value="2">Barração</SelectItem>
                    <SelectItem value="3">Creche</SelectItem>
                    <SelectItem value="4">Edifício Administrativo</SelectItem>
                    <SelectItem value="5">Escola/Colégio</SelectItem>
                    <SelectItem value="6">Hospital</SelectItem>
                    <SelectItem value="7">Posto de Saúde</SelectItem>
                    <SelectItem value="8">Unidade Habitacional</SelectItem>
                    <SelectItem value="9">Outros Edifícios</SelectItem>
                    <SelectItem value="10">Malha Viária Urbana</SelectItem>
                    <SelectItem value="11">Estrada Municipal</SelectItem>
                    <SelectItem value="12">Estrada Rural</SelectItem>
                    <SelectItem value="13">Obra de Arte Especial</SelectItem>
                    <SelectItem value="14">Abastecimento de Água</SelectItem>
                    <SelectItem value="15">Aterro Sanitário</SelectItem>
                    <SelectItem value="16">Canalização de Rio</SelectItem>
                    <SelectItem value="17">Cemitério</SelectItem>
                    <SelectItem value="18">Dragagem</SelectItem>
                    <SelectItem value="19">Esgoto</SelectItem>
                    <SelectItem value="20">Fundo de Vale</SelectItem>
                    <SelectItem value="21">Galeria Pluvial</SelectItem>
                    <SelectItem value="22">Outras Obras de Saneamento</SelectItem>
                    <SelectItem value="23">Parque ou Praça</SelectItem>
                    <SelectItem value="24">Abrigo de ônibus</SelectItem>
                    <SelectItem value="25">Outros Equipamentos Urbanos</SelectItem>
                    <SelectItem value="26">Iluminação Pública</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* 9. Descrição do Objeto */}
              <div className="space-y-2">
                <Label htmlFor="dsObjeto">Descrição do Objeto</Label>
                <Input
                  id="dsObjeto"
                  value={formData.dsObjeto}
                  onChange={(e) => updateFormData('dsObjeto', e.target.value)}
                  placeholder="Digite a descrição do objeto"
                />
              </div>

              {/* 10. Medida */}
              <div className="space-y-2">
                <Label htmlFor="nrMedida">Medida</Label>
                <Input
                  id="nrMedida"
                  value={formData.nrMedida}
                  onChange={(e) => updateFormData('nrMedida', e.target.value)}
                  placeholder="000,00"
                />
              </div>

              {/* 11. Unidade de medida */}
              <div className="space-y-2">
                <Label htmlFor="idUnidadeMedidaIntervencao">Unidade de Medida</Label>
                <Select value={formData.idUnidadeMedidaIntervencao} onValueChange={(value) => updateFormData('idUnidadeMedidaIntervencao', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione a unidade" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">Hora</SelectItem>
                    <SelectItem value="2">Hectare</SelectItem>
                    <SelectItem value="3">Quilograma</SelectItem>
                    <SelectItem value="4">Quilômetro</SelectItem>
                    <SelectItem value="5">Metro quadrado</SelectItem>
                    <SelectItem value="6">Metro Cúbico</SelectItem>
                    <SelectItem value="7">Tonelada</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* 12. Valor da Intervenção */}
              <div className="space-y-2">
                <Label htmlFor="vlIntervencao">Valor da Intervenção</Label>
                <Input
                  id="vlIntervencao"
                  value={formData.vlIntervencao}
                  onChange={(e) => updateFormData('vlIntervencao', e.target.value)}
                  placeholder="000.000,00"
                />
              </div>

              {/* 13. Data base do valor da Intervenção */}
              <div className="space-y-2">
                <Label>Data Base do Valor da Intervenção</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !formData.dtBaseIntervencao && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {formData.dtBaseIntervencao ? (
                        format(formData.dtBaseIntervencao, "dd/MM/yyyy")
                      ) : (
                        <span>Selecione uma data</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={formData.dtBaseIntervencao}
                      onSelect={(date) => updateFormData('dtBaseIntervencao', date)}
                      initialFocus
                      className={cn("p-3 pointer-events-auto")}
                    />
                  </PopoverContent>
                </Popover>
              </div>

              {/* 14. Prazo de Execução */}
              <div className="space-y-2">
                <Label htmlFor="nrPrazoExecucao">Prazo de Execução</Label>
                <Input
                  id="nrPrazoExecucao"
                  type="number"
                  value={formData.nrPrazoExecucao}
                  onChange={(e) => updateFormData('nrPrazoExecucao', e.target.value)}
                  placeholder="Digite o prazo em dias"
                />
              </div>

              {/* 15. Data de início da Intervenção */}
              <div className="space-y-2">
                <Label>Data de Início da Intervenção</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !formData.dtInicio && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {formData.dtInicio ? (
                        format(formData.dtInicio, "dd/MM/yyyy")
                      ) : (
                        <span>Selecione uma data</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={formData.dtInicio}
                      onSelect={(date) => updateFormData('dtInicio', date)}
                      initialFocus
                      className={cn("p-3 pointer-events-auto")}
                    />
                  </PopoverContent>
                </Popover>
              </div>

              {/* 16. Regime da Intervenção */}
              <div className="space-y-2">
                <Label htmlFor="idTipoRegimeIntervencao">Regime da Intervenção</Label>
                <Select value={formData.idTipoRegimeIntervencao} onValueChange={(value) => updateFormData('idTipoRegimeIntervencao', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o regime" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Direto">Direto</SelectItem>
                    <SelectItem value="Indireto">Indireto</SelectItem>
                    <SelectItem value="Misto (Direto + Indireto)">Misto (Direto + Indireto)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
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

export default TabelaIntervencao;
