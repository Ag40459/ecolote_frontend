import styles from './Features.module.css';

const FeatureCard = ({ iconClass, title, description }) => (
  <div className={styles.featureCard}>
    <i className={`${iconClass} ${styles.featureIcon}`}></i>
    <h3 className={styles.featureTitle}>{title}</h3>
    <p className={styles.featureDescription}>{description}</p>
  </div>
);

const Features = () => {
  const featuresData = [
    {
      iconClass: 'fas fa-leaf', // Exemplo de ícone Font Awesome
      title: 'Sustentabilidade Real',
      description: 'Contribua ativamente para a redução da pegada de carbono e para um futuro mais verde com energia 100% limpa e renovável.',
    },
    {
      iconClass: 'fas fa-piggy-bank',
      title: 'Economia Inteligente',
      description: 'Reduza significativamente sua conta de luz e proteja-se contra aumentos tarifários, otimizando seus gastos com energia.',
    },
    {
      iconClass: 'fas fa-handshake-angle',
      title: 'Acesso Descomplicado',
      description: 'Sem obras, sem instalações complexas e sem burocracia. A energia solar ao seu alcance de forma simples, rápida e prática.',
    },
    {
      iconClass: 'fas fa-chart-line',
      title: 'Rentabilidade Garantida',
      description: 'Invista em um ativo que gera economia e valorização, com planos flexíveis e transparentes para maximizar seu retorno.',
    },
    {
      iconClass: 'fas fa-cogs',
      title: 'Tecnologia de Ponta',
      description: 'Utilizamos as mais recentes tecnologias para monitoramento, gerenciamento e otimização da sua geração e consumo de energia.',
    },
    {
      iconClass: 'fas fa-users',
      title: 'Comunidade Engajada',
      description: 'Faça parte de uma comunidade que acredita na transformação energética e no poder da colaboração para um futuro sustentável.',
    },
  ];

  return (
    <section id="features" className={`${styles.featuresSection} content-section alt-bg`}>
      <div className={`${styles.container} container`}>
        <h2 className={styles.sectionTitle}>Principais Diferenciais Ecolote</h2>
        <p className={styles.sectionSubtitle}>
          Descubra por que o Ecolote é a escolha inteligente para quem busca economia, sustentabilidade e praticidade na geração de energia solar.
        </p>
        <div className={styles.featuresGrid}>
          {featuresData.map((feature, index) => (
            <FeatureCard
              key={index}
              iconClass={feature.iconClass}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
