import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { relatorioService } from '../../services/relatorioService';

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState(null);

  const carregarDashboard = async () => {
    setLoading(true);
    setErro(null);
    const result = await relatorioService.dashboard();
    if (result.success) {
      setStats(result.data);
    } else {
      setErro(result.error);
    }
    setLoading(false);
  };

  useEffect(() => {
    carregarDashboard();
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
      <div className="flex justify-center items-center min-h-64">
        <div className="text-center">
          <div className="spinner w-10 h-10 border-2 mx-auto"></div>
          <p className="mt-3 text-sm text-gray-500 dark:text-gray-400">Carregando dashboard…</p>
        </div>
      </div>
    );
  }

  if (erro) {
    return (
      <div className="flex justify-center items-center min-h-64">
        <div className="text-center">
          <p className="text-4xl mb-3">⚠️</p>
          <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-1">Erro ao carregar dashboard</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">{erro}</p>
          <button onClick={carregarDashboard} className="btn-primary">
            Tentar novamente
          </button>
        </div>
      </div>
    );
  }

  const vendasHoje = stats?.vendas_hoje ?? { valor: 0, variacao: 0 };
  const pedidosHoje = stats?.pedidos_hoje ?? { valor: 0, variacao: 0 };
  const produtosCadastrados = stats?.produtos_cadastrados ?? { valor: 0, variacao: 0 };
  const clientesAtivos = stats?.clientes_ativos ?? { valor: 0, variacao: 0 };
  const pedidosRecentes = stats?.pedidos_recentes ?? [];
  const produtosMaisVendidos = stats?.produtos_mais_vendidos ?? [];
  const alertasOperacionais = stats?.alertas ?? [];

  return (
    <div className="space-y-6">
      {/* Banner */}
      <div className="page-banner">
        <div>
          <h1 className="page-title">Dashboard Administrativo</h1>
          <p className="page-subtitle">Resumo das operações de hoje</p>
        </div>
        <div className="text-right">
          <p className="text-sm font-semibold text-gray-900 dark:text-white">{new Date().toLocaleDateString('pt-BR', { weekday: 'long', day: '2-digit', month: 'long' })}</p>
          <p className="text-xs text-gray-500 dark:text-gray-400">{new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}</p>
        </div>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <div className="stat-card">
          <div>
            <p className="text-xs font-medium text-gray-500 dark:text-gray-400">Vendas Hoje</p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{formatCurrency(vendasHoje.valor)}</p>
            <p className={`text-xs mt-1 ${vendasHoje.variacao >= 0 ? 'text-green-600' : 'text-red-500'}`}>
              {vendasHoje.variacao >= 0 ? '+' : ''}{vendasHoje.variacao}% vs ontem
            </p>
          </div>
          <span className="text-3xl">💰</span>
        </div>
        <div className="stat-card">
          <div>
            <p className="text-xs font-medium text-gray-500 dark:text-gray-400">Pedidos Hoje</p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{pedidosHoje.valor}</p>
            <p className={`text-xs mt-1 ${pedidosHoje.variacao >= 0 ? 'text-green-600' : 'text-red-500'}`}>
              {pedidosHoje.variacao >= 0 ? '+' : ''}{pedidosHoje.variacao}% vs ontem
            </p>
          </div>
          <span className="text-3xl">📦</span>
        </div>
        <div className="stat-card">
          <div>
            <p className="text-xs font-medium text-gray-500 dark:text-gray-400">Produtos</p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{produtosCadastrados.valor}</p>
            <Link to="/admin/produtos" className="text-xs text-amber-600 dark:text-amber-400 hover:underline">
              Gerenciar →
            </Link>
          </div>
          <span className="text-3xl">🥟</span>
        </div>
        <div className="stat-card">
          <div>
            <p className="text-xs font-medium text-gray-500 dark:text-gray-400">Clientes Ativos</p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{clientesAtivos.valor}</p>
            <p className={`text-xs mt-1 ${clientesAtivos.variacao >= 0 ? 'text-green-600' : 'text-red-500'}`}>
              {clientesAtivos.variacao >= 0 ? '+' : ''}{clientesAtivos.variacao}% este mês
            </p>
          </div>
          <span className="text-3xl">👥</span>
        </div>
      </div>

      {/* Colunas principais */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
        
        {/* Pedidos Recentes */}
        <div className="xl:col-span-8">
          <div className="section-card">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white">Pedidos Recentes</h3>
              <Link to="/admin/pedidos" className="text-xs text-amber-600 dark:text-amber-400 hover:underline">
                Ver todos →
              </Link>
            </div>
            <div className="space-y-2">
              {pedidosRecentes.map(pedido => (
                <div key={pedido.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                  <div className="flex items-center gap-3">
                    <span className="text-lg">{getStatusIcon(pedido.status)}</span>
                    <div>
                      <p className="text-sm font-semibold text-gray-900 dark:text-white">{pedido.numero}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">{pedido.cliente}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`badge ${getStatusColor(pedido.status)}`}>
                      {pedido.status.charAt(0).toUpperCase() + pedido.status.slice(1)}
                    </span>
                    <div className="text-right">
                      <p className="text-sm font-semibold text-gray-900 dark:text-white">{formatCurrency(pedido.total)}</p>
                      <p className="text-xs text-gray-400">{pedido.tempo}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Lateral direita */}
        <div className="xl:col-span-4 space-y-4">
          
          {/* Mais vendidos */}
          <div className="section-card">
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-4">🏆 Mais Vendidos</h3>
            <div className="space-y-3">
              {produtosMaisVendidos.slice(0, 4).map((produto, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white ${
                      index === 0 ? 'bg-amber-500' : index === 1 ? 'bg-gray-400' : index === 2 ? 'bg-orange-400' : 'bg-gray-300'
                    }`}>{index + 1}</span>
                    <div>
                      <p className="text-sm font-medium text-gray-900 dark:text-white">{produto.nome}</p>
                      <p className="text-xs text-gray-400">{produto.vendas} vendas</p>
                    </div>
                  </div>
                  <p className="text-sm font-semibold text-gray-900 dark:text-white">{formatCurrency(produto.receita)}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Alertas */}
          <div className="section-card">
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-4">🔔 Alertas</h3>
            <div className="space-y-2">
              {alertasOperacionais.map((alerta, index) => (
                <div key={index} className={`p-3 rounded-lg border text-sm ${getAlertColor(alerta.tipo)}`}>
                  <div className="flex items-start gap-2">
                    <span>{getAlertIcon(alerta.tipo)}</span>
                    <div>
                      <p className="font-medium">{alerta.titulo}</p>
                      <p className="text-xs opacity-80 mt-0.5">{alerta.descricao}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Links rápidos */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Link to="/admin/produtos" className="card card-hover flex items-center gap-4 p-5">
          <span className="text-3xl">🥟</span>
          <div>
            <p className="text-sm font-semibold text-gray-900 dark:text-white">Produtos</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">Gerenciar cardápio</p>
          </div>
        </Link>
        <Link to="/admin/pedidos" className="card card-hover flex items-center gap-4 p-5">
          <span className="text-3xl">📦</span>
          <div>
            <p className="text-sm font-semibold text-gray-900 dark:text-white">Pedidos</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">Acompanhar status</p>
          </div>
        </Link>
        <Link to="/admin/relatorios" className="card card-hover flex items-center gap-4 p-5">
          <span className="text-3xl">📈</span>
          <div>
            <p className="text-sm font-semibold text-gray-900 dark:text-white">Relatórios</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">Métricas e análises</p>
          </div>
        </Link>
      </div>
    </div>
  );
}