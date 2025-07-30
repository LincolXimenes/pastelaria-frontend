import React from 'react';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import CardProduto from '../components/CardProduto';

const produtos = [
    { nome: 'Pastel de Carne', preco: 8, descricao: 'Delicioso pastel recheado com carne', imagem: 'https://via.placeholder.com/150' },
    { nome: 'Pastel de Queijo', preco: 7, descricao: 'Saboroso pastel recheado com queijo', imagem: 'https://via.placeholder.com/150' },
    { nome: 'Pastel de Frango', preco: 9, descricao: 'Irresistível pastel recheado com frango', imagem: 'https://via.placeholder.com/150' },
];

export default function Produtos() {
    return (
        <div>
            <Header />
            <div className="flex">
                <Sidebar />
                <main className="flex-1 p-6">
                    <h2 className="text-2xl font-bold mb-4">Produtos</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {produtos.map((p, i) => (
                            <CardProduto key={i} {...p} />
                        ))}
                    </div>
                </main>
            </div>
        </div>
    );
}