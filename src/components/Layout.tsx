import React from 'react';
import { SideMenu } from './SideMenu';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex h-screen bg-gray-50">
      <SideMenu />
      <main className="flex-1 overflow-auto">
        {children}
      </main>
    </div>
  );
};