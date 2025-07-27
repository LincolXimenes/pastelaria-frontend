import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Header from "./components/Header";


function App() {
  return (
    <>
      <Header />
      <main className="p-4">
        <h2 className="text-2xl font-semibold">Bem-vindo à Pastelaria!</h2> 
        <p>Explore nosso cardápio delicioso!</p> 
      </main>
    </>
  );
}

export default App;
