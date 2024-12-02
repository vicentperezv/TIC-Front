import React, { useEffect } from 'react';
import {
  LayoutDashboard,
  Settings,
  BarChart2,
  Bell,
  LogOut,
  ChevronLeft,
  Menu
} from 'lucide-react';
import { useAuthStore } from '../store/authStore';
import { useState } from 'react';

export const SideMenu = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const logout = useAuthStore((state) =>state.logout)
  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', active: false, link:'/' },
    { icon: BarChart2, label: 'Análisis', link:'/analytics' },
    { icon: Settings, label: 'Configuración',  link: '/settings'},
  ];
  
  return (
    <div 
      className={`bg-white border-r border-gray-200 transition-all duration-300 ${
        isCollapsed ? 'w-20' : 'w-64'
      } flex flex-col`}
    >
      <div className="p-4 flex items-center justify-between border-b border-gray-200">
        {!isCollapsed && (
          <div className="flex items-center gap-2">
            <BarChart2 className="h-8 w-8 text-blue-600" />
            <span className="font-bold text-xl text-gray-800">Eco Aira</span>
          </div>
        )}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          {isCollapsed ? (
            <Menu className="h-5 w-5 text-gray-600" />
          ) : (
            <ChevronLeft className="h-5 w-5 text-gray-600" />
          )}
        </button>
      </div>

      <nav className="flex-1 px-2 py-4">
        <ul className="space-y-1">
          {menuItems.map((item, index) => (
            <li key={index}>
              <a
                href={item.link}
                className={`flex items-center gap-3 px-3 py-3 rounded-lg transition-colors ${
                  item.active
                    ? 'bg-blue-50 text-blue-600'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <item.icon className={`h-5 w-5 ${
                  item.active ? 'text-blue-600' : 'text-gray-500'
                }`} />
                {!isCollapsed && (
                  <span className={`font-medium ${
                    item.active ? 'text-blue-600' : 'text-gray-700'
                  }`}>
                    {item.label}
                  </span>
                )}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <div className="border-t border-gray-200 p-2">
        <button className="flex items-center gap-3 w-full px-3 py-3 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors" onClick={logout}>
          <LogOut className="h-5 w-5 text-gray-500" />
          {!isCollapsed && (
            <span className="font-medium text-gray-700">Log out</span>
          )}
        </button>
      </div>
    </div>
  );
};