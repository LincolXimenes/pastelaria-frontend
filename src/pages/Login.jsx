import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(null);
  
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setAlert(null);

    const result = await login(email, password);

    if (result.success) {
      navigate('/admin/dashboard');
    } else {
      setAlert({ type: 'error', message: result.error });
    }

    setLoading(false);
  };

  // Função para testar a conexão diretamente
  const testarConexao = async () => {
    try {
      setAlert(null);
      
      const apiBase = import.meta.env.VITE_API_URL || 'http://localhost:5000';
      const response = await fetch(`${apiBase}/api/users/login`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({ 
          email: email || 'teste@teste.com', 
          senha: password || '123456' 
        })
      });

      const data = await response.text();
      
      if (response.ok) {
        setAlert({ type: 'success', message: 'Conexão OK! Dados: ' + data });
      } else {
        setAlert({ type: 'error', message: `Erro ${response.status}: ${data}` });
      }
    } catch (error) {
      setAlert({ type: 'error', message: 'Erro de conexão: ' + error.message });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8">
        <div>
          <div className="flex justify-center mb-4">
            <div className="text-6xl">🥟</div>
          </div>
          <h2 className="text-center text-3xl font-extrabold text-gray-900">
            Pastelaria Delícia - Admin
          </h2>
          <p className="text-center text-sm text-gray-600 mt-2">
            API: {import.meta.env.VITE_API_URL || 'http://localhost:5000'}
          </p>
        </div>
        
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {/* Alert inline em vez de componente */}
          {alert && (
            <div className={`px-4 py-3 rounded relative ${
              alert.type === 'error' 
                ? 'bg-red-100 border border-red-400 text-red-700'
                : 'bg-green-100 border border-green-400 text-green-700'
            }`}>
              <span className="block sm:inline">{alert.message}</span>
              <button 
                type="button"
                onClick={() => setAlert(null)}
                className="absolute top-0 right-0 px-4 py-3"
              >
                <span className="text-2xl">&times;</span>
              </button>
            </div>
          )}
          
          <div>
            <label htmlFor="email" className="sr-only">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className="relative block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-yellow-500 focus:border-yellow-500"
              placeholder="Email (admin@pastelaria.com)"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          
          <div>
            <label htmlFor="password" className="sr-only">Senha</label>
            <input
              id="password"
              name="password"
              type="password"
              required
              className="relative block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-yellow-500 focus:border-yellow-500"
              placeholder="Senha (123456)"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="space-y-3">
            <button
              type="submit"
              disabled={loading}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-yellow-600 hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 disabled:opacity-50"
            >
              {loading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Entrando...
                </>
              ) : 'Entrar no Painel Admin'}
            </button>
            
            <button
              type="button"
              onClick={testarConexao}
              className="w-full flex justify-center py-2 px-4 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
            >
              🔧 Testar Conexão Backend
            </button>
          </div>

          <div className="text-center text-sm text-gray-500">
            <p>Credenciais padrão:</p>
            <p><strong>admin@pastelaria.com</strong> / <strong>123456</strong></p>
          </div>
        </form>
      </div>
    </div>
  );
}