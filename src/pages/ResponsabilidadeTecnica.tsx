import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';

interface FormData {
  idPessoa: string;
  cdIntervencao: string;
  nrAnoIntervencao: string;
  TipoDocumentoPessoa: string;
  nrDocumentoResponsavelTecnico: string;
  tipoDocumentoOrdemClasse: string;
  nRT: string;
  idTipoResponsabilidadeTecnica: string;
}

const ResponsabilidadeTecnica = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState<FormData>({
    idPessoa: '',
    cdIntervencao: '',
    nrAnoIntervencao: '',
    TipoDocumentoPessoa: '',
    nrDocumentoResponsavelTecnico: '',
    tipoDocumentoOrdemClasse: '',
    nRT: '',
    idTipoResponsabilidadeTecnica: '',
  });

  const isFormValid = () => {
    return Object.values(formData).every(value => value !== '');
  };

  const generateTxtFile = () => {
    const txtContent = [
      formData.idPessoa,
      formData.cdIntervencao,
      formData.nrAnoIntervencao,
      formData.TipoDocumentoPessoa,
      formData.nrDocumentoResponsavelTecnico,
      formData.tipoDocumentoOrdemClasse,
      formData.nRT,
      formData.idTipoResponsabilidadeTecnica
    ].join('|') + '|';

    const blob = new Blob([txtContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'ResponsabilidadeTecnica.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    toast({
      title: "Sucesso",
      description: "Arquivo ResponsabilidadeTecnica.txt gerado com sucesso!",
    });
  };

  const handleClear = () => {
    setFormData({
      idPessoa: '',
      cdIntervencao: '',
      nrAnoIntervencao: '',
      TipoDocumentoPessoa: '',
      nrDocumentoResponsavelTecnico: '',
      tipoDocumentoOrdemClasse: '',
      nRT: '',
      idTipoResponsabilidadeTecnica: '',
    });

    toast({
      title: "Formulário Limpo",
      description: "Todos os campos foram limpos.",
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
            <CardTitle className="text-3xl font-bold text-center">Responsabilidade Técnica</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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

              {/* 4. Tipo de Documento */}
              <div className="space-y-2">
                <Label htmlFor="TipoDocumentoPessoa">Tipo de Documento</Label>
                <Select value={formData.TipoDocumentoPessoa} onValueChange={(value) => updateFormData('TipoDocumentoPessoa', value)}>
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

              {/* 5. Número do Documento do Responsável Técnico */}
              <div className="space-y-2">
                <Label htmlFor="nrDocumentoResponsavelTecnico">Número do Documento do Responsável Técnico</Label>
                <Input
                  id="nrDocumentoResponsavelTecnico"
                  type="text"
                  maxLength={15}
                  value={formData.nrDocumentoResponsavelTecnico}
                  onChange={(e) => updateFormData('nrDocumentoResponsavelTecnico', e.target.value)}
                  placeholder="Máximo 15 caracteres"
                />
              </div>

              {/* 6. Tipo do Documento Ordem/Classe */}
              <div className="space-y-2">
                <Label htmlFor="tipoDocumentoOrdemClasse">Tipo do Documento Ordem/Classe</Label>
                <Select value={formData.tipoDocumentoOrdemClasse} onValueChange={(value) => updateFormData('tipoDocumentoOrdemClasse', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">ART(CREA)</SelectItem>
                    <SelectItem value="2">RRT(CAU) e TRT (CFT e CFTA)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* 7. Número da Responsabilidade Técnica */}
              <div className="space-y-2">
                <Label htmlFor="nRT">Número da Responsabilidade Técnica (ART ou RRT)</Label>
                <Input
                  id="nRT"
                  type="text"
                  maxLength={20}
                  value={formData.nRT}
                  onChange={(e) => updateFormData('nRT', e.target.value)}
                  placeholder="Máximo 20 caracteres"
                />
              </div>

              {/* 8. Tipo da Responsabilidade Técnica */}
              <div className="space-y-2">
                <Label htmlFor="idTipoResponsabilidadeTecnica">Tipo da Responsabilidade Técnica</Label>
                <Select value={formData.idTipoResponsabilidadeTecnica} onValueChange={(value) => updateFormData('idTipoResponsabilidadeTecnica', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">Execução de Obra</SelectItem>
                    <SelectItem value="2">Projeto Arquitetônico</SelectItem>
                    <SelectItem value="3">Projeto Estrutural</SelectItem>
                    <SelectItem value="4">Projeto Complementar</SelectItem>
                    <SelectItem value="5">Orçamento</SelectItem>
                    <SelectItem value="6">Fiscalização</SelectItem>
                    <SelectItem value="7">Consultoria</SelectItem>
                    <SelectItem value="8">Cargo e Função</SelectItem>
                    <SelectItem value="9">Outra</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex gap-4 justify-center pt-6">
              <Button
                onClick={generateTxtFile}
                disabled={!isFormValid()}
                className="px-8"
              >
                Gerar Arquivo
              </Button>
              <Button type="button" variant="outline" onClick={handleClear} className="px-8">
                Limpar Campos
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ResponsabilidadeTecnica;
