import api from './api';

export const pedidoService = {
  // Listar todos os pedidos
  listar: async () => {
    try {
      const response = await api.get('/api/pedidos');
      return { success: true, data: response.data };
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data?.msg || 'Erro ao carregar pedidos' 
      };
    }
  },

  // Buscar pedido por ID
  buscarPorId: async (id) => {
    try {
      const response = await api.get(`/api/pedidos/${id}`);
      return { success: true, data: response.data };
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data?.msg || 'Erro ao buscar pedido' 
      };
    }
  },

  // Criar novo pedido
  criar: async (pedido) => {
    try {
      const response = await api.post('/api/pedidos', pedido);
      return { success: true, data: response.data };
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data?.msg || 'Erro ao criar pedido' 
      };
    }
  },

  // Atualizar pedido
  atualizar: async (id, pedido) => {
    try {
      const response = await api.put(`/api/pedidos/${id}`, pedido);
      return { success: true, data: response.data };
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data?.msg || 'Erro ao atualizar pedido' 
      };
    }
  },

  // Atualizar status do pedido
  atualizarStatus: async (id, status) => {
    try {
      const response = await api.patch(`/api/pedidos/${id}/status`, { status });
      return { success: true, data: response.data };
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data?.msg || 'Erro ao atualizar status' 
      };
    }
  },

  // Deletar pedido
  deletar: async (id) => {
    try {
      await api.delete(`/api/pedidos/${id}`);
      return { success: true };
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data?.msg || 'Erro ao deletar pedido' 
      };
    }
  }
};