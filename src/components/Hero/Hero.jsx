import { useState, useEffect } from 'react';
import styles from './Hero.module.css';
import { formatCurrency  } from '../../utils/calc';
import SimulationModal from '../SimulationModal/SimulationModal';

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [billValue, setBillValue] = useState('');
  const [showSimulator, setShowSimulator] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const slides = [
    {
      title: "Energia Solar: Agora Acessível Para Todos",
      content: "Mesmo em apartamento ou imóvel alugado, você pode ter energia solar. O Ecolote elimina a barreira do telhado próprio, democratizando o acesso à energia limpa."
    },
    {
      title: "Sua Mini Usina Solar Remota",
      content: "Seja proprietário de uma usina solar em um bairro planejado, com documentação em seu nome e economia de até 95% na sua conta de luz."
    },
    {
      title: "Investimento Inteligente e Sustentável",
      content: "Retorno financeiro em aproximadamente 5 anos, valorização do ativo ao longo do tempo e impacto ambiental positivo."
    }
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      nextSlide();
    }, 9000);
    return () => clearInterval(interval);
  }, [isPaused, currentSlide]);

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

  const handleSimulatorSubmit = (e) => {
    e.preventDefault();
    const numericValue = billValue ? parseFloat(billValue.replace(/[^\d]/g, '')) : 0;
    setShowModal(true);
    setShowSimulator(false);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const renderSolarRays = () => {
    const rays = [];
    for (let i = 0; i < 12; i++) {
      const angle = i * 30;
      const delay = i * 0.5;
      rays.push(
        <div 
          key={i}
          className={styles.solarRay}
          style={{
            top: '10%',
            right: '10%',
            transform: `rotate(${angle}deg) translateX(-50%)`,
            animationDelay: `${delay}s`
          }}
        />
      );
    }
    return rays;
  };

  const renderSolarParticles = () => {
    const particles = [];
    for (let i = 0; i < 15; i++) {
      const size = Math.random() * 10 + 5;
      const posX = Math.random() * 100;
      const delay = i * 0.3;
      const duration = Math.random() * 3 + 2;

      particles.push(
        <div 
          key={i}
          className={styles.solarParticle}
          style={{
            width: `${size}px`,
            height: `${size}px`,
            left: `${posX}%`,
            bottom: '0',
            animationDuration: `${duration}s`,
            animationDelay: `${delay}s`
          }}
        />
      );
    }
    return particles;
  };

  return (
    <section
      id="hero"
      className={styles.heroSection}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div 
        className={styles.heroBackground} 
        style={{ transform: `translateY(${scrollPosition * 0.3}px)` }}
      ></div>

      <div className={styles.heroOverlay}></div>
      <div className={styles.sunAnimation}></div>
      <div className={styles.solarElements}>{renderSolarRays()}</div>
      <div className={styles.solarParticlesContainer}>{renderSolarParticles()}</div>

      <div className={styles.energyWaves}>
        <div className={styles.wave}></div>
        <div className={styles.wave}></div>
        <div className={styles.wave}></div>
      </div>

      <div className={`${styles.heroContent} container`}>
        <div className={styles.slideContent}>
          <h1 className={styles.heroTitle}>{slides[currentSlide].title}</h1>
          <p className={styles.heroSubtitle}>{slides[currentSlide].content}</p>
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

        <a href="#contact" className={`${styles.ctaButton} cta-button`}>
          <svg className={styles.ctaButtonIcon} width="24" height="24" viewBox="0 0 24 24" fill="#FFD700">
            <path d="M12 17C14.7614 17 17 14.7614 17 12C17 9.23858 14.7614 7 12 7C9.23858 7 7 9.23858 7 12C7 14.7614 9.23858 17 12 17Z" />
            <path d="M12 1V3M12 21V23M23 12H21M3 12H1M20.485 3.515L19.071 4.929M4.929 19.071L3.515 20.485M20.485 20.485L19.071 19.071M4.929 4.929L3.515 3.515" strokeWidth="2" stroke="#FFD700" />
          </svg>
          <span>Simular Minha Economia</span>
        </a>

        <div className={styles.quickSimulator}>
          <button 
            className={styles.simulatorToggle}
            onClick={handleSimulatorToggle}
          >
            {showSimulator ? 'Qual o valor da sua energia?' : 'Descubra quanto custa sua usina solar'}
          </button>

          {showSimulator && (
            <form 
              className={styles.simulatorForm}
              onSubmit={handleSimulatorSubmit}
            >
              <div className={styles.inputGroup}>
                <span className={styles.currencySymbol}>R$</span>
                <input
                  type="number"
                  value={billValue}
                  onChange={(e) => setBillValue(e.target.value)}
                  placeholder="Valor médio da sua conta de luz"
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
          initialValue={parseFloat(billValue) || 200}
          onClose={handleCloseModal}
        />
      )}
    </section>
  );
};

export default Hero;