import { useState, useRef, useEffect } from 'react';
import styles from './Features.module.css';
import { FaLeaf, FaMoneyBillWave, FaKey, FaCoins, FaMicrochip, FaUsers, FaChartLine, FaShieldAlt, FaNetworkWired } from 'react-icons/fa';
import HorizontalCarousel from '../UI/HorizontalCarousel/HorizontalCarousel';

// Categorias de features
const categories = [
  { id: 'economia', name: 'Economia e Investimento' },
  { id: 'sustentabilidade', name: 'Sustentabilidade' },
  { id: 'tecnologia', name: 'Tecnologia' },
  { id: 'acesso', name: 'Flexibilidade e Acesso' }
];

// Features organizadas por categoria
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
  const [selectedCategory, setSelectedCategory] = useState('economia');
  const [expandedIndices, setExpandedIndices] = useState([]);
  const [isMobile, setIsMobile] = useState(false);
  
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

  // Renderizar card de feature
  const renderFeatureCard = (feature, index) => (
    <div className={styles.featureCard}>
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
        onClick={() => toggleExpand(index)}
      >
        {expandedIndices.includes(index) ? 'Ver menos' : 'Saiba mais'}
      </button>
    </div>
  );

  return (
    <section id="features" className={styles.featuresContainer}>
      <h2 className={styles.title}>Diferenciais</h2>
      
      <div className={styles.leavesBackground}></div>
      
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
      
      <div className={styles.featuresCarousel}>
        {isMobile ? (
          <div className={styles.mobileFeatures}>
            {featuresByCategory[selectedCategory].map((feature, index) => 
              renderFeatureCard(feature, index)
            )}
          </div>
        ) : (
          <HorizontalCarousel
            items={featuresByCategory[selectedCategory]}
            renderItem={(feature, index) => renderFeatureCard(feature, index)}
            itemWidth={320}
            gap={20}
            itemsPerView={3}
          />
        )}
      </div>
    </section>
  );
}
