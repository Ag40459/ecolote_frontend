import styles from './Features.module.css';
import { useState } from 'react';
import { FaLeaf, FaMoneyBillWave, FaKey, FaCoins, FaMicrochip, FaUsers } from 'react-icons/fa';

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
details: 'Oferecemos 10 anos de garantia nos equipamentos e 25 anos contra perda de potência, com substituição garantida caso a geração fique abaixo de 80%. Utilizamos tecnologia de medição de energia em tempo real, além de monitoramento individual por câmera, permitindo que você acompanhe sua usina e consumo a qualquer momento, com transparência e segurança.'
,
  icon: <FaMicrochip />
},
{
  title: 'Comunidade Engajada',
description: 'Participe de uma rede de clientes conscientes, unidos por um modelo inteligente de geração de energia.',
details: 'A associação cuida da gestão de cada Ecolote, garantindo o repasse integral da energia gerada para o titular. Além disso, promove uma estrutura colaborativa que reduz custos operacionais, facilita a administração coletiva e oferece segurança jurídica para todos os associados.'
,
  icon: <FaUsers />
}
];

export default function Features() {
  const [expandedIndex, setExpandedIndex] = useState(null);

  const toggleExpand = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <section id="features" className={styles.featuresContainer}>
      <div className={styles.featuresGrid}>
        {features.map((feature, index) => (
          <div key={index} className={styles.featureCard}>
            <div className={styles.featureIcon}>{feature.icon}</div>
            <div className={styles.featureTitle}>{feature.title}</div>
            <div className={styles.featureDescription}>{feature.description}</div>
            <div
              className={`${styles.featureDetails} ${expandedIndex === index ? styles.expanded : ''}`}
            >
              {feature.details}
            </div>
            <button
              className={styles.detailsButton}
              onClick={() => toggleExpand(index)}
            >
              {expandedIndex === index ? 'Ver menos' : 'Saiba mais'}
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}