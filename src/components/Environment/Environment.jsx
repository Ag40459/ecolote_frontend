import { useState } from 'react';
import styles from './Environment.module.css';
import treeIcon from '../../assets/placeholder-icon-tree.png';
import waterIcon from '../../assets/placeholder-icon-water.png';
import communityIcon from '../../assets/placeholder-icon-community.png';

const EnvironmentSection = () => {
  // Array de dados para os benefícios
  const benefitsData = [
    {
      id: 1,
      icon: treeIcon,
      alt: "Redução de CO2",
      title: "Redução de CO2",
      description: "Cada EcoLote gera energia solar limpa, reduzindo a emissão de CO2 e contribuindo para um ambiente mais saudável. Ao escolher o EcoLote, você ajuda a substituir a energia poluente por uma alternativa sustentável, impactando positivamente o futuro do planeta."
    },
    {
      id: 2,
      icon: waterIcon,
      alt: "Preservação de Recursos Naturais",
      title: "Preservação de Recursos",
      description: "Ao adotar a energia solar com o EcoLote, diminuímos a dependência de fontes de energia não renováveis, como carvão e petróleo. Isso preserva os recursos naturais, garantindo que as futuras gerações possam contar com um ambiente mais equilibrado e saudável, além de contribuir para a redução da exploração de recursos finitos."
    },
    {
      id: 3,
      icon: communityIcon,
      alt: "Comunidade Sustentável",
      title: "Comunidade Sustentável",
      description: "Faça parte de uma comunidade em crescimento de pessoas e empresas dedicadas à sustentabilidade e ao consumo responsável, construindo um futuro mais consciente para todos."
    }
  ];

  // Estado para controlar quais descrições estão visíveis
  const [visibleDescriptions, setVisibleDescriptions] = useState({});

  // Função para alternar a visibilidade da descrição
  const toggleDescription = (id) => {
    setVisibleDescriptions(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  return (
    <section id="environment" className={styles.environmentSection}>
      <div className={styles.container}>
        <h2 className={styles.sectionTitle}>Impacto Ambiental Positivo</h2>
        <p className={styles.centeredParagraph}>
          Ao escolher a Ecolote, você não apenas economiza na conta de luz, mas também contribui ativamente para um futuro mais sustentável. A energia solar é uma fonte limpa e renovável, que reduz significativamente a emissão de gases de efeito estufa, combatendo as mudanças climáticas.
        </p>
        <div className={styles.benefitsGrid}>
          {benefitsData.map((benefit) => (
            <div 
              key={benefit.id} 
              className={`${styles.benefitItem} ${visibleDescriptions[benefit.id] ? styles.expanded : ''}`}
              onClick={() => toggleDescription(benefit.id)}
            >
              <img src={benefit.icon} alt={benefit.alt} />
              <br />
              <h3>{benefit.title}</h3>
              
              <div 
                className={`${styles.description} ${visibleDescriptions[benefit.id] ? styles.visible : ''}`}
              >
                <p className={styles.centeredParagraph}>{benefit.description}</p>
              </div>
              
              <div className={styles.toggleArrow}>
                <span>{visibleDescriptions[benefit.id] ? '▲' : '▼'}</span>
              </div>
            </div>
          ))}
        </div>
        <p className={styles.callToAction}>
          Faça parte da mudança! Escolha Ecolote e invista em um planeta mais saudável.
        </p>
      </div>
    </section>
  );
};

export default EnvironmentSection;