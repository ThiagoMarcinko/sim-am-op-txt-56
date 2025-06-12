
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';

const Paralisacao = () => {
  const [entidade, setEntidade] = useState('');
  const [codigoIntervencao, setCodigoIntervencao] = useState('');
  const [anoIntervencao, setAnoIntervencao] = useState('');
  const [origemAcompanhamento, setOrigemAcompanhamento] = useState('');
  const [numeroAcompanhamento, setNumeroAcompanhamento] = useState('');
  const [motivoParalisacao, setMotivoParalisacao] = useState('');

  const handleGerarArquivo = () => {
    console.log('Gerando arquivo...');
  };

  const handleLimparCampos = () => {
    setEntidade('');
    setCodigoIntervencao('');
    setAnoIntervencao('');
    setOrigemAcompanhamento('');
    setNumeroAcompanhamento('');
    setMotivoParalisacao('');
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-6xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle className="text-3xl font-bold text-center">Paralisação</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <Label htmlFor="entidade">Identificação da Entidade</Label>
                <Select value={entidade} onValueChange={setEntidade}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione a entidade" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="entidade1">Entidade 1</SelectItem>
                    <SelectItem value="entidade2">Entidade 2</SelectItem>
                    <SelectItem value="entidade3">Entidade 3</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="codigo">Código da Intervenção</Label>
                <Input
                  id="codigo"
                  placeholder="Digite o código"
                  value={codigoIntervencao}
                  onChange={(e) => setCodigoIntervencao(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="ano">Ano da Intervenção</Label>
                <Select value={anoIntervencao} onValueChange={setAnoIntervencao}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o ano" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="2024">2024</SelectItem>
                    <SelectItem value="2023">2023</SelectItem>
                    <SelectItem value="2022">2022</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="origem">Origem do Acompanhamento</Label>
                <Select value={origemAcompanhamento} onValueChange={setOrigemAcompanhamento}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione a origem" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="origem1">Origem 1</SelectItem>
                    <SelectItem value="origem2">Origem 2</SelectItem>
                    <SelectItem value="origem3">Origem 3</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="numero">Número do Acompanhamento</Label>
                <Input
                  id="numero"
                  placeholder="Digite o número"
                  value={numeroAcompanhamento}
                  onChange={(e) => setNumeroAcompanhamento(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="motivo">Motivo da Paralisação</Label>
                <Select value={motivoParalisacao} onValueChange={setMotivoParalisacao}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o motivo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="motivo1">Motivo 1</SelectItem>
                    <SelectItem value="motivo2">Motivo 2</SelectItem>
                    <SelectItem value="motivo3">Motivo 3</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex justify-center gap-4 pt-6">
              <Button onClick={handleGerarArquivo} className="bg-gray-600 hover:bg-gray-700">
                Gerar Arquivo
              </Button>
              <Button variant="outline" onClick={handleLimparCampos}>
                Limpar Campos
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Paralisacao;
