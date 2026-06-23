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

function generateIdempotencyKey() {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID();
  }

  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

export const pedidoService = {
  // Listar todos os pedidos
  listar: async (params = {}) => {
    try {
      const response = await api.get('/api/pedidos', { params });
      const normalized = normalizeListResponse(response.data);
      return { success: true, data: normalized.data, pagination: normalized.pagination };
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
  criar: async (pedido, options = {}) => {
    try {
      const idempotencyKey = options.idempotencyKey || generateIdempotencyKey();
      const response = await api.post('/api/pedidos', pedido, {
        headers: {
          'Idempotency-Key': idempotencyKey
        }
      });

      return {
        success: true,
        data: response.data,
        idempotencyKey,
        replayed: response.headers?.['idempotency-replayed'] === 'true'
      };
    } catch (error) {
      const status = error.response?.status;
      const apiMsg = error.response?.data?.msg;

      if (status === 409) {
        return {
          success: false,
          error: apiMsg || 'Chave de idempotência já utilizada com payload diferente.',
          conflict: true
        };
      }

      if (status === 429) {
        return {
          success: false,
          error: apiMsg || 'Muitas tentativas de criação de pedido. Aguarde alguns minutos.',
          rateLimited: true
        };
      }

      return { 
        success: false, 
        error: apiMsg || 'Erro ao criar pedido' 
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