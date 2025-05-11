import styles from './Environment.module.css';
import treeIcon from '../../assets/placeholder-icon-tree.png';
import waterIcon from '../../assets/placeholder-icon-water.png';
import communityIcon from '../../assets/placeholder-icon-community.png';

const EnvironmentSection = () => {
  return (
    <section id="environment" className={styles.environmentSection}>
      <div className={styles.container}>
        <h2 className={styles.sectionTitle}>Impacto Ambiental Positivo</h2>
        <p className={styles.centeredParagraph}>
          Ao escolher a Ecolote, você não apenas economiza na conta de luz, mas também contribui ativamente para um futuro mais sustentável. A energia solar é uma fonte limpa e renovável, que reduz significativamente a emissão de gases de efeito estufa, combatendo as mudanças climáticas.
        </p>
        <div className={styles.benefitsGrid}>
          <div className={styles.benefitItem}>
            <img src={treeIcon} alt="Redução de CO2" />
            <h3>Redução de CO2</h3>
            <p>Cada EcoLote gera energia solar limpa, reduzindo a emissão de CO2 e contribuindo para um ambiente mais saudável. Ao escolher o EcoLote, você ajuda a substituir a energia poluente por uma alternativa sustentável, impactando positivamente o futuro do planeta.</p>
          </div>
          <div className={styles.benefitItem}>
            <img src={waterIcon} alt="Preservação de Recursos Naturais" />
            <h3>Preservação de Recursos</h3>
            <p>Ao adotar a energia solar com o EcoLote, diminuímos a dependência de fontes de energia não renováveis, como carvão e petróleo. Isso preserva os recursos naturais, garantindo que as futuras gerações possam contar com um ambiente mais equilibrado e saudável, além de contribuir para a redução da exploração de recursos finitos.</p>
          </div>
          <div className={styles.benefitItem}>
            <img src={communityIcon} alt="Comunidade Sustentável" />
            <h3>Comunidade Sustentável</h3>
            <p>Faça parte de uma comunidade em crescimento de pessoas e empresas dedicadas à sustentabilidade e ao consumo responsável, construindo um futuro mais consciente para todos.</p>
          </div>
        </div>
        <p className={styles.callToAction}>
          Faça parte da mudança! Escolha Ecolote e invista em um planeta mais saudável.
        </p>
      </div>
    </section>
  );
};

export default EnvironmentSection;
