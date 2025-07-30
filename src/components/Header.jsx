import React from 'react';
import { Link } from 'react-router-dom';

export default function Header() {
    return (
        <header className="bg-yellow-400 p-4 flex justify-between items-center">
            <h1 className="text-xl font-bold">Pastelaria</h1>
            <nav>                
              <Link to="/" className="mx-2 hover:underline">Dashboard</Link>
              <Link to="/produtos" className="mx-2 hover:underline">Produtos</Link>
              <Link to="/pedidos" className="mx-2 hover:underline">Pedidos</Link>
              <Link to="/relatorios" className="mx-2 hover:underline">Relatórios</Link>
            </nav>
        </header>
  );
}