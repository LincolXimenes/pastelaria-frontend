import React, { createContext, useContext, useState, useEffect } from 'react';

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
    const savedUser = localStorage.getItem('admin_user');
    const savedToken = localStorage.getItem('admin_token');
    
    if (savedUser && savedToken) {
      try {
        const userData = JSON.parse(savedUser);
        setUser(userData);
        console.log('Usuário encontrado no localStorage:', userData);
      } catch (error) {
        console.error('Erro ao recuperar usuário do localStorage:', error);
        localStorage.removeItem('admin_user');
        localStorage.removeItem('admin_token');
      }
    }
    
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      console.log('Tentando fazer login com:', email);

      // Mock login - credenciais hardcoded
      if (email === 'admin@pastelaria.com' && password === '123456') {
        const userData = {
          id: 1,
          email: email,
          nome: 'Administrador',
          role: 'admin'
        };
        
        const token = 'mock_token_' + Date.now();
        
        // Salvar no state
        setUser(userData);
        
        // Salvar no localStorage para persistir
        localStorage.setItem('admin_user', JSON.stringify(userData));
        localStorage.setItem('admin_token', token);
        
        console.log('Login mock bem-sucedido!');
        return { success: true, user: userData };
      }

      // Tentar login no backend se as credenciais não forem as padrão
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/users/login`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, password }),
        });

        if (response.ok) {
          const data = await response.json();
          
          const userData = {
            id: data.user.id,
            email: data.user.email,
            nome: data.user.nome || 'Administrador',
            role: 'admin'
          };
          
          setUser(userData);
          localStorage.setItem('admin_user', JSON.stringify(userData));
          localStorage.setItem('admin_token', data.token);
          
          console.log('Login backend bem-sucedido!');
          return { success: true, user: userData };
        } else {
          const errorData = await response.json();
          console.log('Erro do backend:', errorData);
          return { success: false, error: errorData.message || 'Erro no servidor' };
        }
      } catch (backendError) {
        console.log('Backend indisponível, tentativa de login falhou');
        return { success: false, error: 'Email ou senha inválidos' };
      }

    } catch (error) {
      console.error('Erro no login:', error);
      return { success: false, error: 'Erro interno. Tente novamente.' };
    }
  };

  const logout = async () => {
    setUser(null);
    localStorage.removeItem('admin_user');
    localStorage.removeItem('admin_token');
    console.log('Logout realizado');
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