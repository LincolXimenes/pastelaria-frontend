import React from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function ClientLayout({ children }) {
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path ? 'text-yellow-600 font-semibold border-b-2 border-yellow-600' : 'text-gray-700 hover:text-yellow-600';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header do Cliente - FULL WIDTH */}
      <header className="bg-white shadow-md">
        {/* Container maior para telas grandes */}
        <div className="max-w-[1400px] mx-auto px-6 lg:px-8 xl:px-12">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-4 hover:opacity-90 transition-opacity">
              <div className="text-4xl">🥟</div>
              <div>
                <h1 className="text-2xl lg:text-3xl font-bold text-yellow-600">Pastelaria Delícia</h1>
                <p className="text-sm text-gray-500">Os melhores pastéis da cidade</p>
              </div>
            </Link>

            {/* Navigation - EXPANDIDA */}
            <nav className="hidden lg:flex items-center space-x-10">
              <Link to="/" className={`px-4 py-2 text-base font-medium transition-all duration-200 ${isActive('/')}`}>
                🏠 Home
              </Link>
              <Link to="/cardapio" className={`px-4 py-2 text-base font-medium transition-all duration-200 ${isActive('/cardapio')}`}>
                🍽️ Cardápio
              </Link>
              <Link to="/meus-pedidos" className={`px-4 py-2 text-base font-medium transition-all duration-200 ${isActive('/meus-pedidos')}`}>
                📦 Meus Pedidos
              </Link>
              <Link to="/contato" className={`px-4 py-2 text-base font-medium transition-all duration-200 ${isActive('/contato')}`}>
                📞 Contato
              </Link>
            </nav>

            {/* Ações do Cliente */}
            <div className="flex items-center space-x-6">
              {/* Carrinho */}
              <button className="relative p-3 text-gray-700 hover:text-yellow-600 transition-colors rounded-lg hover:bg-yellow-50">
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m1.6 8L5 3H3m4 10v6a1 1 0 001 1h8a1 1 0 001-1v-6m-9 0h10" />
                </svg>
                <span className="absolute -top-1 -right-1 bg-yellow-600 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center font-medium">
                  0
                </span>
              </button>

              {/* Login Admin */}
              <Link 
                to="/admin/login"
                className="bg-yellow-600 text-white px-6 py-3 rounded-lg hover:bg-yellow-700 transition-colors text-base font-medium shadow-md hover:shadow-lg"
              >
                👨‍💼 Área Admin
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button className="lg:hidden p-2 rounded-md text-gray-700 hover:text-yellow-600 hover:bg-yellow-50">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content - CONTAINER EXPANDIDO */}
      <main className="max-w-[1400px] mx-auto px-6 lg:px-8 xl:px-12 py-8">
        {children}
      </main>

      {/* Footer - EXPANDIDO */}
      <footer className="bg-gray-800 text-white mt-16">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-8 xl:px-12 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Logo Footer */}
            <div className="col-span-1">
              <div className="flex items-center space-x-2 mb-4">
                <span className="text-3xl">🥟</span>
                <span className="text-xl font-bold text-yellow-400">Pastelaria Delícia</span>
              </div>
              <p className="text-gray-300 text-sm">
                Há mais de 20 anos servindo os melhores pastéis da cidade com ingredientes frescos e muito amor.
              </p>
            </div>

            {/* Links Rápidos */}
            <div>
              <h3 className="text-lg font-semibold mb-4 text-yellow-400">Links Rápidos</h3>
              <ul className="space-y-2 text-sm">
                <li><Link to="/" className="text-gray-300 hover:text-yellow-400 transition-colors">Home</Link></li>
                <li><Link to="/cardapio" className="text-gray-300 hover:text-yellow-400 transition-colors">Cardápio</Link></li>
                <li><Link to="/contato" className="text-gray-300 hover:text-yellow-400 transition-colors">Contato</Link></li>
              </ul>
            </div>

            {/* Contato */}
            <div>
              <h3 className="text-lg font-semibold mb-4 text-yellow-400">Contato</h3>
              <div className="space-y-2 text-sm text-gray-300">
                <p>📍 Rua das Delícias, 123 - Centro</p>
                <p>📞 (11) 99999-9999</p>
                <p>📧 contato@pastealriadelia.com</p>
              </div>
            </div>

            {/* Horários */}
            <div>
              <h3 className="text-lg font-semibold mb-4 text-yellow-400">Horário</h3>
              <div className="space-y-2 text-sm text-gray-300">
                <p>Segunda a Sexta: 10h às 22h</p>
                <p>Sábados: 10h às 23h</p>
                <p>Domingos: 14h às 20h</p>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-sm text-gray-400">
            <p>&copy; 2025 Pastelaria Delícia. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}