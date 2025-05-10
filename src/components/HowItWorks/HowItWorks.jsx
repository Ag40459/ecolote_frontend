import React from 'react';
import styles from './HowItWorks.module.css';

const HowItWorks = () => {
  const steps = [
    {
      id: 1,
      iconClass: 'fas fa-user-plus', // Ícone para cadastro
      title: 'Cadastro Rápido e Fácil',
      description: 'Crie sua conta na plataforma Ecolote em poucos minutos, sem burocracia e com total segurança dos seus dados.',
      image: 'https://images.unsplash.com/photo-1580894732444-8ecded7948bf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80' // Exemplo de imagem
    },
    {
      id: 2,
      iconClass: 'fas fa-file-signature', // Ícone para escolha do plano
      title: 'Escolha Seu Plano Ideal',
      description: 'Analise nossos planos flexíveis e escolha aquele que melhor se adapta ao seu perfil de consumo e às suas metas de economia.',
      image: 'https://images.unsplash.com/photo-1556740738-b6a63e27c4df?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80' // Exemplo de imagem
    },
    {
      id: 3,
      iconClass: 'fas fa-solar-panel', // Ícone para aquisição de lotes
      title: 'Adquira Seus Lotes de Energia',
      description: 'Compre seus lotes de energia solar de forma transparente e comece a gerar créditos para abater na sua conta de luz convencional.',
      image: 'https://images.unsplash.com/photo-1600992920501-ae3310071029?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80' // Exemplo de imagem
    },
    {
      id: 4,
      iconClass: 'fas fa-chart-pie', // Ícone para economia e sustentabilidade
      title: 'Economize e Contribua',
      description: 'Acompanhe sua economia em tempo real, veja seus créditos de energia sendo aplicados e sinta o impacto positivo da sua escolha sustentável.',
      image: 'https://images.unsplash.com/photo-1630579099970-4a6155906672?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80' // Exemplo de imagem
    }
  ];

  return (
    <section id="how-it-works" className={`${styles.howItWorksSection} content-section`}>
      <div className={`${styles.container} container`}>
        <h2 className={styles.sectionTitle}>Como Funciona o Ecolote?</h2>
        <p className={styles.sectionSubtitle}>
          Participar da revolução da energia solar com o Ecolote é simples, rápido e transparente. Veja como é fácil começar a economizar e contribuir para um futuro mais verde:
        </p>
        <div className={styles.stepsGrid}>
          {steps.map((step) => (
            <div key={step.id} className={styles.stepCard}>
              <div className={styles.stepIconContainer}>
                <i className={`${step.iconClass} ${styles.stepIcon}`}></i>
                <span className={styles.stepNumber}>{step.id}</span>
              </div>
              <img src={step.image} alt={step.title} className={styles.stepImage} />
              <h3 className={styles.stepTitle}>{step.title}</h3>
              <p className={styles.stepDescription}>{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
