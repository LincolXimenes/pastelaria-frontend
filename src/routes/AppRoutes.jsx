import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Dashboard from '../pages/Dashboard';
import About from '../pages/About';
import Produtos from '../pages/Produtos';
import Pedidos from '../pages/Pedidos';
import Relatorios from '../pages/Relatorios';
import Layout from '../components/Layout';
import PrivateRoute from '../components/PrivateRoute';
import { AuthProvider } from '../contexts/AuthContext';

export default function AppRoutes() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          
          <Route element={
            <PrivateRoute>
              <Layout />
            </PrivateRoute>
          }>
            <Route path="/" element={<Home />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/about" element={<About />} />
            <Route path="/produtos" element={<Produtos />} />
            <Route path="/pedidos" element={<Pedidos />} />
            <Route path="/relatorios" element={<Relatorios />} />
          </Route>
          
          <Route path="*" element={<div className="p-8 text-center text-red-600">Página não encontrada</div>} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}


