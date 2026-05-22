import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { produtoService } from '../../services/produtoService';

export default function Cardapio() {
  const [searchParams] = useSearchParams();
  const categoriaInicial = searchParams.get('categoria') || '';
  
  const [produtos, setProdutos] = useState([]);
  const [categoria, setCategoria] = useState(categoriaInicial);
  const [ordenacao, setOrdenacao] = useState('nome');
  const [busca, setBusca] = useState('');
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState(null);

  const categorias = [
    { value: '', label: 'Todas as Categorias', icon: 'ðŸ½ï¸' },
    { value: 'pasteis', label: 'PastÃ©is', icon: 'ðŸ¥Ÿ' },
    { value: 'bebidas', label: 'Bebidas', icon: 'ðŸ¥¤' },
    { value: 'sobremesas', label: 'Sobremesas', icon: 'ðŸ°' }
  ];

  const carregarProdutos = async () => {
    setLoading(true);
    setErro(null);
    const result = await produtoService.listar({ ativo: true });
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

  // Filtrar e ordenar produtos
  const produtosFiltrados = produtos
    .filter(produto => {
      const matchCategoria = !categoria || produto.categoria === categoria;
      const matchBusca = !busca || produto.nome.toLowerCase().includes(busca.toLowerCase());
      return matchCategoria && matchBusca;
    })
    .sort((a, b) => {
      switch (ordenacao) {
        case 'preco-asc':
          return a.preco - b.preco;
        case 'preco-desc':
          return b.preco - a.preco;
        case 'nome':
        default:
          return a.nome.localeCompare(b.nome);
      }
    });

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
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
          <button onClick={carregarProdutos} className="btn-primary">Tentar novamente</button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="page-title">CardÃ¡pio</h1>
        <p className="page-subtitle">PastÃ©is artesanais, bebidas e sobremesas</p>
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
              placeholder="Nome do produtoâ€¦"
              className="input"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1.5">Categoria</label>
            <select value={categoria} onChange={(e) => setCategoria(e.target.value)} className="input">
              {categorias.map(cat => (
                <option key={cat.value} value={cat.value}>{cat.icon} {cat.label}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1.5">Ordenar</label>
            <select value={ordenacao} onChange={(e) => setOrdenacao(e.target.value)} className="input">
              <option value="nome">Nome (A-Z)</option>
              <option value="preco-asc">PreÃ§o (menor)</option>
              <option value="preco-desc">PreÃ§o (maior)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Grid */}
      {produtosFiltrados.length > 0 ? (
        <>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            {produtosFiltrados.length} produto(s) encontrado(s)
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
            {produtosFiltrados.map(produto => (
              <div key={produto.id} className="card card-hover overflow-hidden">
                <div className="h-28 bg-amber-50 dark:bg-amber-500/10 flex items-center justify-center">
                  <span className="text-4xl">
                    {produto.categoria === 'pasteis' ? 'ðŸ¥Ÿ' :
                     produto.categoria === 'bebidas' ? 'ðŸ¥¤' : 'ðŸ°'}
                  </span>
                </div>
                <div className="p-3">
                  <div className="flex justify-between items-start mb-1">
                    <p className="text-xs font-semibold text-gray-900 dark:text-white leading-tight">{produto.nome}</p>
                  </div>
                  <p className="text-xs text-amber-600 dark:text-amber-400 font-medium mb-1">{formatCurrency(produto.preco)}</p>
                  {produto.descricao && (
                    <p className="text-xs text-gray-400 dark:text-gray-500 line-clamp-2 mb-2">{produto.descricao}</p>
                  )}
                  <span className="badge bg-amber-50 dark:bg-amber-500/10 text-amber-700 dark:text-amber-400 capitalize text-[10px] mb-2">{produto.categoria}</span>
                  <button className="w-full btn-primary py-1 text-xs">Adicionar</button>
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <div className="section-card flex flex-col items-center py-16 text-center">
          <span className="text-5xl mb-3">ðŸ˜”</span>
          <p className="text-sm font-medium text-gray-900 dark:text-white mb-1">Nenhum produto encontrado</p>
          <p className="text-xs text-gray-500 dark:text-gray-400">Tente ajustar os filtros.</p>
        </div>
      )}
    </div>
  );
}
