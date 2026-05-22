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
      icon: 'â³' 
    },
    confirmado: { 
      label: 'Confirmado', 
      color: 'bg-blue-100 text-blue-800', 
      icon: 'âœ…' 
    },
    preparando: { 
      label: 'Preparando', 
      color: 'bg-orange-100 text-orange-800', 
      icon: 'ðŸ‘¨â€ðŸ³' 
    },
    saiu_entrega: { 
      label: 'Saiu para Entrega', 
      color: 'bg-purple-100 text-purple-800', 
      icon: 'ðŸšš' 
    },
    entregue: { 
      label: 'Entregue', 
      color: 'bg-green-100 text-green-800', 
      icon: 'ðŸ“¦' 
    },
    cancelado: { 
      label: 'Cancelado', 
      color: 'bg-red-100 text-red-800', 
      icon: 'âŒ' 
    }
  };

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

  useEffect(() => {
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
      <div className="flex justify-center items-center min-h-64">
        <div className="spinner w-8 h-8 border-2"></div>
      </div>
    );
  }

  if (erro) {
    return (
      <div className="flex justify-center items-center min-h-64">
        <div className="text-center">
          <p className="text-4xl mb-3">âš ï¸</p>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">{erro}</p>
          <button onClick={carregarPedidos} className="btn-primary">Tentar novamente</button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="page-title">Meus Pedidos</h1>
        <p className="page-subtitle">Acompanhe o status e histÃ³rico dos seus pedidos</p>
      </div>

      {/* Filtros */}
      <div className="section-card">
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setFiltroStatus('todos')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
              filtroStatus === 'todos'
                ? 'bg-amber-500 text-white'
                : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
            }`}
          >
            Todos ({pedidos.length})
          </button>
          {Object.entries(statusConfig).map(([status, config]) => {
            const count = pedidos.filter(p => p.status === status).length;
            if (count === 0) return null;
            return (
              <button
                key={status}
                onClick={() => setFiltroStatus(status)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                  filtroStatus === status
                    ? 'bg-amber-500 text-white'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
                }`}
              >
                {config.icon} {config.label} ({count})
              </button>
            );
          })}
        </div>
      </div>

      {/* Pedidos */}
      {pedidosFiltrados.length > 0 ? (
        <div className="space-y-4">
          {pedidosFiltrados.map(pedido => (
            <div key={pedido._id || pedido.id} className="card overflow-hidden">
              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 p-4 bg-gray-50 dark:bg-gray-800/50 border-b border-gray-100 dark:border-gray-800">
                <div>
                  <p className="text-sm font-semibold text-gray-900 dark:text-white">Pedido {pedido.numero}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{formatDate(pedido.data)} â€¢ {formatCurrency(pedido.total)}</p>
                </div>
                <span className={`badge ${statusConfig[pedido.status].color}`}>
                  {statusConfig[pedido.status].icon} {statusConfig[pedido.status].label}
                </span>
              </div>

              {/* ConteÃºdo */}
              <div className="p-4">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  {/* Itens */}
                  <div>
                    <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-2">ITENS</p>
                    <div className="space-y-2">
                      {pedido.itens.map((item, index) => (
                        <div key={index} className="flex justify-between text-sm">
                          <span className="text-gray-700 dark:text-gray-300">{item.quantidade}Ã— {item.nome}</span>
                          <span className="font-medium text-gray-900 dark:text-white">{formatCurrency(item.preco * item.quantidade)}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Entrega */}
                  <div className="text-xs">
                    {pedido.endereco && (
                      <div className="mb-2">
                        <p className="font-medium text-gray-500 dark:text-gray-400 mb-1">EndereÃ§o</p>
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

                {/* AÃ§Ãµes */}
                <div className="mt-4 pt-3 border-t border-gray-100 dark:border-gray-800 flex flex-wrap gap-2">
                  <button className="btn-primary py-1.5 px-3 text-xs">Repetir pedido</button>
                  {pedido.status === 'entregue' && (
                    <button className="btn-secondary py-1.5 px-3 text-xs">Avaliar</button>
                  )}
                  {pedido.status === 'pendente' && (
                    <button className="btn-danger py-1.5 px-3 text-xs">Cancelar</button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="section-card flex flex-col items-center py-16 text-center">
          <span className="text-5xl mb-3">ðŸ“­</span>
          <p className="text-sm font-medium text-gray-900 dark:text-white mb-1">
            {filtroStatus === 'todos' ? 'Nenhum pedido encontrado' : 'Nenhum pedido com este status'}
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400 mb-4">
            {filtroStatus === 'todos' ? 'Que tal fazer seu primeiro pedido?' : 'Tente outro status.'}
          </p>
          <a href="/cardapio" className="btn-primary text-xs">Ver CardÃ¡pio</a>
        </div>
      )}
    </div>
  );
}
