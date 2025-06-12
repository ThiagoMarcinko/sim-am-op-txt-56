
import React from 'react';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import AppSidebar from './AppSidebar';
import FloatingBackButton from './FloatingBackButton';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <AppSidebar />
        <main className="flex-1 p-4">
          <div className="mb-4">
            <SidebarTrigger />
          </div>
          {children}
        </main>
        <FloatingBackButton />
      </div>
    </SidebarProvider>
  );
};

export default Layout;
