import React, { useState } from 'react';
import Button from '../components/Button';
import Card from '../components/Card';
import Modal from '../components/Modal';




export default function Home() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const mockItems = [
        {id:1, title: 'Pastel de Carne', description: 'Com bastante recheio' },
        {id:2, title: 'Pastel de Queijo', description: 'Derretido e crocante' },
        {id:3, title: 'Pastel de Frango', description: 'Com catupiry' }, 
     ];
     
    return (
        <div className="min-h-screen bg-gray-50 p-6">
          <header className="mb-6">
             <h1 className="text-2xl font-bold text-gray-800">Painel da Pastelaria</h1>
         </header>

          <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
               {mockItems.map(item => (
                   <Card key={item.id} title={item.title} description={item.description} />
                ))}
            </section>

            <div className="mt-8">
                <Button onClick={() => setIsModalOpen(true)}>Adicionar Novo</Button>
            </div>

         <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
             title="Adicionar Item"
         >
             <p>Aqui vai o formulário ou conteúdo para adicionar novo item.</p>
         </Modal>
     </div>
    );
}