import { useState, useRef, useEffect } from 'react';
import styles from './Features.module.css'; // Use the modified CSS file
import { FaLeaf, FaMoneyBillWave, FaKey, FaCoins, FaMicrochip, FaUsers, FaChartLine, FaShieldAlt, FaNetworkWired, FaChevronLeft, FaChevronRight } from 'react-icons/fa';

// Categorias de features (mantido)
const categories = [
  { id: 'economia', name: 'Economia' },
  { id: 'sustentabilidade', name: 'Sustentabilidade' },
  { id: 'tecnologia', name: 'Tecnologia' },
  { id: 'acesso', name: 'Flexibilidade' }
];

// Features organizadas por categoria (mantido)
const featuresByCategory = {
  economia: [
    {
      title: 'Economia Inteligente',
      description: 'Tenha sua própria usina solar com gestão facilitada e economia real.',
      details: 'Ao adquirir um Ecolote, o cliente é dono da usina e da energia gerada. A associação cuida da gestão administrativa e permite, por meio de regras flexíveis, repassar a energia para terceiros caso o cliente deseje vender ou alugar sua produção.',
      icon: <FaMoneyBillWave />
    },
    {
      title: 'Economia que Gera Valor',
      description: 'Economize na conta de energia consumindo a energia que você gera.',
      details: 'Embora o foco seja o consumo próprio, clientes que geram excedente podem vender essa energia, aumentando a rentabilidade e acelerando o retorno do investimento.',
      icon: <FaCoins />
    },
    {
      title: 'Retorno do Investimento',
      description: 'Recupere seu investimento em até 5 anos com economia mensal garantida.',
      details: 'O modelo Ecolote oferece um dos melhores retornos do mercado, com payback entre 4 e 5 anos e economia mensal imediata na conta de energia.',
      icon: <FaChartLine />
    }
  ],
  sustentabilidade: [
    {
      title: 'Sustentabilidade Real',
      description: 'Contribua ativamente com o meio ambiente através de energia limpa e renovável.',
      details: 'Cada Ecolote gera entre 4,8 e 12 MWh por ano, evitando de 2,4 a 6 toneladas de CO₂ — equivalente a plantar de 115 a 285 árvores por ano.',
      icon: <FaLeaf />
    },
    {
      title: 'Impacto Ambiental Positivo',
      description: 'Reduza sua pegada de carbono e contribua para um futuro mais sustentável.',
      details: 'Ao optar pelo Ecolote, você evita a emissão de gases de efeito estufa, economiza recursos hídricos e reduz a dependência de combustíveis fósseis, gerando um impacto ambiental positivo e mensurável.',
      icon: <FaLeaf />
    }
  ],
  tecnologia: [
    {
      title: 'Tecnologia de Ponta',
      description: 'Usinas com painéis solares de alta performance e monitoramento remoto avançado.',
      details: 'Oferecemos 10 anos de garantia nos equipamentos e 25 anos contra perda de potência, com substituição garantida caso a geração fique abaixo de 80%. Utilizamos tecnologia de medição de energia em tempo real, além de monitoramento individual por câmera, permitindo que você acompanhe sua usina e consumo a qualquer momento, com transparência e segurança.',
      icon: <FaMicrochip />
    },
    {
      title: 'Inteligência Artificial',
      description: 'Sistema de previsão e otimização de geração baseado em IA.',
      details: 'Nossa plataforma utiliza algoritmos de inteligência artificial para prever a geração de energia com base em dados meteorológicos e históricos, otimizando o desempenho da sua usina e maximizando o retorno do investimento.',
      icon: <FaMicrochip />
    },
    {
      title: 'Blockchain e Segurança',
      description: 'Registro imutável de geração e consumo com tecnologia blockchain.',
      details: 'Utilizamos tecnologia blockchain para garantir a segurança e transparência dos registros de geração e consumo de energia, criando um histórico imutável e auditável de toda a operação da sua usina.',
      icon: <FaShieldAlt />
    },
    {
      title: 'Rede Neural Avançada',
      description: 'Monitoramento preditivo para manutenção preventiva.',
      details: 'Nossa rede neural analisa continuamente o desempenho dos equipamentos, identificando padrões que podem indicar necessidade de manutenção antes que ocorram falhas, garantindo máxima eficiência e disponibilidade da sua usina.',
      icon: <FaNetworkWired />
    }
  ],
  acesso: [
    {
      title: 'Acesso Descomplicado para Todos os Perfis',
      description: 'Sua própria usina solar, 100% sua, mesmo sem ter telhado ou instalar painéis no imóvel.',
      details: 'Moradores de apartamentos, locatários, empresas em pontos alugados e quem não tem espaço para instalação podem ter uma usina remota, dedicada e permanente — energia limpa e sustentável sem obras ou alterações no imóvel.',
      icon: <FaKey />
    },
    {
      title: 'Comunidade Engajada',
      description: 'Participe de uma rede de clientes conscientes, unidos por um modelo inteligente de geração de energia.',
      details: 'A associação cuida da gestão de cada Ecolote, garantindo o repasse integral da energia gerada para o titular. Além disso, promove uma estrutura colaborativa que reduz custos operacionais, facilita a administração coletiva e oferece segurança jurídica para todos os associados.',
      icon: <FaUsers />
    }
  ]
};

export default function Features() {
  const [selectedCategory, setSelectedCategory] = useState('tecnologia'); // Categoria inicial
  const [expandedIndex, setExpandedIndex] = useState(null); // Armazena o índice do card expandido (ou null)
  const carouselRef = useRef(null);
  const [showArrows, setShowArrows] = useState(false);

  const currentFeatures = featuresByCategory[selectedCategory] || [];

  // Reseta o card expandido e o scroll ao mudar de categoria
  useEffect(() => {
    setExpandedIndex(null);
    if (carouselRef.current) {
      carouselRef.current.scrollTo({ left: 0, behavior: 'smooth' });
    }
    checkArrows(); // Verifica se as setas são necessárias na nova categoria
  }, [selectedCategory]);

  // Função para expandir/recolher o card
  const toggleExpand = (index) => {
    setExpandedIndex(prevIndex => (prevIndex === index ? null : index));
  };

  // Função para verificar se as setas de navegação são necessárias
  const checkArrows = () => {
    if (carouselRef.current) {
      const { scrollWidth, clientWidth } = carouselRef.current;
      setShowArrows(scrollWidth > clientWidth);
    }
  };

  // Verifica as setas no carregamento inicial e no redimensionamento da janela
  useEffect(() => {
    checkArrows();
    window.addEventListener('resize', checkArrows);
    return () => {
      window.removeEventListener('resize', checkArrows);
    };
  }, [currentFeatures]); // Re-verifica quando as features mudam

  // Funções de navegação do carrossel
  const handleScroll = (direction) => {
    if (carouselRef.current) {
      const { clientWidth } = carouselRef.current;
      // Scrolla aproximadamente a largura visível do carrossel
      const scrollAmount = direction === 'left' ? -clientWidth * 0.8 : clientWidth * 0.8;
      carouselRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const renderFeatureCard = (feature, index) => (
    <div
      key={`${selectedCategory}-${index}`}
      className={styles.featureCard}
      // Adiciona um ID para possível navegação interna ou testes
      id={`feature-card-${selectedCategory}-${index}`}
    >
      <div className={styles.featureIconWrapper}>
        <div className={styles.featureIcon}>{feature.icon}</div>
      </div>
      <div className={styles.featureTitle}>{feature.title}</div>
      {/* Descrição padronizada pelo CSS */}
      <div className={styles.featureDescription}>{feature.description}</div>
      {/* Detalhes expansíveis */}
      <div
        className={`${styles.featureDetails} ${expandedIndex === index ? styles.expanded : ''}`}
      >
        {feature.details}
      </div>
      {/* Botão "Saiba mais" / "Ver menos" */}
      <button
        className={styles.detailsButton}
        onClick={() => toggleExpand(index)}
        aria-expanded={expandedIndex === index}
      >
        {expandedIndex === index ? 'Ver menos' : 'Saiba mais'}
      </button>
    </div>
  );

  return (
    <section id="features" className={styles.featuresContainer}>
      <h2 className={styles.title}>Diferenciais</h2>

      {/* Navegação por categorias (mantida) */}
      <div className={styles.categoriesNav}>
        {categories.map(category => (
          <button
            key={category.id}
            className={`${styles.categoryButton} ${selectedCategory === category.id ? styles.activeCategory : ''}`}
            onClick={() => setSelectedCategory(category.id)}
          >
            {category.name}
          </button>
        ))}
      </div>

      {/* Carrossel Unificado */}
      <div className={styles.carouselContainer}>
        {/* Seta Esquerda (visível se necessário) */}
        {showArrows && (
          <button
            className={`${styles.carouselArrow} ${styles.carouselArrowLeft}`}
            onClick={() => handleScroll('left')}
            aria-label="Anterior"
            // Desabilitar pode ser baseado no scrollLeft === 0, mas scrollBy lida bem com limites
          >
            <FaChevronLeft />
          </button>
        )}

        {/* Conteúdo do Carrossel */}
        <div className={styles.carousel} ref={carouselRef}>
          {currentFeatures.map((feature, index) =>
            renderFeatureCard(feature, index)
          )}
        </div>

        {/* Seta Direita (visível se necessário) */}
        {showArrows && (
          <button
            className={`${styles.carouselArrow} ${styles.carouselArrowRight}`}
            onClick={() => handleScroll('right')}
            aria-label="Próximo"
            // Desabilitar pode ser baseado no scrollLeft >= scrollWidth - clientWidth
          >
            <FaChevronRight />
          </button>
        )}
      </div>
    </section>
  );
}

