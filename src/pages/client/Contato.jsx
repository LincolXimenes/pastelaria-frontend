import React, { useState } from 'react';

export default function Contato() {
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    telefone: '',
    assunto: '',
    mensagem: ''
  });
  const [enviando, setEnviando] = useState(false);
  const [mensagemSucesso, setMensagemSucesso] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setEnviando(true);
    
    // Simular envio
    setTimeout(() => {
      setMensagemSucesso(true);
      setEnviando(false);
      setFormData({
        nome: '',
        email: '',
        telefone: '',
        assunto: '',
        mensagem: ''
      });
      
      // Limpar mensagem após 5 segundos
      setTimeout(() => setMensagemSucesso(false), 5000);
    }, 2000);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="space-y-16">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">📞 Entre em Contato</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Tem alguma dúvida, sugestão ou quer fazer um pedido especial? 
          Estamos aqui para te ajudar!
        </p>
      </div>

      {/* Grid Principal: Informações + Formulário */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        {/* Informações de Contato */}
        <div className="space-y-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Nossa Localização</h2>
            
            {/* Cards de Informação */}
            <div className="space-y-6">
              {/* Endereço */}
              <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-100">
                <div className="flex items-start space-x-4">
                  <div className="text-4xl">📍</div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Endereço</h3>
                    <p className="text-gray-600 text-lg">
                      Rua das Delícias, 123 - Centro<br />
                      São Paulo - SP, 01234-567
                    </p>
                  </div>
                </div>
              </div>

              {/* Telefone */}
              <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-100">
                <div className="flex items-start space-x-4">
                  <div className="text-4xl">📞</div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Telefones</h3>
                    <p className="text-gray-600 text-lg">
                      <strong>WhatsApp:</strong> (11) 99999-9999<br />
                      <strong>Fixo:</strong> (11) 3333-4444
                    </p>
                  </div>
                </div>
              </div>

              {/* Email */}
              <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-100">
                <div className="flex items-start space-x-4">
                  <div className="text-4xl">📧</div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">E-mail</h3>
                    <p className="text-gray-600 text-lg">
                      contato@pastealriadelia.com<br />
                      pedidos@pastealriadelia.com
                    </p>
                  </div>
                </div>
              </div>

              {/* Horários */}
              <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-100">
                <div className="flex items-start space-x-4">
                  <div className="text-4xl">🕐</div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Horário de Funcionamento</h3>
                    <div className="text-gray-600 text-lg space-y-1">
                      <p><strong>Segunda a Sexta:</strong> 10h às 22h</p>
                      <p><strong>Sábados:</strong> 10h às 23h</p>
                      <p><strong>Domingos:</strong> 14h às 20h</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Mapa Placeholder */}
          <div className="bg-gray-200 rounded-xl h-64 flex items-center justify-center">
            <div className="text-center text-gray-500">
              <div className="text-4xl mb-2">🗺️</div>
              <p className="text-lg">Mapa da localização</p>
              <p className="text-sm">(Integração com Google Maps)</p>
            </div>
          </div>
        </div>

        {/* Formulário de Contato */}
        <div>
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Envie sua Mensagem</h2>
            
            {mensagemSucesso && (
              <div className="bg-green-100 border border-green-400 text-green-700 px-6 py-4 rounded-lg mb-6">
                <div className="flex items-center">
                  <span className="text-2xl mr-2">✅</span>
                  <span className="font-medium">Mensagem enviada com sucesso! Retornaremos em breve.</span>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Nome */}
              <div>
                <label htmlFor="nome" className="block text-sm font-medium text-gray-700 mb-2">
                  Nome Completo *
                </label>
                <input
                  type="text"
                  id="nome"
                  name="nome"
                  value={formData.nome}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 text-lg"
                  placeholder="Seu nome completo"
                />
              </div>

              {/* Email e Telefone */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    E-mail *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 text-lg"
                    placeholder="seu@email.com"
                  />
                </div>
                
                <div>
                  <label htmlFor="telefone" className="block text-sm font-medium text-gray-700 mb-2">
                    Telefone
                  </label>
                  <input
                    type="tel"
                    id="telefone"
                    name="telefone"
                    value={formData.telefone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 text-lg"
                    placeholder="(11) 99999-9999"
                  />
                </div>
              </div>

              {/* Assunto */}
              <div>
                <label htmlFor="assunto" className="block text-sm font-medium text-gray-700 mb-2">
                  Assunto *
                </label>
                <select
                  id="assunto"
                  name="assunto"
                  value={formData.assunto}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 text-lg"
                >
                  <option value="">Selecione o assunto</option>
                  <option value="pedido">🛒 Fazer Pedido</option>
                  <option value="duvida">❓ Dúvida sobre Produtos</option>
                  <option value="sugestao">💡 Sugestão</option>
                  <option value="reclamacao">😞 Reclamação</option>
                  <option value="elogio">😊 Elogio</option>
                  <option value="outro">📝 Outro</option>
                </select>
              </div>

              {/* Mensagem */}
              <div>
                <label htmlFor="mensagem" className="block text-sm font-medium text-gray-700 mb-2">
                  Mensagem *
                </label>
                <textarea
                  id="mensagem"
                  name="mensagem"
                  value={formData.mensagem}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 text-lg resize-none"
                  placeholder="Escreva sua mensagem aqui..."
                />
              </div>

              {/* Botão de Envio */}
              <button
                type="submit"
                disabled={enviando}
                className="w-full bg-yellow-600 text-white py-4 px-6 rounded-lg hover:bg-yellow-700 transition-colors font-semibold text-lg disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
              >
                {enviando ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Enviando...
                  </span>
                ) : (
                  <span className="flex items-center justify-center">
                    📤 Enviar Mensagem
                  </span>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Call to Action WhatsApp */}
      <div className="bg-green-600 text-white rounded-2xl p-12 text-center">
        <h2 className="text-3xl lg:text-4xl font-bold mb-4">💬 Prefere WhatsApp?</h2>
        <p className="text-xl mb-8 max-w-2xl mx-auto">
          Para pedidos mais rápidos, entre em contato diretamente pelo WhatsApp!
        </p>
        <a 
          href="https://wa.me/5511999999999?text=Olá! Gostaria de fazer um pedido na Pastelaria Delícia"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-white text-green-600 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-gray-100 transition-colors inline-block shadow-lg hover:shadow-xl"
        >
          📱 Abrir WhatsApp
        </a>
      </div>
    </div>
  );
}