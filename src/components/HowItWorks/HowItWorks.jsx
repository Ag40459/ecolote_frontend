import { useState, useEffect, useRef } from 'react';
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

// Componente de número animado
const AnimatedNumber = ({ number, isActive, isCompleted }) => {
  return (
    <div className={styles.numberContainer}>
      <div className={`${styles.numberFace} ${styles.numberFront}`}>
        {number}
      </div>
      <div className={`${styles.numberFace} ${styles.numberBack}`}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z" fill="currentColor"/>
        </svg>
      </div>
    </div>
  );
};

// Componente de indicador de progresso
const ProgressIndicator = ({ steps, currentStep, onStepClick }) => {
  return (
    <div className={styles.progressContainer}>
      <div className={styles.progressLine}>
        <div 
          className={styles.progressFill} 
          style={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
        />
      </div>
      
      {/* Efeito de conexão entre etapas */}
      <div className={styles.flowConnection}>
        <div className={styles.flowParticle}></div>
        <div className={styles.flowParticle}></div>
        <div className={styles.flowParticle}></div>
      </div>
      
      {steps.map((_, index) => (
        <div 
          key={index}
          className={`${styles.progressStep} ${index <= currentStep ? styles.completed : ''} ${index === currentStep ? styles.active : ''}`}
          onClick={() => onStepClick(index)}
        >
          <AnimatedNumber 
            number={index + 1} 
            isActive={index === currentStep}
            isCompleted={index < currentStep}
          />
        </div>
      ))}
    </div>
  );
};

const HowItWorks = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(0); // -1 para anterior, 1 para próximo
  const [hoveredDot, setHoveredDot] = useState(null);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const totalSlides = steps.length;
  
  // Referência para o carrossel
  const carouselRef = useRef(null);

  // Função para avançar para o próximo slide com direção
  const nextSlide = () => {
    setDirection(1);
    setCurrentSlide((prev) => (prev === totalSlides - 1 ? 0 : prev + 1));
  };

  // Função para voltar ao slide anterior com direção
  const prevSlide = () => {
    setDirection(-1);
    setCurrentSlide((prev) => (prev === 0 ? totalSlides - 1 : prev - 1));
  };
  
  // Função para ir para um slide específico
  const goToSlide = (index) => {
    setDirection(index > currentSlide ? 1 : -1);
    setCurrentSlide(index);
  };

  // Handlers para gestos touch em dispositivos móveis
  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX);
  };
  
  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };
  
  const handleTouchEnd = () => {
    const threshold = 100; // Mínimo de pixels para considerar um deslize
    
    if (touchStart - touchEnd > threshold) {
      // Deslize para a esquerda - próxima etapa
      nextSlide();
    }
    
    if (touchStart - touchEnd < -threshold) {
      // Deslize para a direita - etapa anterior
      prevSlide();
    }
  };

  // Efeito para transição automática a cada 9 segundos
  useEffect(() => {
    if (isPaused) return;
    
    const interval = setInterval(() => {
      nextSlide();
    }, 9000);

    return () => clearInterval(interval);
  }, [isPaused, currentSlide]);

  return (
    <section 
      id="how-it-works" 
      className={styles.container}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <h2 className={styles.title}>Sua Jornada com o EcoLote</h2>
      
      <div className={styles.stepsContainer}>
       
        
        <div 
          className={styles.carouselContainer} 
          ref={carouselRef}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {steps.map((step, index) => (
            <div 
              key={index} 
              className={`
                ${styles.carouselSlide} 
                ${index === currentSlide ? styles.activeSlide : ''}
                ${direction > 0 && index === currentSlide ? styles.slideEnterRight : ''}
                ${direction < 0 && index === currentSlide ? styles.slideEnterLeft : ''}
                ${direction > 0 && index === (currentSlide - 1 + totalSlides) % totalSlides ? styles.slideExitLeft : ''}
                ${direction < 0 && index === (currentSlide + 1) % totalSlides ? styles.slideExitRight : ''}
              `}
            >
              <div className={styles.step}>
                <div className={styles.stepHeader}>
                  <div className={styles.stepNumber}>{index + 1}</div>
                  <h3 className={styles.stepTitle}>{step.title}</h3>
                </div>
                
                <div className={styles.stepContent}>
                  <p className={styles.description}>{step.description}</p>
                  
                  <div className={styles.containerstepImage}>
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

      </div>
      
      <div className={styles.stepsProgress}>
        <ProgressIndicator 
          steps={steps} 
          currentStep={currentSlide} 
          onStepClick={goToSlide} 
          className={styles.stepsProgress}
        />
        </div>

      <div className={styles.faqCta}>
        <div className={styles.faqIcon}>❓</div>
        <div className={styles.faqContent}>
          <h3 className={styles.faqTitle}>Ainda tem dúvidas?</h3>
          <p className={styles.faqDescription}>
            Consulte nosso FAQ completo para entender todos os detalhes sobre propriedade individual, gestão associativa, economia e muito mais.
            Estamos aqui para tornar sua jornada solar simples e transparente.
          </p>
        </div>
        <a id="faq" href="/faq" className={styles.faqButton}>
          Acessar FAQ Completo
        </a>
      </div>
    </section>
  );
};

export default HowItWorks;