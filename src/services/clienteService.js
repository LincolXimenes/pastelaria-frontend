import api from './api';

export const clienteService = {
  // Listar todos os clientes
  listar: async () => {
    try {
      const response = await api.get('/api/clientes');
      return { success: true, data: response.data };
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data?.msg || 'Erro ao carregar clientes' 
      };
    }
  },

  // Buscar cliente por ID
  buscarPorId: async (id) => {
    try {
      const response = await api.get(`/api/clientes/${id}`);
      return { success: true, data: response.data };
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data?.msg || 'Erro ao buscar cliente' 
      };
    }
  },

  // Criar novo cliente
  criar: async (cliente) => {
    try {
      const response = await api.post('/api/clientes', cliente);
      return { success: true, data: response.data };
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data?.msg || 'Erro ao criar cliente' 
      };
    }
  },

  // Atualizar cliente
  atualizar: async (id, cliente) => {
    try {
      const response = await api.put(`/api/clientes/${id}`, cliente);
      return { success: true, data: response.data };
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data?.msg || 'Erro ao atualizar cliente' 
      };
    }
  },

  // Deletar cliente
  deletar: async (id) => {
    try {
      await api.delete(`/api/clientes/${id}`);
      return { success: true };
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data?.msg || 'Erro ao deletar cliente' 
      };
    }
  }
};