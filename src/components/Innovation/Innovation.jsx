import styles from './Innovation.module.css';
import BrainIcon from '../../assets/BrainIcon';
import BoltIcon from '../../assets/BoltIcon';
import NetworkIcon from '../../assets/NetworkIcon';

const innovations = [
  {
    Icon: BrainIcon,
    title: 'Inteligência Artificial',
    description:
      'Nossos algoritmos de IA monitoram constantemente o desempenho da sua usina, prevendo condições climáticas, otimizando a geração e garantindo máxima eficiência.',
    highlight: 'Previsão de geração e economia com precisão',
  },
  {
    Icon: BoltIcon,
    title: 'kWh Gerados',
    description:
      'Toda energia produzida pelo seu EcoLote é registrada pela concessionária e convertida em créditos digitais.',
    highlight: 'Acúmulo de créditos por 5 anos, mesmo mudando de endereço',
  },
  {
    Icon: NetworkIcon,
    title: 'Rede Inteligente',
    description:
      'Você integra uma rede elétrica inteligente que distribui energia de forma otimizada, garantindo custos reduzidos e manutenção eficiente.',
    highlight: 'Gestão compartilhada: custos menores',
  },
];

const InnovationSection = () => {
  return (
    <section id="innovation" className={styles.innovationSection}>
      <div className="container">
        <div className={styles.innovationHeader}>
          <h2 className={styles.innovationTitle}>
            Tecnologia que Democratiza a Energia Solar
          </h2>
          <p className={styles.innovationSubtitle}>
            Nossa tecnologia torna a energia solar acessível a todos.
          </p>
        </div>
        <div className={styles.innovationCards}>
          {innovations.map(({ Icon, title, description, highlight }, index) => (
            <div className={styles.innovationCard} key={index}>
              <div className={styles.cardIconContainer}>
                <Icon className={styles.cardIcon} />
              </div>
              <div className={styles.cardContent}>
                <h3 className={styles.cardTitle}>{title}</h3>
                <p className={styles.cardDescription}>{description}</p>
                <div className={styles.cardHighlight}>{highlight}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default InnovationSection;