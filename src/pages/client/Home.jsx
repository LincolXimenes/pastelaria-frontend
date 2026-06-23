import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { produtoService } from '../../services/produtoService';

export default function Home() {
  const [destaques, setDestaques] = useState([]);

  useEffect(() => {
    const carregarDestaques = async () => {
      const result = await produtoService.listar({ ativo: true });
      if (result.success) {
        setDestaques(result.data.slice(0, 6));
      }
    };
    carregarDestaques();
  }, []);

  return (
    <div className="space-y-16">
      {/* Hero */}
      <section className="text-center py-20 lg:py-28">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-50 dark:bg-amber-500/10 rounded-full text-xs font-medium text-amber-700 dark:text-amber-400 mb-6">
          <span>🥟</span> Pasteis artesanais fresquinhos
        </div>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white leading-tight mb-6">
          Os Melhores Pastéis<br />da Cidade
        </h1>
        <p className="text-base text-gray-500 dark:text-gray-400 mb-8 max-w-xl mx-auto">
          Feitos com ingredientes frescos e muito carinho. Tradição e sabor em cada mordida!
        </p>
        <Link to="/cardapio" className="btn-primary px-8 py-3">
          Ver Cardápio
        </Link>
      </section>

      {/* Destaques */}
      {destaques.length > 0 && (
        <section>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white text-center mb-8">Nossos Favoritos</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {destaques.map(item => (
              <div key={item._id || item.id} className="card card-hover overflow-hidden">
                <div className="h-28 bg-amber-50 dark:bg-amber-500/10 flex items-center justify-center">
                  <span className="text-4xl">
                    {item.categoria === 'bebidas' ? '🥤' : item.categoria === 'sobremesas' ? '🍰' : '🥟'}
                  </span>
                </div>
                <div className="p-3">
                  <p className="text-xs font-semibold text-gray-900 dark:text-white truncate">{item.nome}</p>
                  <p className="text-xs text-amber-600 dark:text-amber-400 font-medium mt-0.5">R$ {Number(item.preco).toFixed(2)}</p>
                  <button className="w-full mt-2 btn-primary py-1 text-xs">Pedir</button>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Especialidades */}
      <section>
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white text-center mb-8">Nossas Especialidades</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {[
            { emoji: '🥟', title: 'Pastéis Artesanais', desc: 'Massa crocante e recheios generosos. Carne, queijo, frango e muito mais!', cat: 'pasteis' },
            { emoji: '🥤', title: 'Bebidas Geladas', desc: 'Sucos naturais e refrigerantes para acompanhar seu pastel favorito.', cat: 'bebidas' },
            { emoji: '🍰', title: 'Sobremesas', desc: 'Pastéis doces e sobremesas irresistíveis para finalizar.', cat: 'sobremesas' },
          ].map(({ emoji, title, desc, cat }) => (
            <div key={cat} className="card card-hover p-6 text-center">
              <span className="text-5xl mb-4 block">{emoji}</span>
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">{title}</h3>
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-4">{desc}</p>
              <Link to={`/cardapio?categoria=${cat}`} className="text-xs text-amber-600 dark:text-amber-400 hover:underline font-medium">
                Ver {title.split(' ')[0]} →
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gray-900 dark:bg-gray-800 text-white rounded-2xl p-12 text-center">
        <h2 className="text-2xl font-bold mb-3">Faça Seu Pedido Agora!</h2>
        <p className="text-gray-400 mb-6 text-sm">Delivery rápido. Sabor na sua casa em poucos cliques!</p>
        <Link to="/cardapio" className="bg-amber-500 hover:bg-amber-600 text-white px-8 py-3 rounded-lg font-medium transition-colors">
          Fazer Pedido
        </Link>
      </section>
    </div>
  );
}
