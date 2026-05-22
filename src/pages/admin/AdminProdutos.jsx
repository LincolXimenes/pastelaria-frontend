import React, { useState, useEffect } from 'react';
import { produtoService } from '../../services/produtoService';

export default function AdminProdutos() {
  const [produtos, setProdutos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState(null);
  const [filtroCategoria, setFiltroCategoria] = useState('todos');
  const [busca, setBusca] = useState('');
  const [modalAberto, setModalAberto] = useState(false);
  const [produtoEditando, setProdutoEditando] = useState(null);

  const categorias = [
    { value: 'todos', label: 'Todas as Categorias', icon: '🍽️' },
    { value: 'pasteis', label: 'Pastéis', icon: '🥟' },
    { value: 'bebidas', label: 'Bebidas', icon: '🥤' },
    { value: 'sobremesas', label: 'Sobremesas', icon: '🍰' }
  ];

  const carregarProdutos = async () => {
    setLoading(true);
    setErro(null);
    const result = await produtoService.listar();
    if (result.success) {
      setProdutos(result.data);
    } else {
      setErro(result.error);
    }
    setLoading(false);
  };

  useEffect(() => {
    carregarProdutos();
  }, []);

  const produtosFiltrados = produtos
    .filter(produto => {
      const matchCategoria = filtroCategoria === 'todos' || produto.categoria === filtroCategoria;
      const matchBusca = !busca || produto.nome.toLowerCase().includes(busca.toLowerCase());
      return matchCategoria && matchBusca;
    })
    .sort((a, b) => a.nome.localeCompare(b.nome));

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const toggleStatus = async (id) => {
    const produto = produtos.find(p => (p._id || p.id) === id);
    if (!produto) return;
    const result = await produtoService.atualizar(id, { ativo: !produto.ativo });
    if (result.success) {
      setProdutos(produtos.map(p =>
        (p._id || p.id) === id ? { ...p, ativo: !p.ativo } : p
      ));
    }
  };

  const deletarProduto = async (id) => {
    if (!window.confirm('Confirma exclusão deste produto?')) return;
    const result = await produtoService.deletar(id);
    if (result.success) {
      setProdutos(produtos.filter(p => (p._id || p.id) !== id));
    }
  };

  const editarProduto = (produto) => {
    setProdutoEditando(produto);
    setModalAberto(true);
  };

  const novoProduto = () => {
    setProdutoEditando(null);
    setModalAberto(true);
  };

    const salvarProduto = async (dados) => {
      let result;
      if (produtoEditando) {
        result = await produtoService.atualizar(produtoEditando._id || produtoEditando.id, dados);
        if (result.success) {
          setProdutos(produtos.map(p =>
            (p._id || p.id) === (produtoEditando._id || produtoEditando.id) ? result.data : p
          ));
        }
      } else {
        result = await produtoService.criar(dados);
        if (result.success) {
          setProdutos([...produtos, result.data]);
        }
      }
      if (result.success) setModalAberto(false);
    };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-96">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-yellow-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Carregando produtos...</p>
        </div>
      </div>
    );
  }

  if (erro) {
    return (
      <div className="flex justify-center items-center min-h-96">
        <div className="text-center">
          <div className="text-6xl mb-4">⚠️</div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Erro ao carregar produtos</h3>
          <p className="text-gray-600 mb-4">{erro}</p>
          <button onClick={carregarProdutos} className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
            Tentar novamente
          </button>
        </div>
      </div>
    );
  }

    function ModalProduto({ produto, onClose, onSalvar }) {
      const [form, setForm] = React.useState({
        nome: produto?.nome || '',
        categoria: produto?.categoria || 'pasteis',
        preco: produto?.preco || '',
        descricao: produto?.descricao || '',
        ativo: produto?.ativo ?? true,
      });

      const handleChange = (e) => {
        const { name, value, type, checked } = e.target;

      function ModalProduto
      };

      const handleSubmit = (e) => {
        e.preventDefault();
        onSalvar({ ...form, preco: parseFloat(form.preco) });
      };

      return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg">
            <div className="p-6 border-b flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">
                {produto ? '✏️ Editar Produto' : '➕ Novo Produto'}
              </h2>
              <button onClick={onClose} className="text-gray-500 hover:text-gray-700 text-2xl">×</button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nome</label>
                <input name="nome" value={form.nome} onChange={handleChange} required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Categoria</label>
                <select name="categoria" value={form.categoria} onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                  <option value="pasteis">Pastéis</option>
                  <option value="bebidas">Bebidas</option>
                  <option value="sobremesas">Sobremesas</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Preço (R$)</label>
                <input name="preco" type="number" step="0.01" min="0" value={form.preco} onChange={handleChange} required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Descrição</label>
                <textarea name="descricao" value={form.descricao} onChange={handleChange} rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
              </div>
              <div className="flex items-center gap-2">
                <input name="ativo" type="checkbox" checked={form.ativo} onChange={handleChange} id="ativo" />
                <label htmlFor="ativo" className="text-sm font-medium text-gray-700">Produto ativo</label>
              </div>
              <div className="flex gap-3 pt-2">
                <button type="submit"
                  className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 font-semibold">
                  Salvar
                </button>
                <button type="button" onClick={onClose}
                  className="flex-1 bg-gray-200 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-300 font-semibold">
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      );
    }

                {modalAberto && (
                  <ModalProduto
                    produto={produtoEditando}
                    onClose={() => setModalAberto(false)}
                    onSalvar={salvarProduto}
                  />
                )}
              </div>
            );
          }

          function ModalProduto
            <h1 className="text-4xl lg:text-5xl font-bold mb-2">🥟 Gestão de Produtos</h1>
            <p className="text-xl text-blue-100">Gerencie seu cardápio e mantenha tudo atualizado</p>
          </div>
          <button
            onClick={novoProduto}
            className="mt-6 lg:mt-0 bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-blue-50 transition-colors shadow-lg hover:shadow-xl"
          >
            ➕ Novo Produto
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-lg font-medium text-gray-600">Total de Produtos</p>
              <p className="text-4xl font-bold text-gray-900">{produtos.length}</p>
            </div>
            <div className="text-5xl">📦</div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-lg font-medium text-gray-600">Produtos Ativos</p>
              <p className="text-4xl font-bold text-green-600">{produtos.filter(p => p.ativo).length}</p>
            </div>
            <div className="text-5xl">✅</div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-lg font-medium text-gray-600">Estoque Baixo</p>
              <p className="text-4xl font-bold text-orange-600">{produtos.filter(p => p.estoque < 20).length}</p>
            </div>
            <div className="text-5xl">⚠️</div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-lg font-medium text-gray-600">Mais Vendido</p>
              <p className="text-2xl font-bold text-gray-900">{produtos.reduce((max, p) => p.vendas_mes > max.vendas_mes ? p : max, produtos[0])?.nome || 'N/A'}</p>
            </div>
            <div className="text-5xl">🏆</div>
          </div>
        </div>
      </div>

      {/* Filtros */}
      <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Busca */}
          <div>
            <label className="block text-lg font-medium text-gray-700 mb-3">🔍 Buscar Produto</label>
            <input
              type="text"
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
              placeholder="Digite o nome do produto..."
              className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-lg"
            />
          </div>

          {/* Categoria */}
          <div>
            <label className="block text-lg font-medium text-gray-700 mb-3">🏷️ Categoria</label>
            <select
              value={filtroCategoria}
              onChange={(e) => setFiltroCategoria(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-lg"
            >
              {categorias.map(cat => (
                <option key={cat.value} value={cat.value}>
                  {cat.icon} {cat.label}
                </option>
              ))}
            </select>
          </div>

          {/* Resultado */}
          <div className="flex items-end">
            <div className="bg-blue-50 rounded-lg p-4 w-full">
              <p className="text-lg font-semibold text-blue-900">
                {produtosFiltrados.length} {produtosFiltrados.length === 1 ? 'produto encontrado' : 'produtos encontrados'}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Lista de Produtos */}
      <div className="bg-white rounded-2xl shadow-xl border border-gray-100">
        <div className="p-8 border-b border-gray-100">
          <h2 className="text-2xl font-bold text-gray-900">📋 Lista de Produtos</h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-8 py-6 text-left text-lg font-semibold text-gray-900">Produto</th>
                <th className="px-8 py-6 text-left text-lg font-semibold text-gray-900">Categoria</th>
                <th className="px-8 py-6 text-left text-lg font-semibold text-gray-900">Preço</th>
                <th className="px-8 py-6 text-left text-lg font-semibold text-gray-900">Estoque</th>
                <th className="px-8 py-6 text-left text-lg font-semibold text-gray-900">Vendas/Mês</th>
                <th className="px-8 py-6 text-left text-lg font-semibold text-gray-900">Status</th>
                <th className="px-8 py-6 text-left text-lg font-semibold text-gray-900">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {produtosFiltrados.map(produto => (
                <tr key={produto._id || produto.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-8 py-6">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                        <span className="text-2xl">
                          {produto.categoria === 'pasteis' ? '🥟' :
                           produto.categoria === 'bebidas' ? '🥤' : '🍰'}
                        </span>
                      </div>
                      <div>
                        <p className="text-lg font-semibold text-gray-900">{produto.nome}</p>
                        <p className="text-sm text-gray-500">ID: {produto._id || produto.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800 capitalize">
                      {produto.categoria}
                    </span>
                  </td>
                  <td className="px-8 py-6">
                    <span className="text-lg font-bold text-gray-900">{formatCurrency(produto.preco)}</span>
                  </td>
                  <td className="px-8 py-6">
                    <span className={`text-lg font-semibold ${
                      produto.estoque < 10 ? 'text-red-600' :
                      produto.estoque < 20 ? 'text-yellow-600' : 'text-green-600'
                    }`}>
                      {produto.estoque} un
                    </span>
                  </td>
                  <td className="px-8 py-6">
                    <span className="text-lg text-gray-900">{produto.vendas_mes}</span>
                  </td>
                  <td className="px-8 py-6">
                    <button
                      onClick={() => toggleStatus(produto._id || produto.id)}
                      className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${
                        produto.ativo 
                          ? 'bg-green-100 text-green-800 hover:bg-green-200'
                          : 'bg-red-100 text-red-800 hover:bg-red-200'
                      }`}
                    >
                      {produto.ativo ? '✅ Ativo' : '❌ Inativo'}
                    </button>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex items-center space-x-3">
                      <button
                        onClick={() => editarProduto(produto)}
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                      >
                        ✏️ Editar
                      </button>
                      <button
                        onClick={() => deletarProduto(produto._id || produto.id)}
                        className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors font-medium"
                      >
                        🗑️ Excluir
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <button className="bg-gradient-to-r from-green-500 to-green-600 text-white rounded-2xl p-8 hover:from-green-600 hover:to-green-700 transition-all duration-300 shadow-xl hover:shadow-2xl">
          <div className="flex items-center space-x-6">
            <div className="text-5xl">📊</div>
            <div>
              <h3 className="text-2xl font-bold">Relatório de Produtos</h3>
              <p className="text-lg text-green-100">Análise de vendas e performance</p>
            </div>
          </div>
        </button>

        <button className="bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-2xl p-8 hover:from-orange-600 hover:to-orange-700 transition-all duration-300 shadow-xl hover:shadow-2xl">
          <div className="flex items-center space-x-6">
            <div className="text-5xl">📦</div>
            <div>
              <h3 className="text-2xl font-bold">Controle de Estoque</h3>
              <p className="text-lg text-orange-100">Gerenciar quantidades e alertas</p>
            </div>
          </div>
        </button>

        <button className="bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-2xl p-8 hover:from-purple-600 hover:to-purple-700 transition-all duration-300 shadow-xl hover:shadow-2xl">
          <div className="flex items-center space-x-6">
            <div className="text-5xl">📤</div>
            <div>
              <h3 className="text-2xl font-bold">Exportar Dados</h3>
              <p className="text-lg text-purple-100">Download de relatórios</p>
            </div>
          </div>
        </button>
      </div>
    </div>
  );
}