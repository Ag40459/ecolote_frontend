import React from 'react';
import { useState, useRef, useEffect } from 'react';
import styles from './Features.module.css';
import { FaLeaf, FaMoneyBillWave, FaKey, FaCoins, FaMicrochip, FaUsers } from 'react-icons/fa';
import { IoIosArrowForward, IoIosArrowBack } from 'react-icons/io';

const features = [
  {
    title: 'Sustentabilidade Real',
    description: 'Contribua ativamente com o meio ambiente através de energia limpa e renovável.',
    details: 'Cada Ecolote gera entre 4,8 e 12 MWh por ano, evitando de 2,4 a 6 toneladas de CO₂ — equivalente a plantar de 115 a 285 árvores por ano.',
    icon: <FaLeaf />
  },
  {
    title: 'Economia Inteligente',
    description: 'Tenha sua própria usina solar com gestão facilitada e economia real.',
    details: 'Ao adquirir um Ecolote, o cliente é dono da usina e da energia gerada. A associação cuida da gestão administrativa e permite, por meio de regras flexíveis, repassar a energia para terceiros caso o cliente deseje vender ou alugar sua produção.',
    icon: <FaMoneyBillWave />
  },
  {
    title: 'Acesso Descomplicado para Todos os Perfis',
    description: 'Sua própria usina solar, 100% sua, mesmo sem ter telhado ou instalar painéis no imóvel.',
    details: 'Moradores de apartamentos, locatários, empresas em pontos alugados e quem não tem espaço para instalação podem ter uma usina remota, dedicada e permanente — energia limpa e sustentável sem obras ou alterações no imóvel.',
    icon: <FaKey />
  },
  {
    title: 'Economia que Gera Valor',
    description: 'Economize na conta de energia consumindo a energia que você gera.',
    details: 'Embora o foco seja o consumo próprio, clientes que geram excedente podem vender essa energia, aumentando a rentabilidade e acelerando o retorno do investimento.',
    icon: <FaCoins />
  },
  {
    title: 'Tecnologia de Ponta',
    description: 'Usinas com painéis solares de alta performance e monitoramento remoto avançado.',
    details: 'Oferecemos 10 anos de garantia nos equipamentos e 25 anos contra perda de potência, com substituição garantida caso a geração fique abaixo de 80%. Utilizamos tecnologia de medição de energia em tempo real, além de monitoramento individual por câmera, permitindo que você acompanhe sua usina e consumo a qualquer momento, com transparência e segurança.',
    icon: <FaMicrochip />
  },
  {
    title: 'Comunidade Engajada',
    description: 'Participe de uma rede de clientes conscientes, unidos por um modelo inteligente de geração de energia.',
    details: 'A associação cuida da gestão de cada Ecolote, garantindo o repasse integral da energia gerada para o titular. Além disso, promove uma estrutura colaborativa que reduz custos operacionais, facilita a administração coletiva e oferece segurança jurídica para todos os associados.',
    icon: <FaUsers />
  }
];

export default function Features() {
  const [expandedIndices, setExpandedIndices] = useState([]);
  const [isMobile, setIsMobile] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const carouselRef = useRef(null);
  const cardRefs = useRef([]);
  

  // Inicializar refs para os cards
  useEffect(() => {
  if (cardRefs.current.length !== features.length) {
    cardRefs.current = Array(features.length)
      .fill()
      .map(() => React.createRef());
  }
}, []);

  // Verificar se é mobile
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);
    
    return () => {
      window.removeEventListener('resize', checkIfMobile);
    };
  }, []);

  // Função para expandir/recolher detalhes
  const toggleExpand = (index) => {
    setExpandedIndices(prev => {
      if (prev.includes(index)) {
        return prev.filter(i => i !== index);
      } else {
        return [...prev, index];
      }
    });
  };

  // Funções para navegação do carrossel
  const goToNext = () => {
    if (isMobile) {
      // Se estiver no último card, volte para o primeiro e feche todos os detalhes
      if (currentIndex === features.length - 1) {
        setCurrentIndex(0);
        setExpandedIndices([]);
      } else {
        // Caso contrário, avance para o próximo card
        setCurrentIndex(currentIndex + 1);
      }
    }
  };

  const goToPrev = () => {
    if (isMobile) {
      // Feche a descrição do card atual
      setExpandedIndices(prev => prev.filter(i => i !== currentIndex));
      
      // Volte para o card anterior ou para o último se estiver no primeiro
      if (currentIndex === 0) {
        setCurrentIndex(features.length - 1);
      } else {
        setCurrentIndex(currentIndex - 1);
      }
    }
  };

  // Efeito para rolar para o card atual quando o índice muda
  useEffect(() => {
    if (isMobile && carouselRef.current && cardRefs.current[currentIndex]?.current) {
      cardRefs.current[currentIndex].current.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'center'
      });
    }
  }, [currentIndex, isMobile]);

  return (
    
    <section id="features" className={styles.featuresContainer}>
      <h2 className={styles.title}>Diferenciais</h2>
      <br />
      
      <div className={styles.leavesBackground}></div>
      
      <div 
        className={`${styles.featuresGrid} ${isMobile ? styles.mobileCarousel : ''}`}
        ref={carouselRef}
      >
        {features.map((feature, index) => (
          <div 
            key={index} 
            ref={cardRefs.current[index]}
            className={`${styles.featureCard} ${isMobile && expandedIndices.includes(index) ? styles.activeCard : ''} ${isMobile && currentIndex === index ? styles.currentCard : ''}`}
          >
            <div className={styles.featureIconWrapper}>
              <div className={styles.featureIcon}>{feature.icon}</div>
            </div>
            <div className={styles.featureTitle}>{feature.title}</div>
            <div className={styles.featureDescription}>{feature.description}</div>
            <div
              className={`${styles.featureDetails} ${expandedIndices.includes(index) ? styles.expanded : ''}`}
            >
              {feature.details}
            </div>
            <button
              className={styles.detailsButton}
              onClick={(e) => {
                e.stopPropagation();
                toggleExpand(index);
              }}
            >
              {expandedIndices.includes(index) ? 'Ver menos' : 'Saiba mais'}
            </button>
            
            {/* Indicadores de navegação lateral (visíveis apenas em mobile quando expandido) */}
           {isMobile && expandedIndices.includes(index) && (
  <div className={styles.navigationIndicators}>
    {index !== 0 && ( // Somente exibe a seta para a esquerda se não for o primeiro card
      <div 
        className={`${styles.navIndicator} ${styles.leftIndicator}`} 
        onClick={(e) => {
          e.stopPropagation();
          goToPrev();
        }}
      >
        <IoIosArrowBack />
      </div>
    )}
    <div 
      className={`${styles.navIndicator} ${styles.rightIndicator}`} 
      onClick={(e) => {
        e.stopPropagation();
        goToNext();
      }}
    >
      <IoIosArrowForward />
    </div>
  </div>
)}

          </div>
        ))}
      </div>
    </section>
  );
}
