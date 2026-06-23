import api from './api';

function normalizeListResponse(payload) {
  if (Array.isArray(payload)) {
    return {
      data: payload,
      pagination: null
    };
  }

  if (payload && Array.isArray(payload.data)) {
    return {
      data: payload.data,
      pagination: payload.pagination || null
    };
  }

  return {
    data: [],
    pagination: null
  };
}

export const produtoService = {
  // Listar todos os produtos
  listar: async (params = {}) => {
    try {
      const response = await api.get('/api/produtos', { params });
      const normalized = normalizeListResponse(response.data);
      return { success: true, data: normalized.data, pagination: normalized.pagination };
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data?.msg || 'Erro ao carregar produtos' 
      };
    }
  },

  // Buscar produto por ID
  buscarPorId: async (id) => {
    try {
      const response = await api.get(`/api/produtos/${id}`);
      return { success: true, data: response.data };
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data?.msg || 'Erro ao buscar produto' 
      };
    }
  },

  // Criar novo produto
  criar: async (produto) => {
    try {
      const response = await api.post('/api/produtos', produto);
      return { success: true, data: response.data };
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data?.msg || 'Erro ao criar produto' 
      };
    }
  },

  // Atualizar produto
  atualizar: async (id, produto) => {
    try {
      const response = await api.put(`/api/produtos/${id}`, produto);
      return { success: true, data: response.data };
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data?.msg || 'Erro ao atualizar produto' 
      };
    }
  },

  // Deletar produto
  deletar: async (id) => {
    try {
      await api.delete(`/api/produtos/${id}`);
      return { success: true };
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data?.msg || 'Erro ao deletar produto' 
      };
    }
  }
};