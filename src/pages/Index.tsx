
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center space-y-6">
        <h1 className="text-4xl font-bold mb-4">Sistema de Intervenções</h1>
        <p className="text-xl text-muted-foreground mb-8">Gerencie suas tabelas de intervenção</p>
        <Link to="/tabela-intervencao">
          <Button size="lg" className="px-8 py-3 text-lg">
            Acessar Tabela Intervenção
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Index;
