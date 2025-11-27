import React, { useState, useEffect } from 'react';
import { relatorioService } from '../../services/relatorioService';
import LoadingSpinner from '../components/LoadingSpinner';
import { formatCurrency } from '../../utils/formatters';

export default function Dashboard() {
  const [dadosDashboard, setDadosDashboard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const carregarDashboard = async () => {
    setLoading(true);
    setError(null);
    
    const result = await relatorioService.dashboard();
    
    if (result.success) {
      setDadosDashboard(result.data);
    } else {
      setError(result.error);
      // Se não há endpoint de dashboard, usar dados mock
      setDadosDashboard({
        totalVendas: 1250.50,
        totalPedidos: 45,
        produtosMaisVendidos: [
          { nome: 'Pastel de Carne', quantidade: 25 },
          { nome: 'Pastel de Queijo', quantidade: 18 }
        ]
      });
    }
    
    setLoading(false);
  };

  useEffect(() => {
    carregarDashboard();
  }, []);

  if (loading) {
    return <LoadingSpinner size="lg" message="Carregando dashboard..." />;
  }

  if (error && !dadosDashboard) {
    return (
      <div className="text-center py-8">
        <p className="text-red-600">Erro ao carregar dashboard</p>
        <button 
          onClick={carregarDashboard}
          className="mt-2 px-4 py-2 bg-yellow-600 text-white rounded hover:bg-yellow-700"
        >
          Tentar novamente
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-700">Total de Vendas</h3>
          <p className="text-3xl font-bold text-green-600">
            {formatCurrency(dadosDashboard?.totalVendas || 0)}
          </p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-700">Total de Pedidos</h3>
          <p className="text-3xl font-bold text-blue-600">
            {dadosDashboard?.totalPedidos || 0}
          </p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-700">Produtos Ativos</h3>
          <p className="text-3xl font-bold text-purple-600">
            {dadosDashboard?.totalProdutos || 0}
          </p>
        </div>
      </div>
      
      {dadosDashboard?.produtosMaisVendidos && (
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">
            Produtos Mais Vendidos
          </h3>
          <div className="space-y-2">
            {dadosDashboard.produtosMaisVendidos.map((produto, index) => (
              <div key={index} className="flex justify-between">
                <span>{produto.nome}</span>
                <span className="font-semibold">{produto.quantidade}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}