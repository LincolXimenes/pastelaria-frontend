import React, { useState, useEffect } from 'react';
import { pedidoService } from '../../services/pedidoService';

export default function AdminPedidos() {
  const [pedidos, setPedidos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState(null);
  const [filtroStatus, setFiltroStatus] = useState('todos');
  const [filtroData, setFiltroData] = useState('hoje');

  const statusConfig = {
    pendente: { label: 'Pendente', color: 'bg-yellow-100 text-yellow-800', icon: '⏳' },
    confirmado: { label: 'Confirmado', color: 'bg-blue-100 text-blue-800', icon: '✅' },
    preparando: { label: 'Preparando', color: 'bg-orange-100 text-orange-800', icon: '👨‍🍳' },
    saiu_entrega: { label: 'Saiu para Entrega', color: 'bg-purple-100 text-purple-800', icon: '🚚' },
    entregue: { label: 'Entregue', color: 'bg-green-100 text-green-800', icon: '📦' },
    cancelado: { label: 'Cancelado', color: 'bg-red-100 text-red-800', icon: '❌' }
  };

  const carregarPedidos = async () => {
    setLoading(true);
    setErro(null);
    const params = {};
    if (filtroStatus !== 'todos') params.status = filtroStatus;
    if (filtroData === 'hoje') {
      params.data = new Date().toISOString().split('T')[0];
    } else if (filtroData === 'semana') {
      const d = new Date();
      d.setDate(d.getDate() - 7);
      params.dataInicio = d.toISOString().split('T')[0];
    } else if (filtroData === 'mes') {
      const d = new Date();
      d.setDate(1);
      params.dataInicio = d.toISOString().split('T')[0];
    }
    const result = await pedidoService.listar(params);
    if (result.success) {
      setPedidos(result.data);
    } else {
      setErro(result.error);
    }
    setLoading(false);
  };

  useEffect(() => {
    carregarPedidos();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filtroStatus, filtroData]);

  const pedidosFiltrados = pedidos;

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const atualizarStatus = async (id, novoStatus) => {
    const result = await pedidoService.atualizarStatus(id, novoStatus);
    if (result.success) {
      setPedidos(pedidos.map(pedido =>
        (pedido._id || pedido.id) === id
          ? { ...pedido, status: novoStatus }
          : pedido
      ));
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-64">
        <div className="spinner w-8 h-8 border-2"></div>
      </div>
    );
  }

  if (erro) {
    return (
      <div className="flex justify-center items-center min-h-64">
        <div className="text-center">
          <p className="text-4xl mb-3">⚠️</p>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">{erro}</p>
          <button onClick={carregarPedidos} className="btn-primary">Tentar novamente</button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Banner */}
      <div className="page-banner">
        <div>
          <h1 className="page-title">Pedidos</h1>
          <p className="page-subtitle">Acompanhe e gerencie todos os pedidos</p>
        </div>
        <span className="text-sm text-gray-500 dark:text-gray-400">
          {pedidosFiltrados.length} pedido(s)
        </span>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="stat-card">
          <div>
            <p className="text-xs text-gray-500 dark:text-gray-400">Total</p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">{pedidos.length}</p>
          </div>
          <span className="text-2xl">📊</span>
        </div>
        <div className="stat-card">
          <div>
            <p className="text-xs text-gray-500 dark:text-gray-400">Pendentes</p>
            <p className="text-2xl font-bold text-amber-500">{pedidos.filter(p => p.status === 'pendente').length}</p>
          </div>
          <span className="text-2xl">⏳</span>
        </div>
        <div className="stat-card">
          <div>
            <p className="text-xs text-gray-500 dark:text-gray-400">Em preparo</p>
            <p className="text-2xl font-bold text-orange-500">{pedidos.filter(p => p.status === 'preparando').length}</p>
          </div>
          <span className="text-2xl">👨‍🍳</span>
        </div>
        <div className="stat-card">
          <div>
            <p className="text-xs text-gray-500 dark:text-gray-400">Faturamento</p>
            <p className="text-lg font-bold text-green-600">{formatCurrency(pedidos.reduce((t, p) => t + p.total, 0))}</p>
          </div>
          <span className="text-2xl">💰</span>
        </div>
      </div>

      {/* Filtros */}
      <div className="section-card">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1.5">Status</label>
            <select
              value={filtroStatus}
              onChange={(e) => setFiltroStatus(e.target.value)}
              className="input"
            >
              <option value="todos">Todos os status</option>
              {Object.entries(statusConfig).map(([status, config]) => (
                <option key={status} value={status}>{config.icon} {config.label}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1.5">Período</label>
            <select
              value={filtroData}
              onChange={(e) => setFiltroData(e.target.value)}
              className="input"
            >
              <option value="hoje">Hoje</option>
              <option value="semana">Esta semana</option>
              <option value="mes">Este mês</option>
              <option value="todos">Todos os períodos</option>
            </select>
          </div>
        </div>
      </div>

      {/* Pedidos */}
      <div className="space-y-4">
        {pedidosFiltrados.map(pedido => (
          <div key={pedido._id || pedido.id} className="card overflow-hidden">
            {/* Header do pedido */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 p-4 bg-gray-50 dark:bg-gray-800/50 border-b border-gray-100 dark:border-gray-800">
              <div className="flex items-center gap-3">
                <span className="text-xl">{statusConfig[pedido.status].icon}</span>
                <div>
                  <p className="text-sm font-semibold text-gray-900 dark:text-white">{pedido.numero}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{pedido.cliente} • {pedido.data} às {pedido.hora}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className={`badge ${statusConfig[pedido.status].color}`}>
                  {statusConfig[pedido.status].label}
                </span>
                <p className="text-sm font-bold text-gray-900 dark:text-white">{formatCurrency(pedido.total)}</p>
              </div>
            </div>

            {/* Conteúdo */}
            <div className="p-4">
              <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                {/* Itens */}
                <div className="xl:col-span-2">
                  <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-2">ITENS</p>
                  <div className="space-y-2">
                    {pedido.itens.map((item, index) => (
                      <div key={index} className="flex justify-between text-sm">
                        <span className="text-gray-700 dark:text-gray-300">{item.quantidade}× {item.nome}</span>
                        <span className="font-medium text-gray-900 dark:text-white">{formatCurrency(item.preco * item.quantidade)}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Informações */}
                <div className="text-xs space-y-2">
                  <div>
                    <p className="font-medium text-gray-500 dark:text-gray-400">Contato</p>
                    <p className="text-gray-700 dark:text-gray-300">{pedido.email}</p>
                    <p className="text-gray-700 dark:text-gray-300">{pedido.telefone}</p>
                  </div>
                  {pedido.endereco && (
                    <div>
                      <p className="font-medium text-gray-500 dark:text-gray-400">Endereço</p>
                      <p className="text-gray-700 dark:text-gray-300">{pedido.endereco}</p>
                    </div>
                  )}
                  {pedido.observacoes && (
                    <div className="p-2 bg-amber-50 dark:bg-amber-500/10 rounded">
                      <p className="font-medium text-amber-700 dark:text-amber-400">Obs</p>
                      <p className="text-amber-700 dark:text-amber-300">{pedido.observacoes}</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Ações */}
              <div className="mt-4 pt-3 border-t border-gray-100 dark:border-gray-800 flex flex-wrap gap-2">
                {pedido.status === 'pendente' && (
                  <button onClick={() => atualizarStatus(pedido._id || pedido.id, 'confirmado')} className="btn-primary py-1.5 px-3 text-xs">Confirmar</button>
                )}
                {pedido.status === 'confirmado' && (
                  <button onClick={() => atualizarStatus(pedido._id || pedido.id, 'preparando')} className="btn-primary py-1.5 px-3 text-xs">Iniciar preparo</button>
                )}
                {pedido.status === 'preparando' && (
                  <button onClick={() => atualizarStatus(pedido._id || pedido.id, 'saiu_entrega')} className="btn-primary py-1.5 px-3 text-xs">Saiu p/ entrega</button>
                )}
                {pedido.status === 'saiu_entrega' && (
                  <button onClick={() => atualizarStatus(pedido._id || pedido.id, 'entregue')} className="btn-primary py-1.5 px-3 text-xs">Marcar entregue</button>
                )}
                {['pendente', 'confirmado'].includes(pedido.status) && (
                  <button onClick={() => atualizarStatus(pedido._id || pedido.id, 'cancelado')} className="btn-danger py-1.5 px-3 text-xs">Cancelar</button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
