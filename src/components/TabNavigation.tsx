
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

const TabNavigation = () => {
  const location = useLocation();

  const tabs = [
    { value: '/tabela-intervencao', label: 'Intervenção' },
    { value: '/intervencao-bem', label: 'Intervenção X Bem' },
    { value: '/responsabilidade-tecnica', label: 'Responsabilidade Técnica' },
    { value: '/planilha-orcamento', label: 'Planilha Orçamento' },
    { value: '/planilha-orcamento-contrato', label: 'Planilha Orçamento de Contrato' },
    { value: '/planilha-orcamento-aditivo', label: 'Planilha Orçamento de Aditivo de Contrato' },
    { value: '/acompanhamento', label: 'Acompanhamento' },
    { value: '/medicao', label: 'Medição' },
    { value: '/execucao-indireta-contrato', label: 'Execução Indireta - Contrato' },
    { value: '/execucao-indireta-aditivo', label: 'Execução Indireta Aditivo' },
    { value: '/paralisacao', label: 'Paralisação' },
    { value: '/documentos-acompanhamento', label: 'Documentos de Acompanhamento' },
    { value: '/intervencao-acao-planejamento', label: 'Intervenção X Ação do Planejamento' },
    { value: '/empenho-intervencao', label: 'Empenho X Intervenção' },
  ];

  // Dividir as abas em grupos de 4
  const tabRows = [];
  for (let i = 0; i < tabs.length; i += 4) {
    tabRows.push(tabs.slice(i, i + 4));
  }

  return (
    <div className="w-full bg-background border-b sticky top-0 z-50">
      <div className="container mx-auto px-4 py-2">
        <Tabs value={location.pathname} className="w-full">
          <div className="space-y-2">
            {tabRows.map((row, rowIndex) => (
              <TabsList key={rowIndex} className="h-10 grid w-full bg-transparent" style={{ gridTemplateColumns: `repeat(${row.length}, 1fr)` }}>
                {row.map((tab) => (
                  <TabsTrigger
                    key={tab.value}
                    value={tab.value}
                    asChild
                    className="text-xs whitespace-nowrap overflow-hidden text-ellipsis px-2 bg-green-800 text-white border border-green-700 data-[state=active]:bg-green-200 data-[state=active]:text-gray-700 hover:bg-green-700"
                  >
                    <Link to={tab.value} className="w-full">
                      {tab.label}
                    </Link>
                  </TabsTrigger>
                ))}
              </TabsList>
            ))}
          </div>
        </Tabs>
      </div>
    </div>
  );
};

export default TabNavigation;
