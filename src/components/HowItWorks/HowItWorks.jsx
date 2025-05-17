import React, { useState, useEffect } from 'react';
import styles from './HowItWorks.module.css';

import HowItWorksImage1 from '../../assets/HowItWorksImage1.png';
import HowItWorksImage2 from '../../assets/HowItWorksImage2.png';
import HowItWorksImage3 from '../../assets/HowItWorksImage3.png';
import HowItWorksImage4 from '../../assets/HowItWorksImage4.png';
import HowItWorksImage5 from '../../assets/HowItWorksImage5.png';
import HowItWorksImage6 from '../../assets/HowItWorksImage6.png';

const steps = [
  {
    title: 'Cadastro Rápido e Fácil',
    description: 'Inicie sua jornada como proprietário de energia solar com um cadastro simples e objetivo. Sem burocracia, sem complicações – o primeiro passo para sua independência energética.',
    image: HowItWorksImage1,
  },
  {
    title: 'Escolha Sua Usina Individual',
    description: 'Selecione a usina solar que melhor se adapta ao seu consumo. Diferente de sistemas compartilhados, você será o único dono da sua usina, com todos os créditos gerados exclusivamente para você.',
    image: HowItWorksImage2,
  },
  {
    title: 'Garanta Seu EcoLote',
    description: 'Adquira seu lote e usina com documentação em seu nome e segurança jurídica completa. Ao se tornar proprietário, você também ingressa na associação que otimiza custos e potencializa benefícios.',
    image: HowItWorksImage3,
  },
  {
    title: 'Acompanhe Pelo App',
    description: 'Monitore a geração da SUA usina individual e acompanhe sua economia em tempo real. Visualize seus créditos acumulados e o impacto positivo da gestão associativa na eficiência do seu investimento.',
    image: HowItWorksImage4,
  },
  {
    title: 'Segurança em Múltiplas Camadas',
    description: 'Desfrute de proteção completa: segurança individual do seu lote, monitoramento coletivo do bairro solar e respaldo jurídico da associação de proprietários. Seu investimento protegido em todos os níveis.',
    image: HowItWorksImage5,
  },
  {
    title: 'Bairro Solar Planejado',
    description: 'Seu EcoLote está em um ambiente especialmente projetado, com áreas verdes preservadas, infraestrutura de qualidade e gestão profissional da associação. Um espaço que valoriza seu investimento e o meio ambiente.',
    image: HowItWorksImage6,
  },
];

const HowItWorks = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [hoveredDot, setHoveredDot] = useState(null);
  const totalSlides = steps.length;

  // Função para avançar para o próximo slide
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === totalSlides - 1 ? 0 : prev + 1));
  };

  // Função para voltar ao slide anterior
  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? totalSlides - 1 : prev - 1));
  };

  // Efeito para transição automática a cada 9 segundos
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 9000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section id="how-it-works" className={styles.container}>
      <h2 className={styles.title}>Sua Jornada com o EcoLote</h2>
      <br></br>
      <div className={styles.stepsContainer}>
        <div className={styles.carouselContainer}>
          {steps.map((step, index) => (
            <div 
              key={index} 
              className={`${styles.carouselSlide} ${index === currentSlide ? styles.activeSlide : ''}`}
            >
              <div className={styles.step}>
  <div className={styles.stepHeader}>
    <div className={styles.stepNumber}>{index + 1}</div>
    <h3 className={styles.stepTitle}>{step.title}</h3>
  </div>
    <br></br>
  <div className={styles.stepContent}>
    <p className={styles.description}>{step.description}</p>
    <br></br>
    <div className={styles.containerstepImage}>
    <br></br>

      <img
        src={step.image}
        alt={step.title}
        className={styles.stepImage}
      />
    </div>
  </div>
</div>


            </div>
          ))}
        </div>

       <div className={styles.carouselControls}>
  <button
    className={`${styles.carouselButton} ${document.body.classList.contains('dark-theme') ? styles.darkArrow : ''}`}
    onClick={prevSlide}
    aria-label="Slide anterior"
  >
    &lt;
  </button>

  <div className={styles.carouselIndicators}>
  {steps.map((_, index) => (
    <button
      key={index}
      data-number={index + 1}
      className={`${styles.carouselDot} ${currentSlide === index ? styles.activeDot : ''}`}
      onClick={() => setCurrentSlide(index)}
      onMouseEnter={() => setHoveredDot(index)}
      onMouseLeave={() => setHoveredDot(null)}
      aria-label={`Ir para slide ${index + 1}`}
    >
      {(hoveredDot === index || currentSlide === index) && (
        <span className={styles.dotNumber}>{index + 1}</span>
      )}
    </button>
  ))}
</div>


  <button
    className={`${styles.carouselButton} ${document.body.classList.contains('dark-theme') ? styles.darkArrow : ''}`}
    onClick={nextSlide}
    aria-label="Próximo slide"
  >
    &gt;
  </button>
</div>

      </div>

      <div className={styles.faqCta}>
        <div className={styles.faqIcon}>❓</div>
        <div className={styles.faqContent}>
          <h3 className={styles.faqTitle}>Ainda tem dúvidas?</h3>
          <p className={styles.faqDescription}>
            Consulte nosso FAQ completo para entender todos os detalhes sobre propriedade individual, gestão associativa, economia e muito mais.
            Estamos aqui para tornar sua jornada solar simples e transparente.
          </p>
        </div >
        <a id="faq" href="/faq" className={styles.faqButton}>
          Acessar FAQ Completo
        </a>
      </div>
    </section>
  );
};

export default HowItWorks;
