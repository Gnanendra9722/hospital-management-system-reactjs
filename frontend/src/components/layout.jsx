import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';
import { useAppContext } from '../context/AppContext';

const Layout = () => {
  const { sidebarOpen } = useAppContext();

  return (
    <div className="flex h-screen bg-neutral-50">
      <Sidebar />
      <div className={`flex-1 flex flex-col transition-all duration-300 ${
        sidebarOpen ? 'ml-64' : 'ml-20'
      }`}>
        <Header />
        <main className="flex-1 overflow-auto p-6">
          <div className="container mx-auto">
            <Outlet />
          </div>
        </main>
        <footer className="py-4 px-6 bg-white border-t border-neutral-200">
          <div className="container mx-auto">
            <p className="text-sm text-neutral-500 text-center">
              © {new Date().getFullYear()} MediCare Hospital Management System. All rights reserved.
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Layout;