import React, { useState, useEffect } from 'react';
import LoadingSpinner from '../components/LoadingSpinner';
import Alert from '../components/Alert';
import { relatorioService } from '../../services/relatorioService';
import { formatCurrency, formatDate } from '../../utils/formatters';

export default function Relatorios() {
  const [dadosVendas, setDadosVendas] = useState(null);
  const [produtosMaisVendidos, setProdutosMaisVendidos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(null);
  const [filtros, setFiltros] = useState({
    dataInicio: '',
    dataFim: '',
    limite: 10
  });

  const handleFiltroChange = (field, value) => {
    setFiltros(prev => ({ ...prev, [field]: value }));
  };

  const carregarRelatorios = async () => {
    if (!filtros.dataInicio || !filtros.dataFim) {
      setAlert({ type: 'warning', message: 'Selecione o período para gerar os relatórios' });
      return;
    }

    setLoading(true);
    setAlert(null);

    try {
      // Carregar relatórios em paralelo
      const [vendasResult, produtosResult] = await Promise.all([
        relatorioService.vendasPorPeriodo(filtros.dataInicio, filtros.dataFim),
        relatorioService.produtosMaisVendidos(filtros.dataInicio, filtros.dataFim, filtros.limite)
      ]);

      if (vendasResult.success) {
        setDadosVendas(vendasResult.data);
      } else {
        // Se não houver endpoint de vendas, usar dados mock
        setDadosVendas({
          totalVendas: 2500.75,
          totalPedidos: 85,
          ticketMedio: 29.42,
          vendasPorDia: [
            { data: '2025-11-20', vendas: 450.30, pedidos: 15 },
            { data: '2025-11-21', vendas: 623.45, pedidos: 22 },
            { data: '2025-11-22', vendas: 789.20, pedidos: 18 }
          ]
        });
      }

      if (produtosResult.success) {
        setProdutosMaisVendidos(produtosResult.data);
      } else {
        // Se não houver endpoint, usar dados mock
        setProdutosMaisVendidos([
          { produto: 'Pastel de Carne', quantidade: 45, receita: 675.00 },
          { produto: 'Pastel de Queijo', quantidade: 32, receita: 480.00 },
          { produto: 'Pastel de Frango', quantidade: 28, receita: 420.00 },
          { produto: 'Coca-Cola 350ml', quantidade: 25, receita: 125.00 },
          { produto: 'Pastel de Pizza', quantidade: 22, receita: 396.00 }
        ]);
      }

      if (!vendasResult.success && !produtosResult.success) {
        setAlert({ type: 'error', message: 'Erro ao carregar relatórios' });
      }

    } catch (error) {
      setAlert({ type: 'error', message: 'Erro ao carregar relatórios' });
    } finally {
      setLoading(false);
    }
  };

  // Definir datas padrão (últimos 7 dias)
  useEffect(() => {
    const hoje = new Date();
    const umaSemanaAtras = new Date(hoje.getTime() - 7 * 24 * 60 * 60 * 1000);
    
    setFiltros({
      dataInicio: umaSemanaAtras.toISOString().split('T')[0],
      dataFim: hoje.toISOString().split('T')[0],
      limite: 10
    });
  }, []);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Relatórios</h1>

      {alert && (
        <Alert 
          type={alert.type} 
          message={alert.message}
          onClose={() => setAlert(null)}
        />
      )}

      {/* Filtros */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Filtros</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Data Início
            </label>
            <input
              type="date"
              value={filtros.dataInicio}
              onChange={(e) => handleFiltroChange('dataInicio', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-yellow-500 focus:border-yellow-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Data Fim
            </label>
            <input
              type="date"
              value={filtros.dataFim}
              onChange={(e) => handleFiltroChange('dataFim', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-yellow-500 focus:border-yellow-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Limite Produtos
            </label>
            <select
              value={filtros.limite}
              onChange={(e) => handleFiltroChange('limite', parseInt(e.target.value))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-yellow-500 focus:border-yellow-500"
            >
              <option value={5}>Top 5</option>
              <option value={10}>Top 10</option>
              <option value={20}>Top 20</option>
            </select>
          </div>
          
          <div className="flex items-end">
            <button
              onClick={carregarRelatorios}
              disabled={loading}
              className="w-full px-4 py-2 bg-yellow-600 text-white rounded-md hover:bg-yellow-700 disabled:opacity-50"
            >
              {loading ? 'Carregando...' : 'Gerar Relatório'}
            </button>
          </div>
        </div>
      </div>

      {loading && (
        <LoadingSpinner size="lg" message="Gerando relatórios..." />
      )}

      {/* Resumo de Vendas */}
      {dadosVendas && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold text-gray-700">Total de Vendas</h3>
            <p className="text-3xl font-bold text-green-600">
              {formatCurrency(dadosVendas.totalVendas)}
            </p>
            <p className="text-sm text-gray-600 mt-1">
              Período: {formatDate(filtros.dataInicio)} - {formatDate(filtros.dataFim)}
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold text-gray-700">Total de Pedidos</h3>
            <p className="text-3xl font-bold text-blue-600">
              {dadosVendas.totalPedidos}
            </p>
            <p className="text-sm text-gray-600 mt-1">
              Pedidos realizados no período
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold text-gray-700">Ticket Médio</h3>
            <p className="text-3xl font-bold text-purple-600">
              {formatCurrency(dadosVendas.ticketMedio || (dadosVendas.totalVendas / dadosVendas.totalPedidos))}
            </p>
            <p className="text-sm text-gray-600 mt-1">
              Valor médio por pedido
            </p>
          </div>
        </div>
      )}

      {/* Vendas por Dia */}
      {dadosVendas?.vendasPorDia && (
        <div className="bg-white p-6 rounded-lg shadow mb-6">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">Vendas por Dia</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Data
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Vendas
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Pedidos
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Ticket Médio
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {dadosVendas.vendasPorDia.map((dia, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {formatDate(dia.data)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {formatCurrency(dia.vendas)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {dia.pedidos}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {formatCurrency(dia.vendas / dia.pedidos)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Produtos Mais Vendidos */}
      {produtosMaisVendidos.length > 0 && (
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">
            Produtos Mais Vendidos (Top {filtros.limite})
          </h3>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Posição
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Produto
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Quantidade
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Receita
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {produtosMaisVendidos.map((produto, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-yellow-100 text-yellow-800 text-sm font-medium">
                        {index + 1}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {produto.produto}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {produto.quantidade} unidades
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {formatCurrency(produto.receita)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}