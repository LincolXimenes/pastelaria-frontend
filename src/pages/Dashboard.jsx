import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Container from '../components/Container';

export default function Dashboard() {
    return (
        <div className="min-h-screen bg-gray-100 flex flex-col">
            <Header />

            <Container>
                <h1 className="text-2xl font-bold text-gray-800 mb-6">Dashboard</h1>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div className="bg-white p-4 shadow rounded-lg">
                        <h2 className="text-lg font-semibold text-gray-700">Resumo de Vendas</h2>
                        <p className="text-sm text-gray-500">Total de hoje: R$ 150,00</p>
                    </div>
                    <div className="bg-white p-4 shadow rounded-lg">
                        <h2 className="text-lg font-semibold text-gray-700">Pedidos Pendentes</h2>
                        <p className="text-sm text-gray-500">3 aguardando preparo</p>
                    </div>
                    <div className="bg-white p-4 shadow rounded-lg">
                        <h2 className="text-lg font-semibold text-gray-700">Produtos Cadastrados</h2>
                        <p className="text-sm text-gray-500">15 tipos de pastel</p>
                    </div>
                </div>
            </Container>

            <Footer />            
        </div>
    );
}