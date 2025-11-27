import React, { useState, useEffect } from 'react';

export default function AdminPedidos() {
  const [pedidos, setPedidos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filtroStatus, setFiltroStatus] = useState('todos');
  const [filtroData, setFiltroData] = useState('hoje');

  // Dados mock de pedidos
  const pedidosMock = [
    {
      id: 1, numero: '#001', cliente: 'João Silva', email: 'joao@email.com', telefone: '(11) 99999-0001',
      total: 43.50, status: 'preparando', data: '2025-01-26', hora: '14:30',
      endereco: 'Rua das Flores, 123 - Centro', observacoes: 'Sem cebola',
      itens: [
        { nome: 'Pastel de Carne', quantidade: 2, preco: 15.50 },
        { nome: 'Coca-Cola 350ml', quantidade: 1, preco: 5.00 }
      ]
    },
    {
      id: 2, numero: '#002', cliente: 'Maria Santos', email: 'maria@email.com', telefone: '(11) 99999-0002',
      total: 28.00, status: 'entregue', data: '2025-01-26', hora: '13:45',
      endereco: 'Av. Principal, 456 - Jardim', observacoes: '',
      itens: [
        { nome: 'Pastel de Queijo', quantidade: 2, preco: 12.50 },
        { nome: 'Suco de Laranja', quantidade: 1, preco: 6.50 }
      ]
    },
    {
      id: 3, numero: '#003', cliente: 'Pedro Costa', email: 'pedro@email.com', telefone: '(11) 99999-0003',
      total: 55.00, status: 'pendente', data: '2025-01-26', hora: '15:15',
      endereco: 'Rua Nova, 789 - Vila Nova', observacoes: 'Entregar após 19h',
      itens: [
        { nome: 'Pastel de Pizza', quantidade: 2, preco: 18.00 },
        { nome: 'Pastel de Frango', quantidade: 1, preco: 16.00 },
        { nome: 'Coca-Cola 350ml', quantidade: 1, preco: 5.00 }
      ]
    }
  ];

  const statusConfig = {
    pendente: { label: 'Pendente', color: 'bg-yellow-100 text-yellow-800', icon: '⏳' },
    confirmado: { label: 'Confirmado', color: 'bg-blue-100 text-blue-800', icon: '✅' },
    preparando: { label: 'Preparando', color: 'bg-orange-100 text-orange-800', icon: '👨‍🍳' },
    saiu_entrega: { label: 'Saiu para Entrega', color: 'bg-purple-100 text-purple-800', icon: '🚚' },
    entregue: { label: 'Entregue', color: 'bg-green-100 text-green-800', icon: '📦' },
    cancelado: { label: 'Cancelado', color: 'bg-red-100 text-red-800', icon: '❌' }
  };

  useEffect(() => {
    setTimeout(() => {
      setPedidos(pedidosMock);
      setLoading(false);
    }, 800);
  }, []);

  const pedidosFiltrados = pedidos.filter(pedido => {
    const matchStatus = filtroStatus === 'todos' || pedido.status === filtroStatus;
    const matchData = filtroData === 'todos' || 
      (filtroData === 'hoje' && pedido.data === '2025-01-26');
    return matchStatus && matchData;
  });

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const atualizarStatus = (id, novoStatus) => {
    setPedidos(pedidos.map(pedido => 
      pedido.id === id 
        ? { ...pedido, status: novoStatus }
        : pedido
    ));
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-96">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-yellow-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Carregando pedidos...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-10">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-2xl p-8 text-white">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h1 className="text-4xl lg:text-5xl font-bold mb-2">📦 Gestão de Pedidos</h1>
            <p className="text-xl text-green-100">Acompanhe e gerencie todos os pedidos em tempo real</p>
          </div>
          <div className="mt-6 lg:mt-0 text-right">
            <div className="text-3xl lg:text-4xl font-bold">{pedidosFiltrados.length}</div>
            <div className="text-lg text-green-100">Pedidos {filtroStatus === 'todos' ? 'Total' : statusConfig[filtroStatus]?.label}</div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-lg font-medium text-gray-600">Pedidos Hoje</p>
              <p className="text-4xl font-bold text-gray-900">{pedidos.length}</p>
            </div>
            <div className="text-5xl">📊</div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-lg font-medium text-gray-600">Pendentes</p>
              <p className="text-4xl font-bold text-yellow-600">{pedidos.filter(p => p.status === 'pendente').length}</p>
            </div>
            <div className="text-5xl">⏳</div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-lg font-medium text-gray-600">Em Preparo</p>
              <p className="text-4xl font-bold text-orange-600">{pedidos.filter(p => p.status === 'preparando').length}</p>
            </div>
            <div className="text-5xl">👨‍🍳</div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-lg font-medium text-gray-600">Faturamento</p>
              <p className="text-3xl font-bold text-green-600">
                {formatCurrency(pedidos.reduce((total, p) => total + p.total, 0))}
              </p>
            </div>
            <div className="text-5xl">💰</div>
          </div>
        </div>
      </div>

      {/* Filtros */}
      <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-lg font-medium text-gray-700 mb-3">📋 Status</label>
            <select
              value={filtroStatus}
              onChange={(e) => setFiltroStatus(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 text-lg"
            >
              <option value="todos">🍽️ Todos os Status</option>
              {Object.entries(statusConfig).map(([status, config]) => (
                <option key={status} value={status}>
                  {config.icon} {config.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-lg font-medium text-gray-700 mb-3">📅 Período</label>
            <select
              value={filtroData}
              onChange={(e) => setFiltroData(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 text-lg"
            >
              <option value="hoje">📅 Hoje</option>
              <option value="semana">📆 Esta Semana</option>
              <option value="mes">🗓️ Este Mês</option>
              <option value="todos">🕐 Todos os Períodos</option>
            </select>
          </div>
        </div>
      </div>

      {/* Lista de Pedidos */}
      <div className="space-y-6">
        {pedidosFiltrados.map(pedido => (
          <div key={pedido.id} className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
            {/* Header do Pedido */}
            <div className="bg-gray-50 px-8 py-6 border-b">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                <div className="flex items-center space-x-6">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                    <span className="text-2xl">{statusConfig[pedido.status].icon}</span>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">{pedido.numero}</h3>
                    <p className="text-lg text-gray-600">{pedido.cliente} • {pedido.data} às {pedido.hora}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <span className={`px-4 py-2 rounded-lg text-lg font-semibold ${statusConfig[pedido.status].color}`}>
                    {statusConfig[pedido.status].label}
                  </span>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-gray-900">{formatCurrency(pedido.total)}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Conteúdo do Pedido */}
            <div className="p-8">
              <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                {/* Itens */}
                <div className="xl:col-span-2">
                  <h4 className="text-xl font-bold text-gray-900 mb-4">🛒 Itens do Pedido</h4>
                  <div className="space-y-3">
                    {pedido.itens.map((item, index) => (
                      <div key={index} className="flex justify-between items-center py-3 border-b border-gray-100">
                        <div>
                          <p className="text-lg font-semibold text-gray-900">{item.nome}</p>
                          <p className="text-gray-600">Qtd: {item.quantidade} × {formatCurrency(item.preco)}</p>
                        </div>
                        <div>
                          <p className="text-lg font-bold text-gray-900">
                            {formatCurrency(item.preco * item.quantidade)}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Informações */}
                <div>
                  <h4 className="text-xl font-bold text-gray-900 mb-4">📋 Informações</h4>
                  <div className="space-y-4">
                    <div className="bg-gray-50 rounded-lg p-4">
                      <p className="font-semibold text-gray-900 mb-2">📞 Contato:</p>
                      <p className="text-gray-600">{pedido.email}</p>
                      <p className="text-gray-600">{pedido.telefone}</p>
                    </div>
                    
                    <div className="bg-gray-50 rounded-lg p-4">
                      <p className="font-semibold text-gray-900 mb-2">📍 Endereço:</p>
                      <p className="text-gray-600">{pedido.endereco}</p>
                    </div>

                    {pedido.observacoes && (
                      <div className="bg-yellow-50 rounded-lg p-4">
                        <p className="font-semibold text-gray-900 mb-2">📝 Observações:</p>
                        <p className="text-gray-600">{pedido.observacoes}</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Ações */}
              <div className="mt-8 pt-6 border-t flex flex-wrap gap-3">
                {pedido.status === 'pendente' && (
                  <button
                    onClick={() => atualizarStatus(pedido.id, 'confirmado')}
                    className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
                  >
                    ✅ Confirmar Pedido
                  </button>
                )}
                
                {pedido.status === 'confirmado' && (
                  <button
                    onClick={() => atualizarStatus(pedido.id, 'preparando')}
                    className="bg-orange-600 text-white px-6 py-3 rounded-lg hover:bg-orange-700 transition-colors font-semibold"
                  >
                    👨‍🍳 Iniciar Preparo
                  </button>
                )}
                
                {pedido.status === 'preparando' && (
                  <button
                    onClick={() => atualizarStatus(pedido.id, 'saiu_entrega')}
                    className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors font-semibold"
                  >
                    🚚 Saiu para Entrega
                  </button>
                )}
                
                {pedido.status === 'saiu_entrega' && (
                  <button
                    onClick={() => atualizarStatus(pedido.id, 'entregue')}
                    className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors font-semibold"
                  >
                    📦 Marcar como Entregue
                  </button>
                )}

                <button className="bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition-colors font-semibold">
                  📞 Ligar para Cliente
                </button>

                <button className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-colors font-semibold">
                  ❌ Cancelar Pedido
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}