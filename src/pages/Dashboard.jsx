import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Container from '../components/Container';
import DashboardCard from '../components/DashboardCard';


export default function Dashboard() {
    return (
        <div className="min-h-screen bg-gray-100 flex flex-col">
            <Header />

            <Container>
                <h1 className="text-2xl font-bold text-gray-800 mb-6">Dashboard</h1>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <DashboardCard
                        title="Resumo de Vendas"
                        description="Total de hoje: R$ 150,00"
                    />
                    <DashboardCard
                        title="Pedidos Pendentes"
                        description="3 aguardando preparo"
                    />
                    <DashboardCard
                        title="Produtos Cadastrados"
                        description="15 tipos de pastel"
                    />
                </div>
                                
            </Container>

            <Footer />            
        </div>
    );
}