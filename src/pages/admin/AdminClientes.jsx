import React, { useState, useEffect } from 'react';
import { clienteService } from '../../services/clienteService';

export default function AdminClientes() {
  const [clientes, setClientes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState(null);
  const [busca, setBusca] = useState('');

  const carregarClientes = async () => {
    setLoading(true);
    setErro(null);
    const result = await clienteService.listar();
    if (result.success) {
      setClientes(result.data);
    } else {
      setErro(result.error);
    }
    setLoading(false);
  };

  useEffect(() => {
    carregarClientes();
  }, []);

  const clientesFiltrados = clientes.filter(c =>
    !busca ||
    c.nome?.toLowerCase().includes(busca.toLowerCase()) ||
    c.email?.toLowerCase().includes(busca.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-96">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-yellow-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Carregando clientes...</p>
        </div>
      </div>
    );
  }

  if (erro) {
    return (
      <div className="flex justify-center items-center min-h-96">
        <div className="text-center">
          <div className="text-6xl mb-4">⚠️</div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Erro ao carregar clientes</h3>
          <p className="text-gray-600 mb-4">{erro}</p>
          <button onClick={carregarClientes} className="bg-yellow-600 text-white px-6 py-2 rounded-lg hover:bg-yellow-700 transition-colors">
            Tentar novamente
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-10">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-500 to-indigo-600 rounded-2xl p-8 text-white">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h1 className="text-4xl lg:text-5xl font-bold mb-2">👥 Clientes</h1>
            <p className="text-xl text-indigo-100">Gerencie sua base de clientes</p>
          </div>
          <div className="mt-6 lg:mt-0 text-right">
            <div className="text-3xl lg:text-4xl font-bold">{clientes.length}</div>
            <div className="text-lg text-indigo-100">Clientes cadastrados</div>
          </div>
        </div>
      </div>

      {/* Busca */}
      <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
        <label className="block text-lg font-medium text-gray-700 mb-3">🔍 Buscar Cliente</label>
        <input
          type="text"
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
          placeholder="Nome ou e-mail..."
          className="w-full md:w-1/2 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-lg"
        />
      </div>

      {/* Tabela */}
      <div className="bg-white rounded-2xl shadow-xl border border-gray-100">
        <div className="p-8 border-b border-gray-100">
          <h2 className="text-2xl font-bold text-gray-900">
            {clientesFiltrados.length} {clientesFiltrados.length === 1 ? 'cliente encontrado' : 'clientes encontrados'}
          </h2>
        </div>

        {clientesFiltrados.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-8 py-6 text-left text-lg font-semibold text-gray-900">Nome</th>
                  <th className="px-8 py-6 text-left text-lg font-semibold text-gray-900">E-mail</th>
                  <th className="px-8 py-6 text-left text-lg font-semibold text-gray-900">Telefone</th>
                  <th className="px-8 py-6 text-left text-lg font-semibold text-gray-900">Cadastro</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {clientesFiltrados.map(cliente => (
                  <tr key={cliente._id || cliente.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-8 py-6">
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center">
                          <span className="text-indigo-600 font-bold">
                            {(cliente.nome || 'C').charAt(0).toUpperCase()}
                          </span>
                        </div>
                        <p className="text-lg font-semibold text-gray-900">{cliente.nome}</p>
                      </div>
                    </td>
                    <td className="px-8 py-6 text-gray-700">{cliente.email}</td>
                    <td className="px-8 py-6 text-gray-700">{cliente.telefone || '—'}</td>
                    <td className="px-8 py-6 text-gray-700">
                      {cliente.createdAt
                        ? new Date(cliente.createdAt).toLocaleDateString('pt-BR')
                        : '—'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">👤</div>
            <p className="text-xl text-gray-600">Nenhum cliente encontrado.</p>
          </div>
        )}
      </div>
    </div>
  );
}
