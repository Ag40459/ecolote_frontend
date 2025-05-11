import styles from './Advantages.module.css'; 

const AdvantagesSection = () => {
  const advantages = [
    {
      iconClass: 'fas fa-dollar-sign',
      title: 'Economia Comprovada',
      description: 'Reduza sua conta de luz em até 100% e livre-se das flutuações tarifárias. Acumule o que não foi usado da energia gerada. Com o Ecolote, seu dinheiro rende mais'
    },
    {
      iconClass: 'fas fa-bolt',
      title: 'Energia Limpa e Inesgotável',
      description: 'Utilize uma fonte de energia 100% renovável, contribuindo para a preservação do meio ambiente e para um futuro mais sustentável.'
    },
    {
      iconClass: 'fas fa-puzzle-piece',
      title: 'Simplicidade e Conveniência',
      description: 'Adesão rápida, sem obras, sem manutenção. Gerencie tudo online de forma prática e transparente através da nossa plataforma.'
    },
    {
      iconClass: 'fas fa-shield-alt',
      title: 'Segurança e Confiabilidade',
      description: 'Conte com um seguro já incluso para proteção dos seus equipamentos e uma plataforma para acompanhar os créditos de energia gerados.'
    },
    {
      iconClass: 'fas fa-chart-area',
      title: 'Valorização do Seu Imóvel/Negócio',
      description: 'Associar sua marca ou residência a práticas sustentáveis agrega valor e demonstra responsabilidade socioambiental.'
    },
    {
      iconClass: 'fas fa-lightbulb',
      title: 'Inovação e Tecnologia',
      description: 'Acesso a uma solução moderna que utiliza tecnologia de ponta para otimizar a geração e o consumo de energia solar.'
    }
  ];

  return (
    <section id="advantages" className={`${styles.advantagesSection} content-section`}>
      <div className={`${styles.container} container`}>
        <h2 className={styles.sectionTitle}>Vantagens Exclusivas Ecolote</h2>
        <p className={styles.sectionSubtitle}>
          Descubra os benefícios que tornam o Ecolote a melhor escolha para quem busca energia solar de forma inteligente e vantajosa.
        </p>
        <div className={styles.advantagesGrid}>
          {advantages.map((advantage, index) => (
            <div key={index} className={styles.advantageCard}>
              <div className={styles.advantageIconContainer}>
                <i className={`${advantage.iconClass} ${styles.advantageIcon}`}></i>
              </div>
              <h3 className={styles.advantageTitle}>{advantage.title}</h3>
              <p className={styles.advantageDescription}>{advantage.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AdvantagesSection;
