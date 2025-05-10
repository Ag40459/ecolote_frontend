import React from 'react';
import './index.css'; // Estilos globais e variáveis de tema
import Navbar from './components/Navbar/Navbar';
import Hero from './components/Hero/Hero';
import About from './components/About/About'; // Exemplo, criar este componente
import Features from './components/Features/Features'; // Exemplo
import HowItWorks from './components/HowItWorks/HowItWorks'; // Exemplo
import Environment from './components/Environment/Environment'; // Exemplo
import Comparison from './components/Comparison/Comparison'; // Exemplo
import Advantages from './components/Advantages/Advantages'; // Exemplo
import Innovation from './components/Innovation/Innovation'; // Exemplo
import Payment from './components/Payment/Payment'; // Exemplo
import Contact from './components/Contact/Contact'; // Exemplo
import Extras from './components/Extras/Extras'; // Exemplo
import Conclusion from './components/Conclusion/Conclusion'; // Exemplo
import Footer from './components/Footer/Footer';

function App() {
  // Lógica para alternar tema pode vir aqui ou em um contexto separado
  // Por enquanto, vamos assumir que a classe do tema é aplicada no body diretamente por um script separado (theme-switcher.js)

  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Features />
        <HowItWorks />
        <Environment />
        <Comparison />
        <Advantages />
        <Innovation />
        <Payment />
        <Contact />
        <Extras />
        <Conclusion />
      </main>
      <Footer />
      {/* Botão do WhatsApp pode ser um componente separado ou parte do Footer/global */}
      <a href="https://wa.me/5581985967343" target="_blank" rel="noopener noreferrer" className="whatsapp-float" aria-label="Contato via WhatsApp">
        <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="white"><path d="M16.003 4.622a11.38 11.38 0 0 0-11.383 11.383A11.38 11.38 0 0 0 16.003 27.39a11.38 11.38 0 0 0 11.383-11.384A11.38 11.38 0 0 0 16.003 4.622zm0 21.33a9.947 9.947 0 1 1 0-19.893 9.947 9.947 0 0 1 0 19.893z"/><path d="M19.682 17.096c-.304-.152-.95-.47-1.097-.52s-.254-.076-.356.076c-.102.152-.418.52-.52.621-.102.102-.203.114-.356-.038-.152-.152-.645-.237-1.228-.761-.458-.398-.761-.713-.863-.839-.102-.127-.013-.19.05-.254.051-.05.102-.127.152-.19.051-.063.076-.102.114-.177.038-.076.025-.127-.013-.19-.038-.063-.356-.851-.482-.977-.127-.127-.216-.127-.304-.127h-.24c-.102 0-.228.025-.356.102s-.47.457-.47.926c0 .47.482.977.545 1.053.063.076.95 1.445 2.307 2.03.32.152.57.228.773.292.28.089.533.076.723.05.203-.025.62-.254.712-.494.09-.24.09-.444.064-.494s-.076-.076-.114-.114z"/></svg>
      </a>
    </>
  );
}

export default App;
