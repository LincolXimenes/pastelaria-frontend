import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

export default function Header() {
  const { user, logout } = useAuth();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    setShowUserMenu(false);
  };

  const toggleUserMenu = () => {
    setShowUserMenu(!showUserMenu);
  };

  const closeMenus = () => {
    setShowUserMenu(false);
    setMobileMenuOpen(false);
  };

  // Fechar menus ao clicar fora
  React.useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.user-menu') && !event.target.closest('.mobile-menu')) {
        closeMenus();
      }
    };

    if (showUserMenu || mobileMenuOpen) {
      document.addEventListener('click', handleClickOutside);
      return () => document.removeEventListener('click', handleClickOutside);
    }
  }, [showUserMenu, mobileMenuOpen]);

  return (
    <header className="bg-white shadow-lg border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-yellow-600">
              🥟 Pastelaria
            </h1>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link 
              to="/"
              className="text-gray-700 hover:text-yellow-600 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
            >
              Dashboard
            </Link>
            <Link 
              to="/produtos" 
              className="text-gray-700 hover:text-yellow-600 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
            >
              Produtos
            </Link>
            <Link 
              to="/pedidos" 
              className="text-gray-700 hover:text-yellow-600 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
            >
              Pedidos
            </Link>
            <Link 
              to="/relatorios" 
              className="text-gray-700 hover:text-yellow-600 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
            >
              Relatórios
            </Link>
          </nav>

          {/* User Menu */}
          <div className="flex items-center space-x-4">
            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-yellow-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-yellow-500"
            >
              <span className="sr-only">Abrir menu principal</span>
              <svg
                className={`${mobileMenuOpen ? 'hidden' : 'block'} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
              <svg
                className={`${mobileMenuOpen ? 'block' : 'hidden'} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* User dropdown */}
            <div className="relative user-menu">
              <button
                onClick={toggleUserMenu}
                className="flex items-center space-x-2 text-gray-700 hover:text-yellow-600 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
              >
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-yellow-600 rounded-full flex items-center justify-center text-white text-sm font-medium">
                    {user?.nome?.charAt(0).toUpperCase() || user?.email?.charAt(0).toUpperCase() || 'U'}
                  </div>
                  <span className="hidden sm:block">
                    {user?.nome || user?.email || 'Usuário'}
                  </span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </button>

              {/* Dropdown menu */}
              {showUserMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10 border border-gray-200">
                  <div className="px-4 py-2 border-b border-gray-100">
                    <p className="text-sm font-medium text-gray-900">{user?.nome || 'Usuário'}</p>
                    <p className="text-xs text-gray-500">{user?.email}</p>
                    {user?.role && (
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-yellow-100 text-yellow-800 mt-1">
                        {user.role === 'admin' ? 'Administrador' : 'Funcionário'}
                      </span>
                    )}
                  </div>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-200"
                  >
                    Sair
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden mobile-menu">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t border-gray-200">
            <Link
              to="/"
              className="text-gray-700 hover:text-yellow-600 block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200"
              onClick={closeMenus}
            >
              Dashboard
            </Link>
            <Link
              to="/produtos"
              className="text-gray-700 hover:text-yellow-600 block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200"
              onClick={closeMenus}
            >
              Produtos
            </Link>
            <Link
              to="/pedidos"
              className="text-gray-700 hover:text-yellow-600 block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200"
              onClick={closeMenus}
            >
              Pedidos
            </Link>
            <Link
              to="/relatorios"
              className="text-gray-700 hover:text-yellow-600 block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200"
              onClick={closeMenus}
            >
              Relatórios
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}