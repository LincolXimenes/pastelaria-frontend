import React, { useState } from 'react';
import { relatorioService } from '../../services/relatorioService';

export default function AdminRelatorios() {
  const hoje = new Date().toISOString().split('T')[0];
  const primeiroDiaMes = new Date(new Date().getFullYear(), new Date().getMonth(), 1)
    .toISOString().split('T')[0];

  const [dataInicio, setDataInicio] = useState(primeiroDiaMes);
  const [dataFim, setDataFim] = useState(hoje);
  const [relatorioVendas, setRelatorioVendas] = useState(null);
  const [produtosMaisVendidos, setProdutosMaisVendidos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState(null);

  const formatCurrency = (value) =>
    new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value ?? 0);

  const buscarRelatorios = async () => {
    setLoading(true);
    setErro(null);

    const [vendas, produtos] = await Promise.all([
      relatorioService.vendasPorPeriodo(dataInicio, dataFim),
      relatorioService.produtosMaisVendidos(dataInicio, dataFim)
    ]);

    if (vendas.success) setRelatorioVendas(vendas.data);
    else setErro(vendas.error);

    if (produtos.success) setProdutosMaisVendidos(produtos.data);

    setLoading(false);
  };

  return (
    <div className="space-y-6">
      {/* Banner */}
      <div className="page-banner">
        <div>
          <h1 className="page-title">Relatórios</h1>
          <p className="page-subtitle">Análise de vendas e performance por período</p>
        </div>
      </div>

      {/* Filtros */}
      <div className="section-card">
        <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-3">PERÍODO</p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-end">
          <div>
            <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1.5">Data início</label>
            <input
              type="date"
              value={dataInicio}
              onChange={(e) => setDataInicio(e.target.value)}
              className="input"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1.5">Data fim</label>
            <input
              type="date"
              value={dataFim}
              onChange={(e) => setDataFim(e.target.value)}
              className="input"
            />
          </div>
          <button
            onClick={buscarRelatorios}
            disabled={loading}
            className="btn-primary"
          >
            {loading ? (
              <><span className="spinner w-4 h-4 border-2" /> Gerando…</>
            ) : 'Gerar relatório'}
          </button>
        </div>
      </div>

      {erro && (
        <div className="px-4 py-3 bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/30 rounded-lg text-sm text-red-700 dark:text-red-400">
          {erro}
        </div>
      )}

      {relatorioVendas && (
        <>
          {/* Resumo */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="stat-card">
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400">Total vendas</p>
                <p className="text-lg font-bold text-gray-900 dark:text-white">{formatCurrency(relatorioVendas.total_vendas)}</p>
              </div>
              <span className="text-2xl">💵</span>
            </div>
            <div className="stat-card">
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400">Pedidos</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{relatorioVendas.total_pedidos ?? 0}</p>
              </div>
              <span className="text-2xl">📦</span>
            </div>
            <div className="stat-card">
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400">Ticket médio</p>
                <p className="text-lg font-bold text-gray-900 dark:text-white">{formatCurrency(relatorioVendas.ticket_medio)}</p>
              </div>
              <span className="text-2xl">🎯</span>
            </div>
            <div className="stat-card">
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400">Itens vendidos</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{relatorioVendas.total_itens ?? 0}</p>
              </div>
              <span className="text-2xl">🥟</span>
            </div>
          </div>

          {/* Produtos mais vendidos */}
          {produtosMaisVendidos.length > 0 && (
            <div className="table-wrapper">
              <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100 dark:border-gray-800">
                <h2 className="text-sm font-semibold text-gray-900 dark:text-white">🏆 Produtos Mais Vendidos</h2>
              </div>
              <table className="w-full">
                <thead>
                  <tr>
                    <th className="table-header">#</th>
                    <th className="table-header">Produto</th>
                    <th className="table-header">Vendas</th>
                    <th className="table-header">Receita</th>
                  </tr>
                </thead>
                <tbody>
                  {produtosMaisVendidos.map((produto, index) => (
                    <tr key={produto._id || index} className="table-row">
                      <td className="px-4 py-3">
                        <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white ${
                          index === 0 ? 'bg-amber-500' : index === 1 ? 'bg-gray-400' : index === 2 ? 'bg-orange-400' : 'bg-gray-300'
                        }`}>{index + 1}</span>
                      </td>
                      <td className="px-4 py-3 text-sm font-medium text-gray-900 dark:text-white">{produto.nome}</td>
                      <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">{produto.vendas} unid.</td>
                      <td className="px-4 py-3 text-sm font-semibold text-gray-900 dark:text-white">{formatCurrency(produto.receita)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </>
      )}

      {!relatorioVendas && !loading && !erro && (
        <div className="section-card flex flex-col items-center justify-center py-16 text-center">
          <span className="text-5xl mb-4">📊</span>
          <p className="text-sm font-medium text-gray-900 dark:text-white mb-1">Nenhum relatório gerado</p>
          <p className="text-xs text-gray-500 dark:text-gray-400">Escolha as datas e clique em “Gerar relatório”.</p>
        </div>
      )}
    </div>
  );
}
