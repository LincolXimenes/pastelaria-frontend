import React from 'react';
import { formatCurrency } from '../../utils/formatters';
import Button from './Button';

export default function Card({ 
  title, 
  description, 
  preco, 
  imageUrl,
  categoria,
  showAddButton = false,
  onAddToCart,
  className = ''
}) {
  const handleAddToCart = () => {
    if (onAddToCart) {
      onAddToCart({ title, description, preco, imageUrl, categoria });
    }
  };

  return (
    <div className={`bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow ${className}`}>
      {/* Imagem ou placeholder */}
      <div className="h-48 bg-gradient-to-br from-yellow-100 to-yellow-200 flex items-center justify-center">
        {imageUrl ? (
          <img src={imageUrl} alt={title} className="w-full h-full object-cover" />
        ) : (
          <span className="text-6xl">🥟</span>
        )}
      </div>

      {/* Conteúdo */}
      <div className="p-6">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
          {preco && (
            <span className="text-lg font-bold text-yellow-600">
              {formatCurrency(preco)}
            </span>
          )}
        </div>
        
        {description && (
          <p className="text-gray-600 mb-4">{description}</p>
        )}

        {categoria && (
          <span className="inline-block bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full mb-4">
            {categoria}
          </span>
        )}

        {showAddButton && (
          <Button 
            variant="primary" 
            size="sm" 
            onClick={handleAddToCart}
            className="w-full"
          >
            Adicionar ao Carrinho 🛒
          </Button>
        )}
      </div>
    </div>
  );
}