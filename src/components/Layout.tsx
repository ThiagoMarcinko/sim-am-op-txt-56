
import React from 'react';
import TabNavigation from './TabNavigation';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen bg-background">
      <TabNavigation />
      {children}
    </div>
  );
};

export default Layout;
