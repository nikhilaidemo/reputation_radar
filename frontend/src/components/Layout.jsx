import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { HomeIcon, BellAlertIcon, MegaphoneIcon, Cog8ToothIcon, HashtagIcon, ChartBarIcon, ArrowLeftOnRectangleIcon } from '@heroicons/react/24/outline';

const Layout = ({ children }) => {
  const { userRole, logout } = useAuth();

  const navItems = [
    { name: 'Dashboard', path: '/dashboard', icon: HomeIcon, roles: ['pr_manager', 'social_media_analyst', 'executive', 'admin'] },
    { name: 'Channels', path: '/channels', icon: HashtagIcon, roles: ['pr_manager', 'social_media_analyst', 'admin'] },
    { name: 'Alerts', path: '/alerts', icon: BellAlertIcon, roles: ['pr_manager', 'social_media_analyst', 'admin'] },
    { name: 'Playbooks', path: '/playbooks', icon: MegaphoneIcon, roles: ['pr_manager', 'admin'] },
    { name: 'Admin', path: '/admin', icon: Cog8ToothIcon, roles: ['admin'] },
  ];

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 text-white flex flex-col">
        <div className="p-4 text-2xl font-bold border-b border-gray-700">
          Reputation Radar
        </div>
        <nav className="flex-grow p-4">
          <ul>
            {navItems.map((item) => (
              userRole && item.roles.includes(userRole) && (
                <li key={item.name} className="mb-2">
                  <Link
                    to={item.path}
                    className="flex items-center p-2 text-lg rounded-md hover:bg-gray-700 transition-colors"
                  >
                    <item.icon className="h-6 w-6 mr-3" />
                    {item.name}
                  </Link>
                </li>
              )
            ))}
          </ul>
        </nav>
        <div className="p-4 border-t border-gray-700">
          <button
            onClick={logout}
            className="flex items-center p-2 w-full text-lg rounded-md hover:bg-red-600 transition-colors bg-red-500 text-white"
          >
            <ArrowLeftOnRectangleIcon className="h-6 w-6 mr-3" />
            Logout
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white shadow-sm p-4 flex items-center justify-between">
          <h1 className="text-xl font-semibold text-gray-800">
            Welcome, {userRole ? userRole.replace('_', ' ').split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ') : 'User'}!
          </h1>
          {/* Add user menu or other header elements here */}
        </header>
        <div className="flex-1 overflow-auto p-6">
          {children}
        </div>
      </main>
    </div>
  );
};

export default Layout;