import React, { useState, useEffect } from 'react';
import { produtoService } from '../../services/produtoService';

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
    setForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSalvar({ ...form, preco: parseFloat(form.preco) });
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="card w-full max-w-lg animate-[scaleIn_0.2s_ease-out]">
        <div className="p-5 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between">
          <h2 className="text-base font-semibold text-gray-900 dark:text-white">
            {produto ? 'Editar Produto' : 'Novo Produto'}
          </h2>
          <button onClick={onClose} className="btn-ghost p-1.5 rounded-lg text-gray-400 hover:text-gray-600">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <form onSubmit={handleSubmit} className="p-5 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Nome</label>
            <input name="nome" value={form.nome} onChange={handleChange} required className="input" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Categoria</label>
            <select name="categoria" value={form.categoria} onChange={handleChange} className="input">
              <option value="pasteis">Pastéis</option>
              <option value="bebidas">Bebidas</option>
              <option value="sobremesas">Sobremesas</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Preço (R$)</label>
            <input name="preco" type="number" step="0.01" min="0" value={form.preco} onChange={handleChange} required className="input" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Descrição</label>
            <textarea name="descricao" value={form.descricao} onChange={handleChange} rows={3} className="input" />
          </div>
          <div className="flex items-center gap-2">
            <input name="ativo" type="checkbox" checked={form.ativo} onChange={handleChange} id="ativo"
              className="w-4 h-4 text-amber-600 rounded" />
            <label htmlFor="ativo" className="text-sm font-medium text-gray-700 dark:text-gray-300">Produto ativo</label>
          </div>
          <div className="flex gap-3 pt-2">
            <button type="submit" className="btn-primary flex-1">Salvar</button>
            <button type="button" onClick={onClose} className="btn-secondary flex-1">Cancelar</button>
          </div>
        </form>
      </div>
    </div>
  );
}

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

  const produtoMaisVendido = produtos.length > 0
    ? produtos.reduce((max, p) => (p.vendas_mes ?? 0) > (max.vendas_mes ?? 0) ? p : max, produtos[0])
    : null;

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
          <p className="text-4xl mb-3">??</p>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">{erro}</p>
          <button onClick={carregarProdutos} className="btn-primary">Tentar novamente</button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Banner */}
      <div className="page-banner">
        <div>
          <h1 className="page-title">Produtos</h1>
          <p className="page-subtitle">Gerencie o cardápio da pastelaria</p>
        </div>
        <button onClick={novoProduto} className="btn-primary">
          + Novo Produto
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="stat-card">
          <div>
            <p className="text-xs text-gray-500 dark:text-gray-400">Total</p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">{produtos.length}</p>
          </div>
          <span className="text-2xl">??</span>
        </div>
        <div className="stat-card">
          <div>
            <p className="text-xs text-gray-500 dark:text-gray-400">Ativos</p>
            <p className="text-2xl font-bold text-green-600">{produtos.filter(p => p.ativo).length}</p>
          </div>
          <span className="text-2xl">?</span>
        </div>
        <div className="stat-card">
          <div>
            <p className="text-xs text-gray-500 dark:text-gray-400">Estoque baixo</p>
            <p className="text-2xl font-bold text-orange-500">{produtos.filter(p => p.estoque < 20).length}</p>
          </div>
          <span className="text-2xl">??</span>
        </div>
        <div className="stat-card">
          <div>
            <p className="text-xs text-gray-500 dark:text-gray-400">Mais vendido</p>
            <p className="text-sm font-semibold text-gray-900 dark:text-white truncate">{produtoMaisVendido?.nome || '�'}</p>
          </div>
          <span className="text-2xl">??</span>
        </div>
      </div>

      {/* Filtros */}
      <div className="section-card">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1.5">Buscar</label>
            <input
              type="text"
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
              placeholder="Nome do produto…"
              className="input"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1.5">Categoria</label>
            <select
              value={filtroCategoria}
              onChange={(e) => setFiltroCategoria(e.target.value)}
              className="input"
            >
              {categorias.map(cat => (
                <option key={cat.value} value={cat.value}>{cat.icon} {cat.label}</option>
              ))}
            </select>
          </div>
          <div className="flex items-end">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              <span className="font-semibold text-gray-900 dark:text-white">{produtosFiltrados.length}</span> produto(s) encontrado(s)
            </p>
          </div>
        </div>
      </div>

      {/* Tabela */}
      <div className="table-wrapper">
        <table className="w-full">
          <thead>
            <tr>
              <th className="table-header">Produto</th>
              <th className="table-header">Categoria</th>
              <th className="table-header">Preço</th>
              <th className="table-header">Estoque</th>
              <th className="table-header">Vendas/Mês</th>
              <th className="table-header">Status</th>
              <th className="table-header">Ações</th>
            </tr>
          </thead>
          <tbody>
            {produtosFiltrados.map(produto => (
              <tr key={produto._id || produto.id} className="table-row">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <span className="text-xl">
                      {produto.categoria === 'pasteis' ? '🥟' : produto.categoria === 'bebidas' ? '🥤' : '🍰'}
                    </span>
                    <div>
                      <p className="text-sm font-semibold text-gray-900 dark:text-white">{produto.nome}</p>
                      <p className="text-xs text-gray-400">{produto._id || produto.id}</p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <span className="badge bg-amber-50 dark:bg-amber-500/10 text-amber-700 dark:text-amber-400 capitalize">{produto.categoria}</span>
                </td>
                <td className="px-4 py-3 text-sm font-semibold text-gray-900 dark:text-white">{formatCurrency(produto.preco)}</td>
                <td className="px-4 py-3">
                  <span className={`text-sm font-medium ${
                    produto.estoque == null ? 'text-gray-400' :
                    produto.estoque < 10 ? 'text-red-500' :
                    produto.estoque < 20 ? 'text-amber-500' : 'text-green-600'
                  }`}>
                    {produto.estoque != null ? `${produto.estoque} un` : '�'}
                  </span>
                </td>
                <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">{produto.vendas_mes ?? '—'}</td>
                <td className="px-4 py-3">
                  <button
                    onClick={() => toggleStatus(produto._id || produto.id)}
                    className={`badge cursor-pointer ${
                      produto.ativo
                        ? 'bg-green-50 dark:bg-green-500/10 text-green-700 dark:text-green-400'
                        : 'bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-400'
                    }`}
                  >
                    {produto.ativo ? 'Ativo' : 'Inativo'}
                  </button>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <button onClick={() => editarProduto(produto)} className="btn-secondary py-1 px-3 text-xs">Editar</button>
                    <button onClick={() => deletarProduto(produto._id || produto.id)} className="btn-danger py-1 px-3 text-xs">Excluir</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

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