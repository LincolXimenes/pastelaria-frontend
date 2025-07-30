import React from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import Footer from './Footer';

export default function Layout({ children }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 p-6 bg-gray-100 text-black">
          {children}
        </main>
      </div>
      <Footer />
    </div>
  );
}