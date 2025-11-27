import React, { useState, useEffect } from 'react';
import { produtoService } from '../../services/produtoService';
import LoadingSpinner from '../components/LoadingSpinner';
import Alert from '../components/Alert';
import { formatCurrency } from '../../utils/formatters';
import { validateProduct } from '../../utils/validators';

export default function Produtos() {
  const [produtos, setProdutos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [alert, setAlert] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [formData, setFormData] = useState({
    nome: '',
    descricao: '',
    preco: '',
    categoria: '',
    ativo: true
  });

  const carregarProdutos = async () => {
    setLoading(true);
    const result = await produtoService.listar();
    
    if (result.success) {
      setProdutos(result.data);
      setAlert(null);
    } else {
      setAlert({ type: 'error', message: result.error });
    }
    setLoading(false);
  };

  useEffect(() => {
    carregarProdutos();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validar dados
    const validation = validateProduct(formData);
    if (!validation.isValid) {
      const firstError = Object.values(validation.errors)[0];
      setAlert({ type: 'error', message: firstError });
      return;
    }

    setLoading(true);
    
    let result;
    if (editingProduct) {
      result = await produtoService.atualizar(editingProduct._id, formData);
    } else {
      result = await produtoService.criar(formData);
    }

    if (result.success) {
      setAlert({ 
        type: 'success', 
        message: `Produto ${editingProduct ? 'atualizado' : 'criado'} com sucesso!` 
      });
      setShowModal(false);
      resetForm();
      carregarProdutos();
    } else {
      setAlert({ type: 'error', message: result.error });
    }
    
    setLoading(false);
  };

  const handleEdit = (produto) => {
    setEditingProduct(produto);
    setFormData({
      nome: produto.nome,
      descricao: produto.descricao || '',
      preco: produto.preco.toString(),
      categoria: produto.categoria,
      ativo: produto.ativo
    });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Tem certeza que deseja deletar este produto?')) return;
    
    setLoading(true);
    const result = await produtoService.deletar(id);
    
    if (result.success) {
      setAlert({ type: 'success', message: 'Produto deletado com sucesso!' });
      carregarProdutos();
    } else {
      setAlert({ type: 'error', message: result.error });
    }
    
    setLoading(false);
  };

  const resetForm = () => {
    setFormData({
      nome: '',
      descricao: '',
      preco: '',
      categoria: '',
      ativo: true
    });
    setEditingProduct(null);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    resetForm();
  };

  if (loading && produtos.length === 0) {
    return <LoadingSpinner size="lg" message="Carregando produtos..." />;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Produtos</h1>
        <button
          onClick={() => setShowModal(true)}
          className="bg-yellow-600 text-white px-4 py-2 rounded-md hover:bg-yellow-700 transition-colors"
        >
          Novo Produto
        </button>
      </div>

      {alert && (
        <Alert 
          type={alert.type} 
          message={alert.message}
          onClose={() => setAlert(null)}
        />
      )}

      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Nome
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Categoria
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Preço
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Ações
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {produtos.map((produto) => (
                <tr key={produto._id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">
                        {produto.nome}
                      </div>
                      {produto.descricao && (
                        <div className="text-sm text-gray-500">
                          {produto.descricao}
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {produto.categoria}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {formatCurrency(produto.preco)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 text-xs font-semibold rounded-full ${
                      produto.ativo 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {produto.ativo ? 'Ativo' : 'Inativo'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      onClick={() => handleEdit(produto)}
                      className="text-indigo-600 hover:text-indigo-900 mr-3"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => handleDelete(produto._id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      Deletar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {produtos.length === 0 && !loading && (
          <div className="text-center py-8 text-gray-500">
            Nenhum produto encontrado
          </div>
        )}
      </div>

      {/* Modal de criação/edição */}
      {showModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                {editingProduct ? 'Editar Produto' : 'Novo Produto'}
              </h3>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Nome</label>
                  <input
                    type="text"
                    value={formData.nome}
                    onChange={(e) => setFormData({...formData, nome: e.target.value})}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-yellow-500 focus:border-yellow-500"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700">Descrição</label>
                  <textarea
                    value={formData.descricao}
                    onChange={(e) => setFormData({...formData, descricao: e.target.value})}
                    rows={3}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-yellow-500 focus:border-yellow-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700">Preço</label>
                  <input
                    type="number"
                    step="0.01"
                    value={formData.preco}
                    onChange={(e) => setFormData({...formData, preco: e.target.value})}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-yellow-500 focus:border-yellow-500"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700">Categoria</label>
                  <select
                    value={formData.categoria}
                    onChange={(e) => setFormData({...formData, categoria: e.target.value})}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-yellow-500 focus:border-yellow-500"
                    required
                  >
                    <option value="">Selecione uma categoria</option>
                    <option value="Pastéis">Pastéis</option>
                    <option value="Bebidas">Bebidas</option>
                    <option value="Sobremesas">Sobremesas</option>
                    <option value="Acompanhamentos">Acompanhamentos</option>
                  </select>
                </div>
                
                <div className="flex items-center">
                  <input
                    id="ativo"
                    type="checkbox"
                    checked={formData.ativo}
                    onChange={(e) => setFormData({...formData, ativo: e.target.checked})}
                    className="h-4 w-4 text-yellow-600 focus:ring-yellow-500 border-gray-300 rounded"
                  />
                  <label htmlFor="ativo" className="ml-2 block text-sm text-gray-900">
                    Produto ativo
                  </label>
                </div>
                
                <div className="flex justify-end space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={handleCloseModal}
                    className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="px-4 py-2 bg-yellow-600 text-white rounded-md hover:bg-yellow-700 disabled:opacity-50"
                  >
                    {loading ? 'Salvando...' : 'Salvar'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}