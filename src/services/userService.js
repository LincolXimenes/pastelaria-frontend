import api from './api';

export const userService = {
  // Listar todos os usuários
  listar: async () => {
    try {
      const response = await api.get('/api/users');
      return { success: true, data: response.data };
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data?.msg || 'Erro ao carregar usuários' 
      };
    }
  },

  // Buscar usuário por ID
  buscarPorId: async (id) => {
    try {
      const response = await api.get(`/api/users/${id}`);
      return { success: true, data: response.data };
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data?.msg || 'Erro ao buscar usuário' 
      };
    }
  },

  // Criar novo usuário
  criar: async (usuario) => {
    try {
      const response = await api.post('/api/users/register', usuario);
      return { success: true, data: response.data };
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data?.msg || 'Erro ao criar usuário' 
      };
    }
  },

  // Atualizar usuário
  atualizar: async (id, usuario) => {
    try {
      const response = await api.put(`/api/users/${id}`, usuario);
      return { success: true, data: response.data };
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data?.msg || 'Erro ao atualizar usuário' 
      };
    }
  },

  // Deletar usuário
  deletar: async (id) => {
    try {
      await api.delete(`/api/users/${id}`);
      return { success: true };
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data?.msg || 'Erro ao deletar usuário' 
      };
    }
  }
};