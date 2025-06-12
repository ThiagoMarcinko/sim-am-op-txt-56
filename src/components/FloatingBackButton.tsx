
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Home } from 'lucide-react';

const FloatingBackButton = () => {
  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Link to="/">
        <Button className="rounded-full shadow-lg hover:shadow-xl transition-shadow">
          <Home className="w-4 h-4 mr-2" />
          Voltar ao Início
        </Button>
      </Link>
    </div>
  );
};

export default FloatingBackButton;
