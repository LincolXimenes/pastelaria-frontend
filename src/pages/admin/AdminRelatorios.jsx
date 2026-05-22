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
    <div className="space-y-10">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-2xl p-8 text-white">
        <h1 className="text-4xl lg:text-5xl font-bold mb-2">📈 Relatórios</h1>
        <p className="text-xl text-purple-100">Análise de vendas e performance por período</p>
      </div>

      {/* Filtros de período */}
      <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">📅 Filtrar por Período</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end">
          <div>
            <label className="block text-lg font-medium text-gray-700 mb-3">Data Início</label>
            <input
              type="date"
              value={dataInicio}
              onChange={(e) => setDataInicio(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-lg"
            />
          </div>
          <div>
            <label className="block text-lg font-medium text-gray-700 mb-3">Data Fim</label>
            <input
              type="date"
              value={dataFim}
              onChange={(e) => setDataFim(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-lg"
            />
          </div>
          <button
            onClick={buscarRelatorios}
            disabled={loading}
            className="bg-purple-600 text-white px-8 py-3 rounded-lg hover:bg-purple-700 transition-colors font-semibold text-lg disabled:opacity-50"
          >
            {loading ? 'Carregando...' : '🔍 Gerar Relatório'}
          </button>
        </div>
      </div>

      {erro && (
        <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl p-6">
          <p className="font-semibold">Erro ao carregar relatório:</p>
          <p>{erro}</p>
        </div>
      )}

      {relatorioVendas && (
        <>
          {/* Cards de resumo */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
            <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
              <p className="text-lg font-medium text-gray-600">Total de Vendas</p>
              <p className="text-4xl font-bold text-gray-900 mt-2">{formatCurrency(relatorioVendas.total_vendas)}</p>
            </div>
            <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
              <p className="text-lg font-medium text-gray-600">Pedidos no Período</p>
              <p className="text-4xl font-bold text-gray-900 mt-2">{relatorioVendas.total_pedidos ?? 0}</p>
            </div>
            <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
              <p className="text-lg font-medium text-gray-600">Ticket Médio</p>
              <p className="text-4xl font-bold text-gray-900 mt-2">{formatCurrency(relatorioVendas.ticket_medio)}</p>
            </div>
            <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
              <p className="text-lg font-medium text-gray-600">Itens Vendidos</p>
              <p className="text-4xl font-bold text-gray-900 mt-2">{relatorioVendas.total_itens ?? 0}</p>
            </div>
          </div>

          {/* Produtos mais vendidos */}
          {produtosMaisVendidos.length > 0 && (
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100">
              <div className="p-8 border-b border-gray-100">
                <h2 className="text-2xl font-bold text-gray-900">🏆 Produtos Mais Vendidos</h2>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-8 py-4 text-left text-lg font-semibold text-gray-900">#</th>
                      <th className="px-8 py-4 text-left text-lg font-semibold text-gray-900">Produto</th>
                      <th className="px-8 py-4 text-left text-lg font-semibold text-gray-900">Vendas</th>
                      <th className="px-8 py-4 text-left text-lg font-semibold text-gray-900">Receita</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {produtosMaisVendidos.map((produto, index) => (
                      <tr key={produto._id || index} className="hover:bg-gray-50">
                        <td className="px-8 py-4">
                          <span className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold text-white inline-flex ${
                            index === 0 ? 'bg-yellow-500' : index === 1 ? 'bg-gray-400' : index === 2 ? 'bg-orange-500' : 'bg-gray-300'
                          }`}>{index + 1}</span>
                        </td>
                        <td className="px-8 py-4 font-semibold text-gray-900">{produto.nome}</td>
                        <td className="px-8 py-4 text-gray-700">{produto.vendas} unid.</td>
                        <td className="px-8 py-4 font-bold text-gray-900">{formatCurrency(produto.receita)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </>
      )}

      {!relatorioVendas && !loading && !erro && (
        <div className="text-center py-16 bg-white rounded-2xl shadow-xl border border-gray-100">
          <div className="text-8xl mb-6">📊</div>
          <h3 className="text-2xl font-semibold text-gray-900 mb-4">Selecione um período</h3>
          <p className="text-gray-600">Escolha as datas e clique em "Gerar Relatório" para visualizar os dados.</p>
        </div>
      )}
    </div>
  );
}
