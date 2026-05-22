import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import ClientLayout from './layouts/ClientLayout';
import AdminLayout from './layouts/AdminLayout';
import Home from './pages/client/Home';
import Cardapio from './pages/client/Cardapio';
import Contato from './pages/client/Contato';
import MeusPedidos from './pages/client/MeusPedidos';
import Login from './pages/Login';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminProdutos from './pages/admin/AdminProdutos';
import AdminPedidos from './pages/admin/AdminPedidos';
import AdminRelatorios from './pages/admin/AdminRelatorios';
import AdminClientes from './pages/admin/AdminClientes';

// Componente para proteger rotas admin
function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-yellow-600"></div>
      </div>
    );
  }
  
  return user ? children : <Navigate to="/admin/login" replace />;
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="App">
          <Routes>
            {/* Rotas do Cliente */}
            <Route path="/" element={
              <ClientLayout>
                <Home />
              </ClientLayout>
            } />
            
            <Route path="/cardapio" element={
              <ClientLayout>
                <Cardapio />
              </ClientLayout>
            } />

            <Route path="/contato" element={
              <ClientLayout>
                <Contato />
              </ClientLayout>
            } />

            <Route path="/meus-pedidos" element={
              <ClientLayout>
                <MeusPedidos />
              </ClientLayout>
            } />
            
            {/* Rotas de Login */}
            <Route path="/login" element={<Login />} />
            <Route path="/admin/login" element={<Login />} />

            {/* Rotas Admin Protegidas */}
            <Route path="/admin/dashboard" element={
              <ProtectedRoute>
                <AdminLayout>
                  <AdminDashboard />
                </AdminLayout>
              </ProtectedRoute>
            } />

            <Route path="/admin/produtos" element={
              <ProtectedRoute>
                <AdminLayout>
                  <AdminProdutos />
                </AdminLayout>
              </ProtectedRoute>
            } />

            <Route path="/admin/pedidos" element={
              <ProtectedRoute>
                <AdminLayout>
                  <AdminPedidos />
                </AdminLayout>
              </ProtectedRoute>
            } />

            {/* Redirect /admin para /admin/dashboard */}
            <Route path="/admin/relatorios" element={
              <ProtectedRoute>
                <AdminLayout>
                  <AdminRelatorios />
                </AdminLayout>
              </ProtectedRoute>
            } />

            <Route path="/admin/clientes" element={
              <ProtectedRoute>
                <AdminLayout>
                  <AdminClientes />
                </AdminLayout>
              </ProtectedRoute>
            } />

            {/* Redirect /admin para /admin/dashboard */}
            <Route path="/admin" element={<Navigate to="/admin/dashboard" replace />} />
            
            {/* Redirect padrão */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;
