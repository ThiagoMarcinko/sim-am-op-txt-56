
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';

const AppSidebar = () => {
  const location = useLocation();

  const navigationItems = [
    { url: '/tabela-intervencao', label: 'Intervenção' },
    { url: '/empenho-intervencao', label: 'Empenho X Intervenção' },
    { url: '/intervencao-acao-planejamento', label: 'Intervenção X Ação do Planejamento' },
    { url: '/intervencao-bem', label: 'Intervenção X Bem' },
    { url: '/acompanhamento', label: 'Acompanhamento' },
    { url: '/documentos-acompanhamento', label: 'Documentos de Acompanhamento' },
    { url: '/medicao', label: 'Medição' },
    { url: '/paralisacao', label: 'Paralisação' },
    { url: '/responsabilidade-tecnica', label: 'Responsabilidade Técnica' },
    { url: '/planilha-orcamento', label: 'Planilha Orçamento' },
    { url: '/execucao-indireta-contrato', label: 'Execução Indireta - Contrato' },
    { url: '/planilha-orcamento-contrato', label: 'Planilha Orçamento de Contrato' },
    { url: '/execucao-indireta-aditivo', label: 'Execução Indireta Aditivo' },
    { url: '/planilha-orcamento-aditivo', label: 'Planilha Orçamento de Aditivo de Contrato' },
  ];

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navegação</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigationItems.map((item) => (
                <SidebarMenuItem key={item.url}>
                  <SidebarMenuButton 
                    asChild
                    isActive={location.pathname === item.url}
                  >
                    <Link to={item.url} className="w-full">
                      <span>{item.label}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};

export default AppSidebar;
