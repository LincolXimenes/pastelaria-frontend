import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

export default function Cardapio() {
  const [searchParams] = useSearchParams();
  const categoriaInicial = searchParams.get('categoria') || '';
  
  const [produtos, setProdutos] = useState([]);
  const [categoria, setCategoria] = useState(categoriaInicial);
  const [ordenacao, setOrdenacao] = useState('nome');
  const [busca, setBusca] = useState('');
  const [loading, setLoading] = useState(true);

  // Dados mock enquanto não temos backend
  const produtosMock = [
    { id: 1, nome: 'Pastel de Carne', preco: 15.50, categoria: 'pasteis', descricao: 'Delicioso pastel com recheio generoso de carne moída temperada' },
    { id: 2, nome: 'Pastel de Queijo', preco: 12.50, categoria: 'pasteis', descricao: 'Crocante pastel recheado com queijo derretido' },
    { id: 3, nome: 'Pastel de Frango', preco: 16.00, categoria: 'pasteis', descricao: 'Saboroso pastel com frango desfiado e catupiry' },
    { id: 4, nome: 'Pastel de Pizza', preco: 18.00, categoria: 'pasteis', descricao: 'Pastel recheado com molho de tomate, queijo e orégano' },
    { id: 5, nome: 'Coca-Cola 350ml', preco: 5.00, categoria: 'bebidas', descricao: 'Refrigerante gelado' },
    { id: 6, nome: 'Suco de Laranja', preco: 6.50, categoria: 'bebidas', descricao: 'Suco natural de laranja' },
    { id: 7, nome: 'Pudim de Leite', preco: 8.00, categoria: 'sobremesas', descricao: 'Cremoso pudim caseiro' },
    { id: 8, nome: 'Brigadeiro', preco: 3.50, categoria: 'sobremesas', descricao: 'Doce tradicional brasileiro' }
  ];

  const categorias = [
    { value: '', label: 'Todas as Categorias', icon: '🍽️' },
    { value: 'pasteis', label: 'Pastéis', icon: '🥟' },
    { value: 'bebidas', label: 'Bebidas', icon: '🥤' },
    { value: 'sobremesas', label: 'Sobremesas', icon: '🍰' }
  ];

  useEffect(() => {
    // Simular carregamento
    setLoading(true);
    setTimeout(() => {
      setProdutos(produtosMock);
      setLoading(false);
    }, 800);
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
      <div className="flex justify-center items-center min-h-96">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-yellow-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Carregando cardápio...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">🍽️ Nosso Cardápio</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Explore nossa seleção de pastéis artesanais, bebidas refrescantes e sobremesas irresistíveis!
        </p>
      </div>

      {/* Filtros */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Busca */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">🔍 Buscar</label>
            <input
              type="text"
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
              placeholder="Digite o nome do produto..."
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-yellow-500 focus:border-yellow-500"
            />
          </div>

          {/* Categoria */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">🏷️ Categoria</label>
            <select
              value={categoria}
              onChange={(e) => setCategoria(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-yellow-500 focus:border-yellow-500"
            >
              {categorias.map(cat => (
                <option key={cat.value} value={cat.value}>
                  {cat.icon} {cat.label}
                </option>
              ))}
            </select>
          </div>

          {/* Ordenação */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">📊 Ordenar por</label>
            <select
              value={ordenacao}
              onChange={(e) => setOrdenacao(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-yellow-500 focus:border-yellow-500"
            >
              <option value="nome">Nome (A-Z)</option>
              <option value="preco-asc">Preço (Menor → Maior)</option>
              <option value="preco-desc">Preço (Maior → Menor)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Resultados */}
      <div>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-gray-900">
            {produtosFiltrados.length} {produtosFiltrados.length === 1 ? 'produto encontrado' : 'produtos encontrados'}
          </h2>
        </div>

        {/* Grid de Produtos - EXPANDIDO PARA TELAS GRANDES */}
        {produtosFiltrados.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6 gap-8">
            {produtosFiltrados.map(produto => (
              <div key={produto.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                {/* Imagem placeholder */}
                <div className="h-48 bg-gradient-to-br from-yellow-100 to-yellow-200 flex items-center justify-center">
                  <span className="text-6xl">
                    {produto.categoria === 'pasteis' ? '🥟' :
                     produto.categoria === 'bebidas' ? '🥤' : '🍰'}
                  </span>
                </div>

                <div className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">{produto.nome}</h3>
                    <span className="text-xl font-bold text-yellow-600">
                      {formatCurrency(produto.preco)}
                    </span>
                  </div>

                  <p className="text-gray-600 text-sm mb-4">{produto.descricao}</p>

                  <span className="inline-block bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full mb-4 capitalize">
                    {produto.categoria}
                  </span>

                  <button className="w-full bg-yellow-600 text-white py-2 px-4 rounded-md hover:bg-yellow-700 transition-colors font-medium">
                    🛒 Adicionar ao Carrinho
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">😔</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Nenhum produto encontrado</h3>
            <p className="text-gray-600">Tente ajustar os filtros ou buscar por outro termo.</p>
          </div>
        )}
      </div>
    </div>
  );
}