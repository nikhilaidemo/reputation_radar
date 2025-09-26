import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { HomeIcon, BellAlertIcon, MegaphoneIcon, Cog8ToothIcon, HashtagIcon, ChartBarIcon, ArrowLeftOnRectangleIcon } from '@heroicons/react/24/outline';

const Layout = ({ children, onRefreshTime }) => {
  const { userRole, logout } = useAuth();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [highlight, setHighlight] = useState(false);

  useEffect(() => {
    if (onRefreshTime) {
      setCurrentTime(new Date());
      setHighlight(true);
      const timeout = setTimeout(() => setHighlight(false), 1000); // Highlight for 1 second
      return () => clearTimeout(timeout);
    }
  }, [onRefreshTime]);

  const navItems = [
    { name: 'Dashboard', path: '/dashboard', icon: HomeIcon, roles: ['pr_manager', 'social_media_analyst', 'executive', 'admin'] },
    { name: 'Channels', path: '/channels', icon: HashtagIcon, roles: ['pr_manager', 'social_media_analyst', 'admin'] },
    { name: 'Alerts', path: '/alerts', icon: BellAlertIcon, roles: ['pr_manager', 'social_media_analyst', 'admin'] },
    { name: 'Playbooks', path: '/playbooks', icon: MegaphoneIcon, roles: ['pr_manager', 'admin'] },
    { name: 'Admin', path: '/admin', icon: Cog8ToothIcon, roles: ['admin'] },
  ];

  return (
    <div className="flex h-screen bg-dark-900 text-white">
      {/* Sidebar */}
      <aside className="w-72 bg-gradient-to-b from-dark-800 to-dark-900 border-r border-dark-700 flex flex-col shadow-dark-lg">
        {/* Logo */}
        <div className="p-6 border-b border-dark-700">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-accent-500 rounded-xl flex items-center justify-center shadow-glow">
              <ChartBarIcon className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold gradient-text">Reputation Radar</h1>
              <p className="text-xs text-dark-400">Monitoring Excellence</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-grow p-4 space-y-2">
          {navItems.map((item) => (
            userRole && item.roles.includes(userRole) && (
              <Link
                key={item.name}
                to={item.path}
                className="nav-item text-dark-300 hover:text-white group"
              >
                <div className="flex items-center justify-center w-10 h-10 bg-dark-700 rounded-lg group-hover:bg-gradient-to-r group-hover:from-primary-600 group-hover:to-accent-600 transition-all duration-200">
                  <item.icon className="h-5 w-5" />
                </div>
                <span className="ml-3 font-medium">{item.name}</span>
                <div className="ml-auto opacity-0 group-hover:opacity-100 w-2 h-2 bg-primary-500 rounded-full transition-all duration-200"></div>
              </Link>
            )
          ))}
        </nav>

        {/* User Profile & Logout */}
        <div className="p-4 border-t border-dark-700 space-y-3">
          <div className="glass rounded-lg p-3">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-accent-500 rounded-full flex items-center justify-center text-sm font-bold">
                {userRole ? userRole.charAt(0).toUpperCase() : 'U'}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-white truncate">
                  {userRole ? userRole.replace('_', ' ').split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ') : 'User'}
                </p>
                <p className="text-xs text-dark-400 truncate">Active Session</p>
              </div>
            </div>
          </div>
          
          <button
            onClick={logout}
            className="flex items-center justify-center w-full p-3 text-white rounded-lg bg-gradient-to-r from-danger-600 to-danger-700 hover:from-danger-700 hover:to-danger-800 transition-all duration-200 shadow-lg hover:shadow-glow group"
          >
            <ArrowLeftOnRectangleIcon className="h-5 w-5 mr-2 group-hover:rotate-6 transition-transform duration-200" />
            <span className="font-medium">Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="glass border-b border-dark-700 p-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-white">
                Welcome back, {userRole ? userRole.replace('_', ' ').split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ') : 'User'}!
              </h1>
             </div>
            
            <div className="flex items-center space-x-4">
              {/* Status Indicator */}
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-success-500 rounded-full animate-pulse-slow"></div>
                <span className="text-sm text-dark-300">System Online</span>
              </div>
              
              {/* Time */}
              <div className="text-right">
                <p className={`text-sm ${highlight ? 'text-accent-400' : 'text-dark-300'}`}>{currentTime.toLocaleDateString()}</p>
                <p className={`text-xs ${highlight ? 'text-accent-400' : 'text-dark-400'}`}>{currentTime.toLocaleTimeString()}</p>
              </div>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <div className="flex-1 overflow-auto p-6 bg-gradient-to-br from-dark-900 via-dark-850 to-dark-800">
          <div className="animate-fade-in">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Layout;