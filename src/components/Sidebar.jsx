import React from 'react';
import { Link } from 'react-router-dom';

export default function Sidebar() {
    return (
        <aside className="bg-gray-100 w-48 min-h-screen p-4">
            {/* <div className="text-xl font-bold mb-6">Pastelaria</div> */}
            <nav className="flex flex-col gap-2">
                <Link to="/" className="hover:underline">Home</Link>
                <Link to="/produtos" className="hover:underline">Produtos</Link>
                <Link to="/pedidos" className="hover:underline">Pedidos</Link>
                <Link to="/relatorios" className="hover:underline">Relatórios</Link>
                {/* <Link to="/dashboard" className="hover:underline">Dashboard</Link> */}

            </nav>
        </aside>
    );
}