import React, { useState, useEffect } from 'react';
import styles from './Hero.module.css';

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const slides = [
    {
      title: "Ecolote: A Nova Era da Energia Solar Sustentável",
      content: "Mesmo em apartamento ou imóvel alugado, você pode ter sua própria energia solar. É economia, sustentabilidade e liberdade energética."
    },
    {
      title: "Energia Solar Para Todos, Sem Complicações",
      content: "Você não precisa ter telhado próprio para gerar sua própria energia. Com o Ecolote, você é dono de uma usina solar remota e podendo reduzir sua conta de luz a tax mínima."
    },
    {
      title: "Invista no Futuro com o Ecolote",
      content: "Gere créditos de energia, economize e invista em um ativo sustentável. Ecolote é a sua independência energética, sem obras."
    }
  ];

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
  }, [isPaused]);

  return (
    <section
      id="hero"
      className={styles.heroSection}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className={styles.heroOverlay}></div>
      <div className={`${styles.heroContent} container`}>
        <h1 className={styles.heroTitle}>{slides[currentSlide].title}</h1>
        <p className={styles.heroSubtitle}>{slides[currentSlide].content}</p>

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
          Quero Saber Mais
        </a>
      </div>
    </section>
  );
};

export default Hero;;