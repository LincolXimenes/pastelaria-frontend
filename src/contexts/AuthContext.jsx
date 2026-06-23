/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useState, useEffect } from 'react';
import api, { TOKEN_STORAGE_KEY, USER_STORAGE_KEY } from '../services/api';

const AuthContext = createContext();

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Verificar se existe usuário logado ao carregar a página
  useEffect(() => {
    const savedUser = localStorage.getItem(USER_STORAGE_KEY);
    const savedToken = localStorage.getItem(TOKEN_STORAGE_KEY);
    
    if (savedUser && savedToken) {
      try {
        const userData = JSON.parse(savedUser);
        setUser(userData);
      } catch {
        localStorage.removeItem(USER_STORAGE_KEY);
        localStorage.removeItem(TOKEN_STORAGE_KEY);
      }
    }
    
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      const response = await api.post('/api/users/login', {
        email,
        senha: password
      });

      const data = response.data;

      const userData = {
        id: data._id,
        email: data.email,
        nome: data.nome || 'Usuário',
        role: data.role,
        isAdmin: !!data.isAdmin
      };

      setUser(userData);
      localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(userData));
      localStorage.setItem(TOKEN_STORAGE_KEY, data.token);

      return { success: true, user: userData };
    } catch (error) {
      const status = error.response?.status;
      const apiMsg = error.response?.data?.msg;

      if (status === 429) {
        return { success: false, error: apiMsg || 'Muitas tentativas. Aguarde alguns minutos.' };
      }

      return { success: false, error: apiMsg || 'Email ou senha inválidos' };
    }
  };

  const logout = async () => {
    setUser(null);
    localStorage.removeItem(USER_STORAGE_KEY);
    localStorage.removeItem(TOKEN_STORAGE_KEY);
  };

  const value = {
    user,
    login,
    logout,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}