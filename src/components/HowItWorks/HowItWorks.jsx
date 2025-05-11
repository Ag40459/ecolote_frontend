// HowItWorks.jsx
import styles from './HowItWorks.module.css';
import HowItWorksImage1 from '../../assets/HowItWorksImage1.jpg';
import HowItWorksImage2 from '../../assets/HowItWorksImage2.jpg';
import HowItWorksImage3 from '../../assets/HowItWorksImage3.jpg';
import HowItWorksImage4 from '../../assets/HowItWorksImage4.jpg';
import HowItWorksImage5 from '../../assets/HowItWorksImage5.jpg';
import HowItWorksImage6 from '../../assets/HowItWorksImage6.png';

const HowItWorks = () => {
  const steps = [
    {
      id: 1,
      title: 'Cadastro Rápido e Fácil',
      description: 'Faça seu pré-cadastro em nossa página e nossa equipe entrará em contato para fornecer todos os detalhes sobre a aquisição do seu EcoLote, apresentando as melhores opções de acordo com o seu consumo.',
      image: HowItWorksImage1
    },
    {
      id: 2,
      title: 'Escolha Sua Usina Ideal',
      description: 'Escolha a melhor solução para sua usina solar, ajustada ao seu consumo mensal, garantindo eficiência e economia de forma personalizada.',
      image: HowItWorksImage2
    },
    {
      id: 3,
      title: 'Adquira Seus EcoLote',
      description: 'Adquira seu EcoLote, gere seus próprios kWh e elimine a dependência da conta de luz convencional. Além disso, acumule a energia não utilizada, contribuindo para um futuro mais sustentável.',
      image: HowItWorksImage3
    },
    {
      id: 4,
      title: 'Acompanhe Pelo App',
      description: 'Acompanhe a produção da sua usina em tempo real e observe o impacto positivo da sua escolha sustentável, garantindo eficiência e comprometimento com o meio ambiente.',
      image: HowItWorksImage4
    },
    {
      id: 5,
      title: 'Segurança e Transparência',
      description: 'Tenha tranquilidade com seus equipamentos: sua usina está protegida pela nossa parceira de seguros. Acesse a câmera do seu Ecolote remotamente e acompanhe tudo em tempo real.',
      image: HowItWorksImage5
    },
    {
      id: 6,
      title: 'Monitoramento do Local',
      description: 'Nosso bairro conta com monitoramento completo por câmeras de segurança, em parceria com a prefeitura, uma empresa privada especializada e o apoio da polícia local. Uma estrutura sólida que garante mais proteção e tranquilidade para todos.',
      image: HowItWorksImage6
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
