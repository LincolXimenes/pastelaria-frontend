import React, { useState, useEffect } from 'react';
import { pedidoService } from '../../services/pedidoService';

export default function MeusPedidos() {
  const [pedidos, setPedidos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState(null);
  const [filtroStatus, setFiltroStatus] = useState('todos');

  const statusConfig = {
    pendente: { 
      label: 'Pendente', 
      color: 'bg-yellow-100 text-yellow-800', 
      icon: '⏳' 
    },
    confirmado: { 
      label: 'Confirmado', 
      color: 'bg-blue-100 text-blue-800', 
      icon: '✅' 
    },
    preparando: { 
      label: 'Preparando', 
      color: 'bg-orange-100 text-orange-800', 
      icon: '👨‍🍳' 
    },
    saiu_entrega: { 
      label: 'Saiu para Entrega', 
      color: 'bg-purple-100 text-purple-800', 
      icon: '🚚' 
    },
    entregue: { 
      label: 'Entregue', 
      color: 'bg-green-100 text-green-800', 
      icon: '📦' 
    },
    cancelado: { 
      label: 'Cancelado', 
      color: 'bg-red-100 text-red-800', 
      icon: '❌' 
    }
  };

  useEffect(() => {
    const carregarPedidos = async () => {
      setLoading(true);
      setErro(null);
      const result = await pedidoService.listar();
      if (result.success) {
        setPedidos(result.data);
      } else {
        setErro(result.error);
      }
      setLoading(false);
    };
    carregarPedidos();
  }, []);

  const pedidosFiltrados = pedidos.filter(pedido => 
    filtroStatus === 'todos' || pedido.status === filtroStatus
  );

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-96">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-yellow-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Carregando seus pedidos...</p>
        </div>
      </div>
    );
  }

  if (erro) {
    return (
      <div className="flex justify-center items-center min-h-96">
        <div className="text-center">
          <div className="text-6xl mb-4">⚠️</div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Erro ao carregar pedidos</h3>
          <p className="text-gray-600 mb-4">{erro}</p>
          <button onClick={() => window.location.reload()} className="bg-yellow-600 text-white px-6 py-2 rounded-lg hover:bg-yellow-700 transition-colors">
            Tentar novamente
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">📦 Meus Pedidos</h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Acompanhe o status dos seus pedidos e histórico de compras
        </p>
      </div>

      {/* Filtros */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex flex-wrap gap-4">
          <button
            onClick={() => setFiltroStatus('todos')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              filtroStatus === 'todos' 
                ? 'bg-yellow-600 text-white' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            📋 Todos ({pedidos.length})
          </button>
          
          {Object.entries(statusConfig).map(([status, config]) => {
            const count = pedidos.filter(p => p.status === status).length;
            if (count === 0) return null;
            
            return (
              <button
                key={status}
                onClick={() => setFiltroStatus(status)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  filtroStatus === status 
                    ? 'bg-yellow-600 text-white' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {config.icon} {config.label} ({count})
              </button>
            );
          })}
        </div>
      </div>

      {/* Lista de Pedidos */}
      {pedidosFiltrados.length > 0 ? (
        <div className="space-y-6">
          {pedidosFiltrados.map(pedido => (
            <div key={pedido._id || pedido.id} className="bg-white rounded-xl shadow-lg overflow-hidden">
              {/* Header do Pedido */}
              <div className="bg-gray-50 px-6 py-4 border-b">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">
                      Pedido {pedido.numero}
                    </h3>
                    <p className="text-gray-600">
                      📅 {formatDate(pedido.data)} • 💰 {formatCurrency(pedido.total)}
                    </p>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${statusConfig[pedido.status].color}`}>
                      {statusConfig[pedido.status].icon} {statusConfig[pedido.status].label}
                    </span>
                  </div>
                </div>
              </div>

              {/* Conteúdo do Pedido */}
              <div className="p-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Itens do Pedido */}
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-4">🛒 Itens do Pedido</h4>
                    <div className="space-y-3">
                      {pedido.itens.map((item, index) => (
                        <div key={index} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-b-0">
                          <div>
                            <p className="font-medium text-gray-900">{item.nome}</p>
                            <p className="text-sm text-gray-600">Qtd: {item.quantidade}</p>
                          </div>
                          <div className="text-right">
                            <p className="font-semibold text-gray-900">
                              {formatCurrency(item.preco * item.quantidade)}
                            </p>
                            <p className="text-sm text-gray-600">
                              {formatCurrency(item.preco)} cada
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Informações de Entrega */}
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-4">📍 Informações de Entrega</h4>
                    <div className="space-y-3">
                      <div className="bg-gray-50 rounded-lg p-4">
                        <h5 className="font-medium text-gray-900 mb-2">Endereço:</h5>
                        <p className="text-gray-600">{pedido.endereco}</p>
                      </div>
                      
                      {pedido.observacoes && (
                        <div className="bg-yellow-50 rounded-lg p-4">
                          <h5 className="font-medium text-gray-900 mb-2">Observações:</h5>
                          <p className="text-gray-600">{pedido.observacoes}</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Ações */}
                <div className="mt-6 pt-4 border-t flex flex-col sm:flex-row gap-3">
                  <button className="bg-yellow-600 text-white px-6 py-2 rounded-lg hover:bg-yellow-700 transition-colors font-medium">
                    🔄 Repetir Pedido
                  </button>
                  
                  {pedido.status === 'entregue' && (
                    <button className="bg-gray-600 text-white px-6 py-2 rounded-lg hover:bg-gray-700 transition-colors font-medium">
                      ⭐ Avaliar Pedido
                    </button>
                  )}
                  
                  {pedido.status === 'pendente' && (
                    <button className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition-colors font-medium">
                      ❌ Cancelar
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <div className="text-8xl mb-6">📭</div>
          <h3 className="text-2xl font-semibold text-gray-900 mb-4">
            {filtroStatus === 'todos' ? 'Nenhum pedido encontrado' : 'Nenhum pedido com este status'}
          </h3>
          <p className="text-gray-600 mb-8">
            {filtroStatus === 'todos' 
              ? 'Que tal fazer seu primeiro pedido?' 
              : 'Tente filtrar por outro status ou fazer um novo pedido.'
            }
          </p>
          <a 
            href="/cardapio"
            className="bg-yellow-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-yellow-700 transition-colors inline-block shadow-lg hover:shadow-xl"
          >
            🍽️ Ver Cardápio
          </a>
        </div>
      )}
    </div>
  );
}