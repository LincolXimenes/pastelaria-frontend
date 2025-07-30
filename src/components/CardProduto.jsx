import React from 'react';


export default function CardProduto({ nome, preco, descricao, imagem }) {
    return (
        <div className="bg-white rounded-lg shadow-md p-4 flex flex-col items-center">
            {imagem && (
                <img src={imagem} alt={nome} className="w-32 h-32 object-cover rounded mb-2" />
            )}
            <h3 className="text-lg font-bold">{nome}</h3>
            <p className="text-gray-600">{descricao}</p>
            <span className="text-green-600 font-semibold mt-2">R$ {preco}</span>
        </div>
    );
}