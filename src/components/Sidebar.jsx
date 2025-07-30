import React from 'react';
import { Link } from 'react-router-dom';

export default function Sidebar() {
    return (
        <aside className="bg-gray-800 text-white w-48 h-full p-4">
            {/* <div className="text-xl font-bold mb-6">Pastelaria</div> */}
            <nav className="flex flex-col space-y-2">
                <Link to="/" className="hover:underline">Home</Link>
                <Link to="/dashboard" className="hover:underline">Dashboard</Link>
                <Link to="/pedidos" className="hover:underline">Pedidos</Link>
                <Link to="/produtos" className="hover:underline">Produtos</Link>
                <Link to="/relatorios" className="hover:underline">Relatórios</Link>
                
            </nav>            
        </aside>
    );
}