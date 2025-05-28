import { useState, useEffect, useRef } from 'react';
import styles from './Hero.module.css';
import { formatCurrencyInput } from '../../utils/calc';
import SimulationModal from '../SimulationModal/SimulationModal';
import Button3DRotate from '../UI/ComponentsAnimation/Button3DRotate';

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const [billValue, setBillValue] = useState(''); // Armazena o valor formatado
  const [showSimulator, setShowSimulator] = useState(false);
  const [showModal, setShowModal] = useState(false);
  // Estado adicional para armazenar o valor numérico puro
  const [numericBillValue, setNumericBillValue] = useState(0);

   const slides =  [ {
      title: "Energia Solar: Agora Acessível Para Todos",
      content: " Mora de aluguel ou em apartamento? Sem problemas! O Ecolote leva a energia solar até você, eliminando a necessidade de telhado próprio e democratizando o acesso à energia limpa e barata."
    },
    {
      title: "Sua Usina Solar Sem Custo Adicional? Sim!",
      content: " É simples: troque o gasto mensal da sua conta de luz pela parcela da sua própria usina solar. Energia limpa e economia real, sem precisar tirar R$1 do bolso para começar."
    },
    {
      title: " Sua Mini Usina Solar Remota",
      content: " Adquira sua mini usina solar remota em seu futuro bairro rural solar, com escritura no seu nome. É seu ativo, gerando energia limpa e créditos que reduzem sua conta para taxa mínima."
    },
    {
      title: "Investimento Inteligente e Sustentável",
      content: " Veja seu investimento se pagar em cerca de 5 anos com a economia mensal. Tenha um ativo que valoriza, contribua para um planeta mais verde e garantia de 10 anos"
    }
  ];

  // Controle do carrossel
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      nextSlide();
    }, 9000);
    return () => clearInterval(interval);
  }, [isPaused, currentSlide]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const handleTouchStart = (e) => {
    if (e.target.closest('button') || e.target.closest('input') || e.target.closest('form')) {
      return; // Ignora toques em elementos interativos
    }
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (touchStart === null || touchEnd === null) return;
    const distance = touchStart - touchEnd;

    if (Math.abs(distance) > 100) {
      if (distance > 0) {
        nextSlide();
      } else {
        prevSlide();
      }
    }

    setTouchStart(null);
    setTouchEnd(null);
  };

  const handleSimulatorToggle = () => {
    setShowSimulator(!showSimulator);
  };

  // Novo manipulador para o input de valor usando a função importada
  const handleBillValueChange = (e) => {
    const rawValue = e.target.value;
    const formattedValue = formatCurrencyInput(rawValue);
    setBillValue(formattedValue);

    // Atualiza o valor numérico puro
    const digits = rawValue.replace(/\D/g, '');
    setNumericBillValue(digits ? parseFloat(digits) / 100 : 0);
  };

  const handleSimulatorSubmit = (e) => {
    e.preventDefault();
    // Usa o valor numérico puro que já está no estado
    // console.log("Valor numérico para simulação:", numericBillValue);
    setShowModal(true);
    setShowSimulator(false);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <section
      id="hero"
      className={styles.heroSection} // A classe principal que pode receber variáveis de tema
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Container para os blobs animados */}
      <div className={styles.blobContainer}>
        <div className={`${styles.blob} ${styles.blob1}`}></div>
        <div className={`${styles.blob} ${styles.blob2}`}></div>
        <div className={`${styles.blob} ${styles.blob3}`}></div>
      </div>

      {/* Overlay com padrão de pontos (usando pseudo-elemento) */}
      <div className={styles.dotsOverlay}></div>

      {/* Conteúdo principal */}
      <div className={`${styles.heroContent} container`}>
        <div className={styles.slideContent}>
          <h1 className={styles.heroTitle}>{slides[currentSlide].title}</h1>
          <p className={styles.heroSubtitle}>
            {slides[currentSlide].content}
          </p>
        </div>

        <div className={styles.carouselControls}>
          <button
            className={styles.carouselArrow}
            onClick={prevSlide}
            aria-label="Slide anterior"
          >
            &#10094;
          </button>

          <div className={styles.carouselDotsWrapper}>
            <div className={styles.carouselDots}>
              {slides.map((_, index) => (
                <button
                  key={index}
                  className={`${styles.carouselDot} ${currentSlide === index ? styles.active : ''}`}
                  onClick={() => goToSlide(index)}
                  aria-label={`Ir para slide ${index + 1}`}
                />
              ))}
            </div>
          </div>

          <button
            className={styles.carouselArrow}
            onClick={nextSlide}
            aria-label="Próximo slide"
          >
            &#10095;
          </button>
        </div>

        <Button3DRotate text="Quero Fazer Parte" link="#contact" />

        <div className={styles.quickSimulator}>
          <button 
            className={styles.simulatorToggle}
            onClick={handleSimulatorToggle}
          >
            {showSimulator ? 'Qual o valor da sua conta de energia?' : 'Descubra quanto custa sua usina solar'}
          </button>

          {showSimulator && (
            <form 
              className={styles.simulatorForm}
              onSubmit={handleSimulatorSubmit}
            >
              <div className={styles.inputGroup}>
                <span className={styles.currencySymbol}>R$</span>
                <input
                  type="text" 
                  inputMode="decimal"
                  value={billValue}
                  onChange={handleBillValueChange}
                  placeholder="0,00"
                  className={styles.simulatorInput}
                  required
                />
              </div>
              <button 
                type="submit"
                className={styles.simulatorButton}
              >
                Simular
              </button>
            </form>
          )}
        </div>
      </div>

      {showModal && (
        <SimulationModal 
          initialValue={numericBillValue || 200} 
          onClose={handleCloseModal}
        />
      )}
    </section>
  );
};

export default Hero;