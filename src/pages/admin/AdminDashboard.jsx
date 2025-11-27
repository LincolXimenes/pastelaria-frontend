import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function AdminDashboard() {
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(true);

  // Dados mock do dashboard
  const statsMock = {
    vendas_hoje: { valor: 1250.50, variacao: 12.5 },
    pedidos_hoje: { valor: 45, variacao: 8.2 },
    produtos_cadastrados: { valor: 24, variacao: 0 },
    clientes_ativos: { valor: 156, variacao: 5.1 }
  };

  const pedidosRecentes = [
    { id: 1, numero: '#001', cliente: 'João Silva', total: 43.50, status: 'preparando', tempo: '10 min' },
    { id: 2, numero: '#002', cliente: 'Maria Santos', total: 28.00, status: 'entregue', tempo: '25 min' },
    { id: 3, numero: '#003', cliente: 'Pedro Costa', total: 55.00, status: 'pendente', tempo: '2 min' },
    { id: 4, numero: '#004', cliente: 'Ana Paula', total: 37.50, status: 'confirmado', tempo: '15 min' },
    { id: 5, numero: '#005', cliente: 'Carlos Lima', total: 62.00, status: 'preparando', tempo: '5 min' },
    { id: 6, numero: '#006', cliente: 'Julia Rosa', total: 34.50, status: 'pendente', tempo: '1 min' }
  ];

  const produtosMaisVendidos = [
    { nome: 'Pastel de Carne', vendas: 35, receita: 542.50, categoria: 'pasteis' },
    { nome: 'Pastel de Queijo', vendas: 28, receita: 350.00, categoria: 'pasteis' },
    { nome: 'Pastel de Frango', vendas: 22, receita: 352.00, categoria: 'pasteis' },
    { nome: 'Coca-Cola 350ml', vendas: 45, receita: 225.00, categoria: 'bebidas' },
    { nome: 'Suco de Laranja', vendas: 18, receita: 117.00, categoria: 'bebidas' },
    { nome: 'Pudim de Leite', vendas: 12, receita: 96.00, categoria: 'sobremesas' }
  ];

  const alertasOperacionais = [
    { tipo: 'info', titulo: 'Meta de Vendas', descricao: 'Você já atingiu 78% da meta diária!', tempo: '2 min' },
    { tipo: 'warning', titulo: 'Estoque Baixo', descricao: 'Massa para pastel com apenas 5 unidades', tempo: '15 min' },
    { tipo: 'success', titulo: 'Avaliação Positiva', descricao: 'Nova avaliação 5 estrelas recebida!', tempo: '1 hora' },
    { tipo: 'info', titulo: 'Novo Pedido', descricao: 'Pedido #007 aguardando confirmação', tempo: '30 seg' }
  ];

  useEffect(() => {
    setTimeout(() => {
      setStats(statsMock);
      setLoading(false);
    }, 1000);
  }, []);

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const getStatusColor = (status) => {
    const colors = {
      pendente: 'bg-yellow-100 text-yellow-800 border-yellow-200',
      confirmado: 'bg-blue-100 text-blue-800 border-blue-200',
      preparando: 'bg-orange-100 text-orange-800 border-orange-200',
      entregue: 'bg-green-100 text-green-800 border-green-200',
      cancelado: 'bg-red-100 text-red-800 border-red-200'
    };
    return colors[status] || 'bg-gray-100 text-gray-800 border-gray-200';
  };

  const getStatusIcon = (status) => {
    const icons = {
      pendente: '⏳',
      confirmado: '✅',
      preparando: '👨‍🍳',
      entregue: '📦',
      cancelado: '❌'
    };
    return icons[status] || '📋';
  };

  const getAlertIcon = (tipo) => {
    const icons = {
      info: '💡',
      warning: '⚠️',
      success: '🎉',
      error: '❌'
    };
    return icons[tipo] || 'ℹ️';
  };

  const getAlertColor = (tipo) => {
    const colors = {
      info: 'bg-blue-50 border-blue-200 text-blue-800',
      warning: 'bg-yellow-50 border-yellow-200 text-yellow-800',
      success: 'bg-green-50 border-green-200 text-green-800',
      error: 'bg-red-50 border-red-200 text-red-800'
    };
    return colors[tipo] || 'bg-gray-50 border-gray-200 text-gray-800';
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-96">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-yellow-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Carregando dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-10">
      {/* Header Otimizado */}
      <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-2xl p-8 text-white">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h1 className="text-4xl lg:text-5xl font-bold mb-2">Dashboard Administrativo</h1>
            <p className="text-xl text-yellow-100">Bem-vindo! Aqui está o resumo das operações de hoje</p>
          </div>
          <div className="mt-6 lg:mt-0 text-right">
            <div className="text-3xl lg:text-4xl font-bold">{new Date().toLocaleDateString('pt-BR')}</div>
            <div className="text-lg text-yellow-100">{new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}</div>
          </div>
        </div>
      </div>

      {/* Cards de Estatísticas - GRID EXPANDIDO */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
        {/* Vendas Hoje */}
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100 hover:shadow-2xl transition-all duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-lg font-medium text-gray-600">Vendas Hoje</p>
              <p className="text-4xl font-bold text-gray-900 mt-2">{formatCurrency(stats.vendas_hoje.valor)}</p>
            </div>
            <div className="text-5xl">💰</div>
          </div>
          <div className="mt-6 flex items-center">
            <span className={`text-lg font-semibold ${stats.vendas_hoje.variacao >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {stats.vendas_hoje.variacao >= 0 ? '↗️' : '↘️'} {Math.abs(stats.vendas_hoje.variacao)}%
            </span>
            <span className="text-lg text-gray-600 ml-3">vs ontem</span>
          </div>
        </div>

        {/* Pedidos Hoje */}
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100 hover:shadow-2xl transition-all duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-lg font-medium text-gray-600">Pedidos Hoje</p>
              <p className="text-4xl font-bold text-gray-900 mt-2">{stats.pedidos_hoje.valor}</p>
            </div>
            <div className="text-5xl">📦</div>
          </div>
          <div className="mt-6 flex items-center">
            <span className={`text-lg font-semibold ${stats.pedidos_hoje.variacao >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {stats.pedidos_hoje.variacao >= 0 ? '↗️' : '↘️'} {Math.abs(stats.pedidos_hoje.variacao)}%
            </span>
            <span className="text-lg text-gray-600 ml-3">vs ontem</span>
          </div>
        </div>

        {/* Produtos */}
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100 hover:shadow-2xl transition-all duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-lg font-medium text-gray-600">Produtos</p>
              <p className="text-4xl font-bold text-gray-900 mt-2">{stats.produtos_cadastrados.valor}</p>
            </div>
            <div className="text-5xl">🥟</div>
          </div>
          <div className="mt-6">
            <Link to="/admin/produtos" className="text-lg text-yellow-600 hover:text-yellow-700 font-semibold">
              Gerenciar produtos →
            </Link>
          </div>
        </div>

        {/* Clientes */}
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100 hover:shadow-2xl transition-all duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-lg font-medium text-gray-600">Clientes Ativos</p>
              <p className="text-4xl font-bold text-gray-900 mt-2">{stats.clientes_ativos.valor}</p>
            </div>
            <div className="text-5xl">👥</div>
          </div>
          <div className="mt-6 flex items-center">
            <span className={`text-lg font-semibold ${stats.clientes_ativos.variacao >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {stats.clientes_ativos.variacao >= 0 ? '↗️' : '↘️'} {Math.abs(stats.clientes_ativos.variacao)}%
            </span>
            <span className="text-lg text-gray-600 ml-3">este mês</span>
          </div>
        </div>
      </div>

      {/* LAYOUT EM COLUNAS PARA TELAS GRANDES */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-10">
        
        {/* COLUNA ESQUERDA - Pedidos Recentes (8 colunas) */}
        <div className="xl:col-span-8">
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100">
            <div className="p-8 border-b border-gray-100">
              <div className="flex items-center justify-between">
                <h3 className="text-2xl font-bold text-gray-900">📋 Pedidos Recentes</h3>
                <Link to="/admin/pedidos" className="text-lg text-yellow-600 hover:text-yellow-700 font-semibold">
                  Ver todos →
                </Link>
              </div>
            </div>
            
            <div className="p-8">
              <div className="space-y-6">
                {pedidosRecentes.map(pedido => (
                  <div key={pedido.id} className="flex items-center justify-between p-6 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                    <div className="flex items-center space-x-6">
                      <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                        <span className="text-xl font-bold text-yellow-600">{getStatusIcon(pedido.status)}</span>
                      </div>
                      <div>
                        <p className="text-xl font-bold text-gray-900">{pedido.numero}</p>
                        <p className="text-lg text-gray-600">{pedido.cliente}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-6">
                      <span className={`px-4 py-2 rounded-lg text-sm font-semibold border ${getStatusColor(pedido.status)}`}>
                        {pedido.status.charAt(0).toUpperCase() + pedido.status.slice(1)}
                      </span>
                      <div className="text-right">
                        <p className="text-xl font-bold text-gray-900">{formatCurrency(pedido.total)}</p>
                        <p className="text-lg text-gray-600">{pedido.tempo}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* COLUNA DIREITA - Produtos + Alertas (4 colunas) */}
        <div className="xl:col-span-4 space-y-8">
          
          {/* Produtos Mais Vendidos */}
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100">
            <div className="p-6 border-b border-gray-100">
              <h3 className="text-xl font-bold text-gray-900">🏆 Mais Vendidos Hoje</h3>
            </div>
            
            <div className="p-6">
              <div className="space-y-5">
                {produtosMaisVendidos.slice(0, 4).map((produto, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center text-lg font-bold text-white ${
                        index === 0 ? 'bg-yellow-500' : 
                        index === 1 ? 'bg-gray-400' : 
                        index === 2 ? 'bg-orange-500' : 'bg-gray-300'
                      }`}>
                        {index + 1}
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">{produto.nome}</p>
                        <p className="text-sm text-gray-600">{produto.vendas} vendas</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-gray-900">{formatCurrency(produto.receita)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Alertas Operacionais */}
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100">
            <div className="p-6 border-b border-gray-100">
              <h3 className="text-xl font-bold text-gray-900">🔔 Alertas</h3>
            </div>
            
            <div className="p-6">
              <div className="space-y-4">
                {alertasOperacionais.map((alerta, index) => (
                  <div key={index} className={`p-4 rounded-lg border ${getAlertColor(alerta.tipo)}`}>
                    <div className="flex items-start space-x-3">
                      <span className="text-xl">{getAlertIcon(alerta.tipo)}</span>
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold">{alerta.titulo}</p>
                        <p className="text-sm opacity-80">{alerta.descricao}</p>
                        <p className="text-xs mt-1 opacity-60">{alerta.tempo}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Actions em Grid - EXPANDIDO */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
        <Link 
          to="/admin/produtos" 
          className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-white rounded-2xl p-8 hover:from-yellow-600 hover:to-yellow-700 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:-translate-y-1"
        >
          <div className="flex items-center space-x-6">
            <div className="text-5xl">🥟</div>
            <div>
              <h3 className="text-2xl font-bold">Gerenciar Produtos</h3>
              <p className="text-lg text-yellow-100 mt-2">Adicionar, editar ou remover produtos do cardápio</p>
            </div>
          </div>
        </Link>

        <Link 
          to="/admin/pedidos" 
          className="bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-2xl p-8 hover:from-blue-600 hover:to-blue-700 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:-translate-y-1"
        >
          <div className="flex items-center space-x-6">
            <div className="text-5xl">📦</div>
            <div>
              <h3 className="text-2xl font-bold">Gerenciar Pedidos</h3>
              <p className="text-lg text-blue-100 mt-2">Acompanhar e atualizar status dos pedidos</p>
            </div>
          </div>
        </Link>

        <Link 
          to="/admin/relatorios" 
          className="bg-gradient-to-r from-green-500 to-green-600 text-white rounded-2xl p-8 hover:from-green-600 hover:to-green-700 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:-translate-y-1"
        >
          <div className="flex items-center space-x-6">
            <div className="text-5xl">📈</div>
            <div>
              <h3 className="text-2xl font-bold">Ver Relatórios</h3>
              <p className="text-lg text-green-100 mt-2">Análises detalhadas e métricas de performance</p>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}