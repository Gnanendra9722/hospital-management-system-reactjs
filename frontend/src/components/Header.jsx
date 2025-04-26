import React from 'react';
import { 
  Menu, 
  Bell, 
  Search, 
  ChevronDown,
  LogOut 
} from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const { user, logout, toggleSidebar } = useAppContext();
  const [showUserMenu, setShowUserMenu] = React.useState(false);
  const [showNotifications, setShowNotifications] = React.useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const toggleUserMenu = () => {
    setShowUserMenu(!showUserMenu);
    if (showNotifications) setShowNotifications(false);
  };

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
    if (showUserMenu) setShowUserMenu(false);
  };

  return (
    <header className="bg-white border-b border-neutral-200 py-4 px-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button 
            className="text-neutral-500 hover:text-primary-500 focus:outline-none"
            onClick={toggleSidebar}
          >
            <Menu size={24} />
          </button>
          <div className="relative hidden md:block">
            <input
              type="text"
              placeholder="Search..."
              className="pl-10 pr-4 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent w-64"
            />
            <Search className="absolute left-3 top-2.5 text-neutral-400" size={18} />
          </div>
        </div>

        <div className="flex items-center gap-4">
          {/* Notifications */}
          <div className="relative">
            <button 
              className="relative text-neutral-500 hover:text-primary-500 focus:outline-none"
              onClick={toggleNotifications}
            >
              <Bell size={20} />
              <span className="absolute -top-1 -right-1 bg-error-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                3
              </span>
            </button>
            
            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 bg-white rounded-md shadow-dropdown z-10 py-2 animate-fade-in">
                <h3 className="px-4 py-2 text-sm font-semibold border-b border-neutral-200">Notifications</h3>
                <div className="max-h-96 overflow-y-auto">
                  <div className="px-4 py-3 hover:bg-neutral-50 border-b border-neutral-100">
                    <p className="text-sm font-medium">New appointment request</p>
                    <p className="text-xs text-neutral-500">Patient: John Doe • 10 minutes ago</p>
                  </div>
                  <div className="px-4 py-3 hover:bg-neutral-50 border-b border-neutral-100">
                    <p className="text-sm font-medium">Medication stock alert</p>
                    <p className="text-xs text-neutral-500">Amoxicillin running low • 1 hour ago</p>
                  </div>
                  <div className="px-4 py-3 hover:bg-neutral-50">
                    <p className="text-sm font-medium">Lab results available</p>
                    <p className="text-xs text-neutral-500">Patient: Jane Smith • 3 hours ago</p>
                  </div>
                </div>
                <div className="border-t border-neutral-200 p-2">
                  <button className="w-full text-center text-sm text-primary-500 hover:text-primary-600 py-1">
                    View all notifications
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* User menu */}
          <div className="relative">
            <button 
              className="flex items-center focus:outline-none"
              onClick={toggleUserMenu}
            >
              <img 
                src={user?.avatar || "https://randomuser.me/api/portraits/men/32.jpg"} 
                alt="User"
                className="w-8 h-8 rounded-full object-cover"
              />
              <div className="hidden md:block ml-2">
                <p className="text-sm font-medium">{user?.name || "Guest User"}</p>
                <p className="text-xs text-neutral-500 capitalize">{user?.role || "User"}</p>
              </div>
              <ChevronDown size={16} className="ml-2 text-neutral-500" />
            </button>
            
            {showUserMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-dropdown z-10 animate-fade-in">
                <div className="py-1">
                  <a 
                    href="#profile" 
                    className="block px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-50"
                  >
                    Profile
                  </a>
                  <a 
                    href="#settings" 
                    className="block px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-50"
                  >
                    Settings
                  </a>
                  <hr className="my-1 border-neutral-200" />
                  <button
                    onClick={handleLogout}
                    className="flex items-center w-full text-left px-4 py-2 text-sm text-error-600 hover:bg-neutral-50"
                  >
                    <LogOut size={16} className="mr-2" />
                    Sign out
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;