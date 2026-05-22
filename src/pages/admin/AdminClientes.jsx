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
          <button onClick={carregarClientes} className="btn-primary">Tentar novamente</button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Banner */}
      <div className="page-banner">
        <div>
          <h1 className="page-title">Clientes</h1>
          <p className="page-subtitle">{clientes.length} cliente(s) cadastrado(s)</p>
        </div>
      </div>

      {/* Busca */}
      <div className="section-card">
        <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1.5">Buscar</label>
        <input
          type="text"
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
          placeholder="Nome ou e-mailâ€¦"
          className="input max-w-sm"
        />
      </div>

      {/* Tabela */}
      {clientesFiltrados.length > 0 ? (
        <div className="table-wrapper">
          <table className="w-full">
            <thead>
              <tr>
                <th className="table-header">Cliente</th>
                <th className="table-header">E-mail</th>
                <th className="table-header">Telefone</th>
                <th className="table-header">Cadastro</th>
              </tr>
            </thead>
            <tbody>
              {clientesFiltrados.map(cliente => (
                <tr key={cliente._id || cliente.id} className="table-row">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-amber-100 dark:bg-amber-500/20 rounded-full flex items-center justify-center text-sm font-bold text-amber-700 dark:text-amber-400">
                        {(cliente.nome || 'C').charAt(0).toUpperCase()}
                      </div>
                      <p className="text-sm font-medium text-gray-900 dark:text-white">{cliente.nome}</p>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">{cliente.email}</td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">{cliente.telefone || 'â€”'}</td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">
                    {cliente.createdAt ? new Date(cliente.createdAt).toLocaleDateString('pt-BR') : 'â€”'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="section-card flex flex-col items-center justify-center py-16 text-center">
          <span className="text-4xl mb-3">ðŸ‘¤</span>
          <p className="text-sm text-gray-500 dark:text-gray-400">Nenhum cliente encontrado.</p>
        </div>
      )}
    </div>
  );
}
