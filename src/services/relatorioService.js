import api from './api';

export const relatorioService = {
  // Relatório de vendas por período
  vendasPorPeriodo: async (dataInicio, dataFim) => {
    try {
      const response = await api.get('/api/relatorios/vendas', {
        params: { dataInicio, dataFim }
      });
      return { success: true, data: response.data };
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data?.msg || 'Erro ao carregar relatório de vendas' 
      };
    }
  },

  // Produtos mais vendidos
  produtosMaisVendidos: async (dataInicio, dataFim, limite = 10) => {
    try {
      const response = await api.get('/api/relatorios/produtos-mais-vendidos', {
        params: { dataInicio, dataFim, limite }
      });
      return { success: true, data: response.data };
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data?.msg || 'Erro ao carregar produtos mais vendidos' 
      };
    }
  },

  // Dashboard com dados gerais
  dashboard: async () => {
    try {
      const response = await api.get('/api/relatorios/dashboard');
      return { success: true, data: response.data };
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data?.msg || 'Erro ao carregar dashboard' 
      };
    }
  }
};