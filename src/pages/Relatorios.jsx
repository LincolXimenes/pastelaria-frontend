import React from 'react';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';

export default function Relatorios() {
  return (
    <div>
      <Header />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-6">
          <h2 className="text-xl font-bold mb-4">Relatórios</h2>
          <p>Em breve: relatórios detalhados!</p>
        </main>
      </div>
    </div>
  );
}