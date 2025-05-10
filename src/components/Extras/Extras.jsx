import React from 'react';
import styles from './Extras.module.css'; // Assume CSS module for styling

const ExtrasSection = () => {
  return (
    <section id="extras" className={`${styles.extrasSection} content-section`}>
      <div className={`${styles.container} container`}>
        <h2 className={styles.sectionTitle}>Extras</h2>
        <div className={styles.extrasContent}>
          <div className={styles.faqSection}>
            <h3>Perguntas Frequentes (FAQ)</h3>
            <p>Aqui você encontrará respostas para as dúvidas mais comuns sobre o Ecolote.</p>
            {/* Placeholder for FAQ items */}
          </div>
          <div className={styles.blogSection}>
            <h3>Blog/Notícias</h3>
            <p>Fique por dentro das últimas novidades sobre energia solar, sustentabilidade e o Ecolote.</p>
            {/* Placeholder for blog posts */}
          </div>
          <div className={styles.testimonialsSection}>
            <h3>Depoimentos</h3>
            <p>Veja o que nossos usuários estão dizendo sobre a experiência com o Ecolote.</p>
            {/* Placeholder for testimonials */}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExtrasSection;

