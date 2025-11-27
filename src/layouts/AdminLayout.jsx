import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function AdminLayout({ children }) {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const isActive = (path) => {
    return location.pathname === path 
      ? 'bg-yellow-600 text-white shadow-lg' 
      : 'text-gray-700 hover:bg-yellow-50 hover:text-yellow-600';
  };

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  const menuItems = [
    { path: '/admin/dashboard', icon: '📊', label: 'Dashboard' },
    { path: '/admin/produtos', icon: '🥟', label: 'Produtos' },
    { path: '/admin/pedidos', icon: '📦', label: 'Pedidos' },
    { path: '/admin/relatorios', icon: '📈', label: 'Relatórios' },
    { path: '/admin/clientes', icon: '👥', label: 'Clientes' },
    { path: '/admin/configuracoes', icon: '⚙️', label: 'Configurações' }
  ];

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <div className={`bg-white shadow-xl transition-all duration-300 ${sidebarOpen ? 'w-64' : 'w-20'} lg:w-64`}>
        <div className="p-6">
          {/* Logo */}
          <div className="flex items-center space-x-3 mb-8">
            <div className="text-3xl">🥟</div>
            <div className={`${sidebarOpen ? 'block' : 'hidden'} lg:block`}>
              <h1 className="text-xl font-bold text-yellow-600">Admin Panel</h1>
              <p className="text-xs text-gray-500">Pastelaria Delícia</p>
            </div>
          </div>

          {/* Navigation */}
          <nav className="space-y-2">
            {menuItems.map(item => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${isActive(item.path)}`}
                title={item.label}
              >
                <span className="text-xl">{item.icon}</span>
                <span className={`font-medium ${sidebarOpen ? 'block' : 'hidden'} lg:block`}>
                  {item.label}
                </span>
              </Link>
            ))}
          </nav>
        </div>

        {/* User Info & Logout */}
        <div className="absolute bottom-0 left-0 right-0 p-6 border-t">
          <div className={`flex items-center space-x-3 mb-4 ${sidebarOpen ? 'block' : 'hidden'} lg:block`}>
            <div className="w-10 h-10 bg-yellow-600 rounded-full flex items-center justify-center">
              <span className="text-white font-semibold">
                {user?.email?.charAt(0).toUpperCase() || 'A'}
              </span>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900">{user?.email || 'Admin'}</p>
              <p className="text-xs text-gray-500">Administrador</p>
            </div>
          </div>
          
          <div className="space-y-2">
            <Link
              to="/"
              className="flex items-center space-x-3 px-4 py-2 text-gray-600 hover:text-yellow-600 transition-colors"
              title="Ver Site"
            >
              <span className="text-lg">🌐</span>
              <span className={`text-sm ${sidebarOpen ? 'block' : 'hidden'} lg:block`}>
                Ver Site
              </span>
            </Link>
            
            <button
              onClick={handleLogout}
              className="flex items-center space-x-3 px-4 py-2 text-red-600 hover:text-red-700 transition-colors w-full text-left"
              title="Logout"
            >
              <span className="text-lg">🚪</span>
              <span className={`text-sm ${sidebarOpen ? 'block' : 'hidden'} lg:block`}>
                Sair
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Header */}
        <header className="bg-white shadow-sm border-b h-16 flex items-center justify-between px-6">
          {/* Mobile Sidebar Toggle */}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="lg:hidden p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

          {/* Page Title */}
          <div>
            <h2 className="text-xl font-semibold text-gray-900">
              {menuItems.find(item => item.path === location.pathname)?.label || 'Admin'}
            </h2>
          </div>

          {/* Quick Actions */}
          <div className="flex items-center space-x-4">
            {/* Notifications */}
            <button className="relative p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5-5 5-5H9l5 5-5 5z" />
              </svg>
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                3
              </span>
            </button>

            {/* User Menu */}
            <div className="text-sm text-gray-600">
              Olá, <span className="font-medium">{user?.email?.split('@')[0] || 'Admin'}</span>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-6 overflow-y-auto">
          <div className="max-w-[1400px] mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}