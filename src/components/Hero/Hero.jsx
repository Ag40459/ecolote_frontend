import styles from './Hero.module.css';

const Hero = () => {
  return (
    <section id="hero" className={styles.heroSection}>
      <div className={styles.heroOverlay}></div>
      <div className={`${styles.heroContent} container`}>
        <h1 className={styles.heroTitle}>Ecolote: A Nova Era da Energia Solar Sustentável</h1>
        <p className={styles.heroSubtitle}>
          Descubra como o Ecolote está democratizando o acesso à energia limpa, tornando-a mais acessível, rentável e descomplicada para todos. Invista no futuro, economize e contribua para um planeta mais verde.
        </p>
        <a href="#contact" className={`${styles.ctaButton} cta-button`}>Quero Saber Mais</a>
      </div>
    </section>
  );
};

export default Hero;
