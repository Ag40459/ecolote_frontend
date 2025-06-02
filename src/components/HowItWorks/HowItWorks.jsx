import { useState, useEffect, useRef } from 'react';
import styles from './HowItWorks.module.css'; // Use the modified CSS

// Import images (assuming paths are correct relative to this file's location after build)
import HowItWorksImage1 from '../../assets/HowItWorksImage1.png';
import HowItWorksImage2 from '../../assets/HowItWorksImage2.png';
import HowItWorksImage3 from '../../assets/HowItWorksImage3.png';
import HowItWorksImage4 from '../../assets/HowItWorksImage4.png';
import HowItWorksImage5 from '../../assets/HowItWorksImage5.png';
import HowItWorksImage6 from '../../assets/HowItWorksImage6.png';

const steps = [
  {
    id: 1,
    title: 'Cadastro Rápido e Fácil',
    description: 'Inicie sua jornada como proprietário de energia solar com um cadastro simples e objetivo. Sem burocracia, sem complicações – o primeiro passo para sua independência energética.',
    image: HowItWorksImage1,
  },
  {
    id: 2,
    title: 'Escolha Sua Usina Individual',
    description: 'Selecione a usina solar que melhor se adapta ao seu consumo. Diferente de sistemas compartilhados, você será o único dono da sua usina, com todos os créditos gerados exclusivamente para você.',
    image: HowItWorksImage2,
  },
  {
    id: 3,
    title: 'Ingressar na Associação',
    description: 'Ao se tornar proprietário, você também ingressa na nossa associação que otimiza custos e potencializa benefícios. Dessa forma conseguimos reduzir os gastos e facilitar a venda de energia gerada pelo associado.',
    image: HowItWorksImage3,
  },
  {
    id: 4,
    title: 'Acompanhe Pelo App',
    description: 'Monitore a geração da sua usina individual e acompanhe quantos kWh está sendo gerado em tempo real. Visualize seus créditos acumulados e caso decida vender o acumulo, nossa associação te dará o suporte.',
    image: HowItWorksImage4,
  },
  {
    id: 5,
    title: 'Segurança em Múltiplas Camadas',
    description: 'Desfrute de proteção completa: seguro dos equipamentos instalados no seu lote, monitoramento individual e coletivo do bairro solar, respaldo jurídico junto com a associação de proprietários. Seu investimento protegido em todos os níveis.',
    image: HowItWorksImage5,
  },
  {
    id: 6,
    title: 'Bairro Solar Planejado',
    description: 'Seu EcoLote está em um ambiente especialmente projetado sem moradias, apenas as usinas, com áreas verdes preservadas, infraestrutura de qualidade e gestão profissional da associação. Um espaço que valoriza seu investimento e o meio ambiente.',
    image: HowItWorksImage6,
  },
];

const HowItWorks = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [expandedIndex, setExpandedIndex] = useState(null); // Keep track of which card is expanded
  const [isPaused, setIsPaused] = useState(false);
  const totalSlides = steps.length;
  const carouselRef = useRef(null);
  const slideRefs = useRef([]);

  useEffect(() => {
    slideRefs.current = slideRefs.current.slice(0, steps.length);
  }, [steps]);

  // Toggle expansion for a specific card index
  const toggleExpand = (index, event) => {
    event.stopPropagation(); // Prevent carousel slide change if clicking button/card
    setExpandedIndex(prevIndex => (prevIndex === index ? null : index));
    setIsPaused(true); // Pause auto-slide when interacting
  };

  const nextSlide = () => {
    setExpandedIndex(null); // Collapse card when changing slide
    setCurrentSlide((prev) => (prev === totalSlides - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setExpandedIndex(null); // Collapse card when changing slide
    setCurrentSlide((prev) => (prev === 0 ? totalSlides - 1 : prev - 1));
  };

  const goToSlide = (index) => {
    setExpandedIndex(null); // Collapse card when changing slide
    setCurrentSlide(index);
  };

  // Auto-slide effect
  useEffect(() => {
    if (isPaused || !carouselRef.current) return;
    const interval = setInterval(nextSlide, 9000);
    return () => clearInterval(interval);
  }, [isPaused, currentSlide]); // Rerun effect if isPaused or currentSlide changes

  // Scroll carousel to current slide
  useEffect(() => {
    if (carouselRef.current && slideRefs.current[currentSlide]) {
      const scrollLeft = slideRefs.current[currentSlide].offsetLeft;
      carouselRef.current.scrollTo({
        left: scrollLeft,
        behavior: 'smooth'
      });
    }
  }, [currentSlide]);

  return (
    <section
      id="how-it-works"
      className={`${styles.container}`}
      onMouseEnter={() => setIsPaused(true)} // Pause on hover over the whole section
      onMouseLeave={() => setIsPaused(false)}
    >
      <h2 className={styles.title}>Sua Jornada com o EcoLote</h2>

      <div className={styles.carouselWrapper}>
        <button
          className={`${styles.carouselArrow} ${styles.prevArrow}`}
          onClick={prevSlide}
          aria-label="Etapa anterior"
        >
          &#10094; {/* Left arrow entity */}
        </button>

        <div className={styles.carouselContainer} ref={carouselRef}>
          <div className={styles.carouselTrack}>
            {steps.map((step, index) => (
              <div
                key={step.id}
                ref={el => slideRefs.current[index] = el}
                className={`${styles.carouselSlide} ${index === currentSlide ? styles.activeSlide : ''}`}
              >
                {/* Apply expanded class based on state */}
                <div
                  className={`${styles.stepCard} ${expandedIndex === index ? styles.expanded : ''}`}
                  onClick={(e) => toggleExpand(index, e)} // Allow clicking card to toggle
                >
                  <div className={styles.cardImageContainer}>
                    <img
                      src={step.image}
                      alt={step.title}
                      className={styles.cardImage}
                      loading="lazy"
                    />
                  </div>
                  <div className={styles.cardContent}>
                    <h3 className={styles.stepTitle}>{step.title}</h3>
                    <div
                      className={styles.descriptionContainer}
                      id={`step-details-${index}`}
                    >
                      {/* Show full description only when expanded */}
                      <p className={styles.description}>
                        {expandedIndex === index ? step.description : `${step.description.substring(0, 60)}...`}
                      </p>
                    </div>
                  </div>
                  {/* New Toggle Button - structure is simple, styling is CSS */}
                  <button
                    className={styles.toggleButton}
                    onClick={(e) => toggleExpand(index, e)}
                    aria-expanded={expandedIndex === index}
                    aria-controls={`step-details-${index}`}
                    aria-label={expandedIndex === index ? 'Ver menos' : 'Saiba mais'}
                  >
                    {/* Icon is created via CSS pseudo-elements */}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <button
          className={`${styles.carouselArrow} ${styles.nextArrow}`}
          onClick={nextSlide}
          aria-label="Próxima etapa"
        >
          &#10095; {/* Right arrow entity */}
        </button>
      </div>

       </section>
  );
};

export default HowItWorks;