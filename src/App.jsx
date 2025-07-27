import React, { useState } from 'react';
import Button from './components/Button';
import Input from './components/Input';

export default function App() {
  const [nome, setNome] = useState('');

  const handleClick = () => {
    alert(`Olá, ${nome || 'visitante'}!`);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white shadow-md rounded p-6 w-full max-w-sm">
        <h1 className="text-2xl font-bold mb-4 text-gray-800">Boas-vindas 👋</h1>
        <Input
          label="Seu nome:"
          name="nome"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
        />
        <Button onClick={handleClick}>Dizer Olá</Button>
      </div>
    </div>
  );
}