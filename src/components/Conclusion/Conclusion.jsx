import styles from './Conclusion.module.css'; // Crie este arquivo CSS

const ConclusionSection = () => {
  return (
    <section id="conclusion" className={`${styles.conclusionSection} content-section alt-bg`}>
      <div className={`${styles.container} container`}>
        <h2 className={styles.sectionTitle}>Ecolote: Seu Futuro Energético Começa Agora!</h2>
        <p className={styles.conclusionText}>
          O Ecolote não é apenas uma plataforma de energia solar; é um movimento em direção a um futuro mais sustentável, econômico e consciente. Ao se juntar a nós, você dá um passo significativo para reduzir sua pegada de carbono, economizar em seus custos de energia e fazer parte de uma comunidade que valoriza o planeta.
        </p>
        <p className={styles.conclusionText}>
          Com tecnologia de ponta, planos flexíveis e um compromisso inabalável com a transparência e a satisfação do cliente, o Ecolote está pronto para ser seu parceiro na jornada para a independência energética. Não espere mais para fazer a diferença.
        </p>
        <div className={styles.ctaContainer}>
          <a href="#contact" className={`${styles.ctaButtonConclusion} cta-button`}>
            Quero Fazer Parte da Mudança
          </a>
          <a href="#how-it-works" className={`${styles.secondaryButtonConclusion} cta-button-secondary`}>
            Entenda Melhor Como Funciona
          </a>
        </div>
        <p className={styles.finalPhrase}>
          <strong>Ecolote: Energia limpa para todos – um novo Brasil começa aqui 🌱⚡</strong>
        </p>
      </div>
    </section>
  );
};

export default ConclusionSection;
