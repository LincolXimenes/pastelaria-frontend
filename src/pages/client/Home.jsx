import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const mockItems = [
    { id: 1, title: 'Pastel de Carne', description: 'Com bastante recheio', preco: 15.50 },
    { id: 2, title: 'Pastel de Queijo', description: 'Derretido e crocante', preco: 12.50 },
    { id: 3, title: 'Pastel de Frango', description: 'Com catupiry', preco: 16.00 },
    { id: 4, title: 'Pastel de Pizza', description: 'Molho especial', preco: 18.00 },
    { id: 5, title: 'Pastel Doce', description: 'Banana com canela', preco: 14.00 },
    { id: 6, title: 'Coca-Cola', description: 'Geladinha 350ml', preco: 5.00 },
  ];

  return (
    <div className="space-y-20">
      {/* Hero Section - EXPANDIDO */}
      <section className="text-center bg-gradient-to-r from-yellow-400 to-yellow-600 -mx-6 lg:-mx-8 xl:-mx-12 px-6 lg:px-8 xl:px-12 py-24 lg:py-32 rounded-2xl">
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-8">
          Os Melhores Pastéis da Cidade!
        </h1>
        <p className="text-xl lg:text-2xl text-yellow-100 mb-10 max-w-4xl mx-auto">
          Deliciosos pastéis artesanais feitos com ingredientes frescos e muito carinho.
          Tradição e sabor em cada mordida!
        </p>
        <Link
          to="/cardapio"
          className="bg-white text-yellow-600 px-10 py-5 rounded-xl font-semibold text-xl hover:bg-gray-100 transition-colors inline-block shadow-lg hover:shadow-xl"
        >
          Ver Cardápio 🥟
        </Link>
      </section>

      {/* Produtos em Destaque - GRID EXPANDIDO */}
      <section>
        <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 text-center mb-16">Nossos Pastéis Favoritos</h2>
        {/* Grid para telas grandes: 6 colunas */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-8">
          {mockItems.map(item => (
            <div key={item.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="h-48 bg-gradient-to-br from-yellow-100 to-yellow-200 flex items-center justify-center">
                <span className="text-6xl">🥟</span>
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-semibold text-gray-900">{item.title}</h3>
                  <span className="text-lg font-bold text-yellow-600">
                    R$ {item.preco.toFixed(2)}
                  </span>
                </div>
                <p className="text-gray-600 mb-4 text-sm">{item.description}</p>
                <button className="w-full bg-yellow-600 text-white px-4 py-2 rounded-lg hover:bg-yellow-700 transition-colors font-medium">
                  Adicionar 🛒
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Categorias em Destaque - LAYOUT EXPANDIDO */}
      <section>
        <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 text-center mb-16">Nossas Especialidades</h2>
        {/* Grid para telas grandes: 3 colunas com mais espaçamento */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Pastéis */}
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300">
            <div className="h-64 bg-gradient-to-br from-yellow-400 to-yellow-500 flex items-center justify-center">
              <span className="text-8xl">🥟</span>
            </div>
            <div className="p-8">
              <h3 className="text-2xl font-semibold mb-4">Pastéis Artesanais</h3>
              <p className="text-gray-600 mb-6 text-base">
                Massa crocante e recheios generosos. Carne, queijo, frango e muito mais!
              </p>
              <Link to="/cardapio?categoria=pasteis" className="text-yellow-600 font-medium hover:text-yellow-700 text-lg">
                Ver Pastéis →
              </Link>
            </div>
          </div>

          {/* Bebidas */}
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300">
            <div className="h-64 bg-gradient-to-br from-blue-400 to-blue-500 flex items-center justify-center">
              <span className="text-8xl">🥤</span>
            </div>
            <div className="p-8">
              <h3 className="text-2xl font-semibold mb-4">Bebidas Geladas</h3>
              <p className="text-gray-600 mb-6 text-base">
                Sucos naturais, refrigerantes e bebidas especiais para acompanhar.
              </p>
              <Link to="/cardapio?categoria=bebidas" className="text-yellow-600 font-medium hover:text-yellow-700 text-lg">
                Ver Bebidas →
              </Link>
            </div>
          </div>

          {/* Sobremesas */}
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300">
            <div className="h-64 bg-gradient-to-br from-pink-400 to-pink-500 flex items-center justify-center">
              <span className="text-8xl">🍰</span>
            </div>
            <div className="p-8">
              <h3 className="text-2xl font-semibold mb-4">Sobremesas</h3>
              <p className="text-gray-600 mb-6 text-base">
                Pastéis doces, pudins e sobremesas irresistíveis para finalizar.
              </p>
              <Link to="/cardapio?categoria=sobremesas" className="text-yellow-600 font-medium hover:text-yellow-700 text-lg">
                Ver Sobremesas →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action - EXPANDIDO */}
      <section className="bg-gray-900 text-white rounded-2xl p-16 text-center">
        <h2 className="text-4xl lg:text-5xl font-bold mb-6">Faça Seu Pedido Agora!</h2>
        <p className="text-xl lg:text-2xl text-gray-300 mb-10 max-w-3xl mx-auto">
          Delivery rápido e fácil. Sabor na sua casa em poucos cliques!
        </p>
        <Link
          to="/cardapio"
          className="bg-yellow-600 text-white px-10 py-5 rounded-xl font-semibold text-xl hover:bg-yellow-700 transition-colors inline-block shadow-lg hover:shadow-xl"
        >
          Fazer Pedido 📱
        </Link>
      </section>
    </div>
  );
}


