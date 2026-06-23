import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import ThemeToggle from '../components/shared/ThemeToggle';

export default function AdminLayout({ children }) {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const isActive = (path) =>
    location.pathname === path
      ? 'bg-amber-50 dark:bg-amber-500/10 text-amber-700 dark:text-amber-400 font-semibold'
      : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-100';

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  const menuItems = [
    { path: '/admin/dashboard', icon: '📊', label: 'Dashboard' },
    { path: '/admin/produtos',  icon: '🥟', label: 'Produtos' },
    { path: '/admin/pedidos',   icon: '📦', label: 'Pedidos' },
    { path: '/admin/relatorios',icon: '📈', label: 'Relatórios' },
    { path: '/admin/clientes',  icon: '👥', label: 'Clientes' },
  ];

  const currentPage = menuItems.find(i => i.path === location.pathname)?.label || 'Admin';

  return (
    <div className="min-h-screen flex bg-gray-50 dark:bg-gray-950">
      {/* ── Sidebar ──────────────────────────────────────── */}
      <aside className={`
        flex-shrink-0 flex flex-col
        bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800
        transition-all duration-300
        ${sidebarOpen ? 'w-60' : 'w-16'} lg:w-60
      `}>
        {/* Logo */}
        <div className="h-16 flex items-center gap-3 px-4 border-b border-gray-100 dark:border-gray-800">
          <span className="text-2xl flex-shrink-0">🥟</span>
          <div className={`${sidebarOpen ? 'block' : 'hidden'} lg:block overflow-hidden`}>
            <p className="text-sm font-semibold text-gray-900 dark:text-white truncate">Admin Panel</p>
            <p className="text-xs text-gray-500 dark:text-gray-400 truncate">Pastelaria Delícia</p>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 p-3 space-y-1">
          {menuItems.map(item => (
            <Link
              key={item.path}
              to={item.path}
              title={item.label}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${isActive(item.path)}`}
            >
              <span className="text-base flex-shrink-0">{item.icon}</span>
              <span className={`${sidebarOpen ? 'block' : 'hidden'} lg:block`}>{item.label}</span>
            </Link>
          ))}
        </nav>

        {/* User + actions */}
        <div className="p-3 border-t border-gray-100 dark:border-gray-800 space-y-1">
          <Link
            to="/"
            title="Ver site"
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
          >
            <span className="text-base flex-shrink-0">🌐</span>
            <span className={`${sidebarOpen ? 'block' : 'hidden'} lg:block`}>Ver site</span>
          </Link>
          <button
            onClick={handleLogout}
            title="Sair"
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors"
          >
            <span className="text-base flex-shrink-0">🚪</span>
            <span className={`${sidebarOpen ? 'block' : 'hidden'} lg:block`}>Sair</span>
          </button>
        </div>
      </aside>

      {/* ── Main area ────────────────────────────────────── */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <header className="h-16 flex items-center justify-between px-4 sm:px-6
          bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 flex-shrink-0">
          <div className="flex items-center gap-3">
            {/* Mobile toggle */}
            <button
              onClick={() => setSidebarOpen(o => !o)}
              aria-label="Abrir menu"
              className="lg:hidden btn-ghost p-2 rounded-lg"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <h2 className="text-base font-semibold text-gray-900 dark:text-white">{currentPage}</h2>
          </div>

          <div className="flex items-center gap-2">
            <ThemeToggle />
            <div className="hidden sm:flex items-center gap-2 pl-2 border-l border-gray-200 dark:border-gray-700">
              <div className="w-7 h-7 bg-amber-500 rounded-full flex items-center justify-center">
                <span className="text-white text-xs font-semibold">
                  {user?.email?.charAt(0).toUpperCase() || 'A'}
                </span>
              </div>
              <span className="text-sm text-gray-600 dark:text-gray-400">
                {user?.email?.split('@')[0] || 'Admin'}
              </span>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 p-4 sm:p-6 overflow-y-auto">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}