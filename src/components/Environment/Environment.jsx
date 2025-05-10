import React from 'react';
import styles from './Environment.module.css'; // Assuming CSS module for styling

const EnvironmentSection = () => {
  return (
    <section id="environment" className={styles.environmentSection}>
      <div className={styles.container}>
        <h2>Impacto Ambiental Positivo</h2>
        <p>
          Ao escolher a Ecolote, você não apenas economiza na conta de luz, mas também contribui ativamente para um futuro mais sustentável. A energia solar é uma fonte limpa e renovável, que reduz significativamente a emissão de gases de efeito estufa, combatendo as mudanças climáticas.
        </p>
        <div className={styles.benefitsGrid}>
          <div className={styles.benefitItem}>
            <img src="/placeholder-icon-tree.svg" alt="Redução de CO2" />
            <h3>Redução de CO2</h3>
            <p>Cada lote de energia solar consumido através da Ecolote representa menos dióxido de carbono liberado na atmosfera.</p>
          </div>
          <div className={styles.benefitItem}>
            <img src="/placeholder-icon-water.svg" alt="Preservação de Recursos Naturais" />
            <h3>Preservação de Recursos</h3>
            <p>Diminuímos a dependência de fontes de energia não renováveis, preservando recursos naturais para as futuras gerações.</p>
          </div>
          <div className={styles.benefitItem}>
            <img src="/placeholder-icon-community.svg" alt="Comunidade Sustentável" />
            <h3>Comunidade Sustentável</h3>
            <p>Junte-se a uma comunidade crescente de pessoas e empresas comprometidas com a sustentabilidade e o consumo consciente.</p>
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

