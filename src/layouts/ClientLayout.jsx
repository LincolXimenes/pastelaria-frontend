import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import ThemeToggle from '../components/shared/ThemeToggle';

export default function ClientLayout({ children }) {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const isActive = (path) =>
    location.pathname === path
      ? 'text-amber-600 dark:text-amber-400 font-semibold'
      : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100';

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/cardapio', label: 'Cardápio' },
    { to: '/meus-pedidos', label: 'Meus Pedidos' },
    { to: '/contato', label: 'Contato' },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-950">
      {/* ── Header ─────────────────────────────────────────── */}
      <header className="sticky top-0 z-40 bg-white/90 dark:bg-gray-900/90 backdrop-blur border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2.5 hover:opacity-80 transition-opacity">
              <span className="text-2xl">🥟</span>
              <div className="leading-tight">
                <span className="block text-base font-bold text-gray-900 dark:text-white">
                  Pastelaria Delícia
                </span>
                <span className="block text-xs text-gray-500 dark:text-gray-400">
                  Os melhores pastéis da cidade
                </span>
              </div>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-1">
              {navLinks.map(link => (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`px-3 py-2 text-sm rounded-lg transition-colors ${isActive(link.to)}`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Actions */}
            <div className="flex items-center gap-2">
              <ThemeToggle />

              {/* Cart */}
              <button
                aria-label="Carrinho"
                className="relative btn-ghost p-2 rounded-lg"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4m1.6 8L5 3H3m4 10v6a1 1 0 001 1h8a1 1 0 001-1v-6m-9 0h10" />
                </svg>
                <span className="absolute -top-0.5 -right-0.5 bg-amber-500 text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                  0
                </span>
              </button>

              {/* Admin link */}
              <Link
                to="/admin/login"
                className="hidden sm:inline-flex btn-secondary text-xs px-3 py-1.5"
              >
                Área Admin
              </Link>

              {/* Mobile hamburger */}
              <button
                onClick={() => setMobileOpen(o => !o)}
                aria-label="Abrir menu"
                className="md:hidden btn-ghost p-2 rounded-lg"
              >
                {mobileOpen ? (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="md:hidden border-t border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 px-4 py-3 space-y-1 animate-[fadeIn_0.15s_ease-out]">
            {navLinks.map(link => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setMobileOpen(false)}
                className={`block px-3 py-2.5 text-sm rounded-lg transition-colors ${isActive(link.to)}`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              to="/admin/login"
              onClick={() => setMobileOpen(false)}
              className="block px-3 py-2.5 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100"
            >
              Área Admin
            </Link>
          </div>
        )}
      </header>

      {/* ── Main ───────────────────────────────────────────── */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>

      {/* ── Footer ─────────────────────────────────────────── */}
      <footer className="bg-gray-900 dark:bg-gray-950 border-t border-gray-800 text-white mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xl">🥟</span>
                <span className="font-semibold text-amber-400">Pastelaria Delícia</span>
              </div>
              <p className="text-sm text-gray-400 leading-relaxed">
                Há mais de 20 anos servindo os melhores pastéis com ingredientes frescos.
              </p>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-gray-300 uppercase tracking-wider mb-3">Navegação</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                {navLinks.map(link => (
                  <li key={link.to}>
                    <Link to={link.to} className="hover:text-amber-400 transition-colors">{link.label}</Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-gray-300 uppercase tracking-wider mb-3">Contato</h3>
              <div className="space-y-2 text-sm text-gray-400">
                <p>📍 Rua das Delícias, 123</p>
                <p>📞 (11) 99999-9999</p>
                <p>📧 contato@pastelariadelicia.com</p>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-gray-300 uppercase tracking-wider mb-3">Horário</h3>
              <div className="space-y-2 text-sm text-gray-400">
                <p>Seg–Sex: 10h às 22h</p>
                <p>Sábados: 10h às 23h</p>
                <p>Domingos: 14h às 20h</p>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-6 text-center text-xs text-gray-500">
            &copy; {new Date().getFullYear()} Pastelaria Delícia. Todos os direitos reservados.
          </div>
        </div>
      </footer>
    </div>
  );
}