import React, { useState, useEffect } from 'react';
import styles from './Hero.module.css';

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [billValue, setBillValue] = useState('');
  const [showSimulator, setShowSimulator] = useState(false);

  // Slides atualizados conforme recomendações
  const slides = [
    {
      title: "Apartamento? Aluguel? O Ecolote é a SUA usina solar, mesmo assim!",
      content: "Gere sua própria energia limpa, reduza sua conta de luz à taxa mínima e seja dono do seu futuro energético. Descubra a liberdade solar, sem obras e sem complicações."
    },
    {
      title: "Sua Própria Usina Solar com Gestão Inteligente",
      content: "No Ecolote, você é dono da sua usina individual e se beneficia da gestão associativa que otimiza custos. Propriedade real com a eficiência do coletivo."
    },
    {
      title: "Energia Solar Acessível para Todos",
      content: "Mesmo sem telhado próprio, você pode ter sua usina solar registrada em seu nome. Economia garantida, sustentabilidade real e um ativo que valoriza com o tempo."
    }
  ];

  // Efeito de parallax no scroll
  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Funções de navegação do carrossel
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  // Controle do carrossel automático
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      nextSlide();
    }, 9000);
    return () => clearInterval(interval);
  }, [isPaused, currentSlide]);

  // Handlers para gestos touch em dispositivos móveis
  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX);
  };
  
  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };
  
  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 100) {
      // Deslize para a esquerda
      nextSlide();
    }
    
    if (touchStart - touchEnd < -100) {
      // Deslize para a direita
      prevSlide();
    }
  };
  
  const handleSimulatorSubmit = (e) => {
    e.preventDefault();
    // Implementar lógica para iniciar simulação
    window.location.href = `#simulator?value=${billValue}`;
  };

  // Renderização dos elementos decorativos (raios solares)
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

  // Renderização das partículas solares
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
      {/* Background com efeito parallax */}
      <div 
        className={styles.heroBackground} 
        style={{ 
          transform: `translateY(${scrollPosition * 0.3}px)` 
        }}
      ></div>
      
      {/* Overlay com gradiente */}
      <div className={styles.heroOverlay}></div>
      
      {/* Sol animado no canto superior */}
      <div className={styles.sunAnimation}></div>
      
      {/* Elementos decorativos solares */}
      <div className={styles.solarElements}>
        {renderSolarRays()}
      </div>
      
      {/* Partículas solares */}
      <div className={styles.solarParticlesContainer}>
        {renderSolarParticles()}
      </div>
      
      {/* Ondas de energia */}
      <div className={styles.energyWaves}>
        <div className={styles.wave}></div>
        <div className={styles.wave}></div>
        <div className={styles.wave}></div>
      </div>
      
      <div className={`${styles.heroContent} container`}>
        {/* Conteúdo do slide atual com animações */}
        <div className={styles.slideContent}>
          <h1 className={styles.heroTitle}>{slides[currentSlide].title}</h1>
          <p className={styles.heroSubtitle}>{slides[currentSlide].content}</p>
        </div>

        {/* Controles do carrossel */}
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

        {/* Botão CTA aprimorado com ícone de sol corrigido */}
        <a href="#contact" className={`${styles.ctaButton} cta-button`}>
          <svg className={styles.ctaButtonIcon} width="24" height="24" viewBox="0 0 24 24" fill="#FFD700">
            <path d="M12 17C14.7614 17 17 14.7614 17 12C17 9.23858 14.7614 7 12 7C9.23858 7 7 9.23858 7 12C7 14.7614 9.23858 17 12 17Z" />
            <path d="M12 1V3M12 21V23M23 12H21M3 12H1M20.485 3.515L19.071 4.929M4.929 19.071L3.515 20.485M20.485 20.485L19.071 19.071M4.929 4.929L3.515 3.515" strokeWidth="2" stroke="#FFD700" />
          </svg>
          <span>Quero Minha Usina Solar</span>
        </a>
        
        {/* Simulador rápido */}
        
        <div className={styles.quickSimulator}>
          <button
  className={styles.simulatorToggle}
  onClick={() => {
    const el = document.getElementById('simulator');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  }}
>
  Descubra Quanto Custa Sua Usina Solar
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
    </section>
  );
};

export default Hero;
