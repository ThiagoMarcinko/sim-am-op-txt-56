
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
  cdBem: string;
}

const IntervencaoBem = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState<FormData>({
    idPessoa: '',
    cdIntervencao: '',
    nrAnoIntervencao: '',
    cdBem: '',
  });

  const validateForm = (): boolean => {
    if (!formData.idPessoa) {
      toast({
        title: "Erro de Validação",
        description: "Selecione a Identificação da Entidade",
        variant: "destructive",
      });
      return false;
    }

    if (!formData.cdIntervencao) {
      toast({
        title: "Erro de Validação",
        description: "Código da Intervenção é obrigatório",
        variant: "destructive",
      });
      return false;
    }

    if (!formData.nrAnoIntervencao) {
      toast({
        title: "Erro de Validação",
        description: "Selecione o Ano da Intervenção",
        variant: "destructive",
      });
      return false;
    }

    if (!formData.cdBem) {
      toast({
        title: "Erro de Validação",
        description: "Código do Bem é obrigatório",
        variant: "destructive",
      });
      return false;
    }

    return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    const content = `${formData.idPessoa}|${formData.cdIntervencao}|${formData.nrAnoIntervencao}|${formData.cdBem}|`;

    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'IntervencaoXBem.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    toast({
      title: "Sucesso",
      description: "Arquivo IntervencaoXBem.txt gerado com sucesso!",
    });
  };

  const handleClear = () => {
    setFormData({
      idPessoa: '',
      cdIntervencao: '',
      nrAnoIntervencao: '',
      cdBem: '',
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
            <CardTitle className="text-3xl font-bold text-center">Intervenção X Bem</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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

                <div className="space-y-2">
                  <Label htmlFor="cdBem">Código do Bem</Label>
                  <Input
                    id="cdBem"
                    type="number"
                    value={formData.cdBem}
                    onChange={(e) => updateFormData('cdBem', e.target.value)}
                    placeholder="Digite o código do bem"
                  />
                </div>
              </div>

              <div className="flex gap-4 justify-center pt-6">
                <Button type="submit" className="px-8">
                  Gerar Arquivo
                </Button>
                <Button type="button" variant="outline" onClick={handleClear} className="px-8">
                  Limpar Campos
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default IntervencaoBem;
