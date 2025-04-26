import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  UserRound, 
  Calendar, 
  Pill, 
  CreditCard, 
  BarChart, 
  Settings,
  Activity
} from 'lucide-react';
import { useAppContext } from '../context/AppContext';

const Sidebar = () => {
  const { sidebarOpen } = useAppContext();

  const navItems = [
    { name: 'Dashboard', path: '/', icon: <LayoutDashboard size={20} /> },
    { name: 'Patients', path: '/patients', icon: <Users size={20} /> },
    { name: 'Doctors', path: '/doctors', icon: <UserRound size={20} /> },
    { name: 'Appointments', path: '/appointments', icon: <Calendar size={20} /> },
    { name: 'Pharmacy', path: '/pharmacy', icon: <Pill size={20} /> },
    { name: 'Billing', path: '/billing', icon: <CreditCard size={20} /> },
    { name: 'Reports', path: '/reports', icon: <BarChart size={20} /> },
  ];

  return (
    <aside 
      className={`fixed left-0 top-0 h-full bg-white border-r border-neutral-200 transition-all duration-300 z-20 ${
        sidebarOpen ? 'w-64' : 'w-20'
      }`}
    >
      <div className="flex flex-col h-full">
        {/* Logo */}
        <div className={`p-6 flex items-center ${sidebarOpen ? 'justify-start' : 'justify-center'}`}>
          <Activity className="text-primary-500" size={24} />
          {sidebarOpen && (
            <h1 className="ml-2 text-xl font-bold text-primary-500">MediCare</h1>
          )}
        </div>

        {/* Navigation */}
        <nav className="flex-1 py-6">
          <ul className="space-y-1">
            {navItems.map((item) => (
              <li key={item.path}>
                <NavLink
                  to={item.path}
                  className={({ isActive }) => `
                    flex items-center px-6 py-3 text-neutral-700 hover:bg-neutral-50 hover:text-primary-500 transition-colors
                    ${isActive ? 'bg-primary-50 text-primary-500 border-r-4 border-primary-500' : ''}
                    ${sidebarOpen ? '' : 'justify-center'}
                  `}
                >
                  <span className="text-inherit">{item.icon}</span>
                  {sidebarOpen && <span className="ml-3">{item.name}</span>}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        {/* Bottom section */}
        <div className="p-6 border-t border-neutral-200">
          <NavLink
            to="/settings"
            className={({ isActive }) => `
              flex items-center text-neutral-700 hover:text-primary-500 transition-colors
              ${isActive ? 'text-primary-500' : ''}
              ${sidebarOpen ? '' : 'justify-center'}
            `}
          >
            <Settings size={20} />
            {sidebarOpen && <span className="ml-3">Settings</span>}
          </NavLink>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;