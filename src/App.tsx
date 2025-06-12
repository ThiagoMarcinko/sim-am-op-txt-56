
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Index from "./pages/Index";
import TabelaIntervencao from "./pages/TabelaIntervencao";
import IntervencaoBem from "./pages/IntervencaoBem";
import ResponsabilidadeTecnica from "./pages/ResponsabilidadeTecnica";
import PlanilhaOrcamento from "./pages/PlanilhaOrcamento";
import PlanilhaOrcamentoContrato from "./pages/PlanilhaOrcamentoContrato";
import PlanilhaOrcamentoAditivo from "./pages/PlanilhaOrcamentoAditivo";
import Acompanhamento from "./pages/Acompanhamento";
import Medicao from "./pages/Medicao";
import ExecucaoIndiretaContrato from "./pages/ExecucaoIndiretaContrato";
import ExecucaoIndiretaAditivo from "./pages/ExecucaoIndiretaAditivo";
import Paralisacao from "./pages/Paralisacao";
import DocumentosAcompanhamento from "./pages/DocumentosAcompanhamento";
import IntervencaoAcaoPlanejamento from "./pages/IntervencaoAcaoPlanejamento";
import EmpenhoIntervencao from "./pages/EmpenhoIntervencao";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/tabela-intervencao" element={<Layout><TabelaIntervencao /></Layout>} />
          <Route path="/intervencao-bem" element={<Layout><IntervencaoBem /></Layout>} />
          <Route path="/responsabilidade-tecnica" element={<Layout><ResponsabilidadeTecnica /></Layout>} />
          <Route path="/planilha-orcamento" element={<Layout><PlanilhaOrcamento /></Layout>} />
          <Route path="/planilha-orcamento-contrato" element={<Layout><PlanilhaOrcamentoContrato /></Layout>} />
          <Route path="/planilha-orcamento-aditivo" element={<Layout><PlanilhaOrcamentoAditivo /></Layout>} />
          <Route path="/acompanhamento" element={<Layout><Acompanhamento /></Layout>} />
          <Route path="/medicao" element={<Layout><Medicao /></Layout>} />
          <Route path="/execucao-indireta-contrato" element={<Layout><ExecucaoIndiretaContrato /></Layout>} />
          <Route path="/execucao-indireta-aditivo" element={<Layout><ExecucaoIndiretaAditivo /></Layout>} />
          <Route path="/paralisacao" element={<Layout><Paralisacao /></Layout>} />
          <Route path="/documentos-acompanhamento" element={<Layout><DocumentosAcompanhamento /></Layout>} />
          <Route path="/intervencao-acao-planejamento" element={<Layout><IntervencaoAcaoPlanejamento /></Layout>} />
          <Route path="/empenho-intervencao" element={<Layout><EmpenhoIntervencao /></Layout>} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
