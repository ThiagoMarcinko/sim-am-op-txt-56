
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import TabNavigation from './TabNavigation';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen bg-background">
      <TabNavigation />
      <div className="p-4">
        <div className="max-w-4xl mx-auto mb-4">
          <Link to="/">
            <Button variant="outline" className="mb-4">
              Voltar ao Início
            </Button>
          </Link>
        </div>
      </div>
      {children}
    </div>
  );
};

export default Layout;
