import React from 'react';
import styles from './Innovation.module.css'; // Crie este arquivo CSS

const InnovationSection = () => {
  const innovations = [
    {
      iconClass: 'fas fa-brain', // Ícone para IA e Otimização
      title: 'Inteligência Artificial na Gestão',
      description: 'Utilizamos algoritmos de IA para otimizar a distribuição de energia, prever demandas e garantir a máxima eficiência na geração e consumo dos seus lotes solares.'
    },
    {
      iconClass: 'fas fa-cubes', // Ícone para Blockchain e Transparência
      title: 'Blockchain para Transparência Total',
      description: 'Todas as transações e a rastreabilidade dos seus créditos de energia são registradas em blockchain, garantindo segurança, imutabilidade e total transparência no processo.'
    },
    {
      iconClass: 'fas fa-mobile-alt', // Ícone para Plataforma Intuitiva
      title: 'Plataforma Digital Intuitiva',
      description: 'Acesse e gerencie seus lotes de energia, acompanhe sua economia e interaja com a comunidade Ecolote através de uma plataforma mobile-first, simples e amigável.'
    },
    {
      iconClass: 'fas fa-network-wired', // Ícone para Smart Grid
      title: 'Integração com Smart Grids',
      description: 'Estamos na vanguarda da integração com redes elétricas inteligentes (smart grids), preparando o caminho para um futuro energético mais conectado e eficiente.'
    }
  ];

  return (
    <section id="innovation" className={`${styles.innovationSection} content-section alt-bg`}>
      <div className={`${styles.container} container`}>
        <h2 className={styles.sectionTitle}>Inovação no DNA Ecolote</h2>
        <p className={styles.sectionSubtitle}>
          O Ecolote combina tecnologia de ponta e modelos de negócio disruptivos para revolucionar o mercado de energia solar.
        </p>
        <div className={styles.innovationsGrid}>
          {innovations.map((innovation, index) => (
            <div key={index} className={styles.innovationCard}>
              <div className={styles.innovationIconContainer}>
                <i className={`${innovation.iconClass} ${styles.innovationIcon}`}></i>
              </div>
              <h3 className={styles.innovationTitle}>{innovation.title}</h3>
              <p className={styles.innovationDescription}>{innovation.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default InnovationSection;
