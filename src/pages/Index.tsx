
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center space-y-6">
        <p className="text-xl font-bold">
          Preenchimento do SIM-AM: Módulo de Obras Públicas
        </p>
        <Link to="/tabela-intervencao">
          <Button size="lg" className="px-8 py-3 text-lg">
            Iniciar o preenchimento
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Index;
