// HowItWorks.jsx
import styles from './HowItWorks.module.css';
import HowItWorksImage1 from '../../assets/HowItWorksImage1.jpg';
import HowItWorksImage2 from '../../assets/HowItWorksImage2.jpg';
import HowItWorksImage3 from '../../assets/HowItWorksImage3.jpg';
import HowItWorksImage4 from '../../assets/HowItWorksImage4.jpg';

const HowItWorks = () => {
  const steps = [
    {
      id: 1,
      title: 'Cadastro Rápido e Fácil',
      description: 'Crie sua conta na plataforma Ecolote em poucos minutos, com segurança e sem burocracia.',
      image: HowItWorksImage1
    },
    {
      id: 2,
      title: 'Escolha Seu Plano Ideal',
      description: 'Compare os planos disponíveis e selecione aquele que mais combina com seu consumo e economia.',
      image: HowItWorksImage2
    },
    {
      id: 3,
      title: 'Adquira Seus EcoLote',
      description: 'Compre lotes de energia solar e gere créditos para abater na sua conta de luz convencional.',
      image: HowItWorksImage3
    },
    {
      id: 4,
      title: 'Economize e Contribua',
      description: 'Acompanhe quanto sua usina está produzindo em tempo real e veja o impacto positivo da sua escolha sustentável.',
      image: HowItWorksImage4
    }
  ];

  return (
    <section id="how-it-works" className={styles.howItWorksSection}>
      <div className={styles.container}>
        <h2 className={styles.sectionTitle}>Como Funciona o Ecolote?</h2>
        <p className={styles.sectionSubtitle}>
          Participar da revolução solar com o Ecolote é simples e transparente. Veja como é fácil economizar e ajudar o planeta:
        </p>
        <div className={styles.stepsGrid}>
          {steps.map((step) => (
            <div key={step.id} className={styles.stepItem}>
              <img src={step.image} alt={step.title} className={styles.stepImage} />
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </div>
          ))}
        </div>
        <p className={styles.callToAction}>
          Comece agora! Faça parte da transformação energética com a Ecolote.
        </p>
      </div>
    </section>
  );
};

export default HowItWorks;
