
import React from 'react';
import TabNavigation from './TabNavigation';
import FloatingBackButton from './FloatingBackButton';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen bg-background">
      <TabNavigation />
      {children}
      <FloatingBackButton />
    </div>
  );
};

export default Layout;
