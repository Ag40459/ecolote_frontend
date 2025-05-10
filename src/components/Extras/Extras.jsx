import React from 'react';
import styles from './Extras.module.css'; // Assume CSS module for styling

const ExtrasSection = () => {
  return (
    <section id="extras" className={`${styles.extrasSection} content-section`}>
      <div className={`${styles.container} container`}>
        <h2 className={styles.sectionTitle}>Extras</h2>
        <div className={styles.extrasContent}>
          <p>
  Aqui você encontrará respostas para as dúvidas mais comuns sobre o Ecolote&nbsp;
  <a
    href="https://docs.google.com/document/d/1r2sNiulvtPQsloQTFp81O7rgKz-s01y9SL_wbmEJ60I/edit?usp=sharing"
    target="_blank"
    rel="noopener noreferrer"
    style={{ textDecoration: 'none' }}
  >
    📄
  </a>
</p>

         <div className={styles.blogSection}>
  <h3>Blog/Notícias</h3>
  <p>
    <span role="img" aria-label="emojis">EM BREVE ⏳</span> <br></br>Fique por dentro das últimas novidades sobre energia solar, sustentabilidade e o Ecolote. 
    
  </p>
</div>
<div className={styles.testimonialsSection}>


            
  <h3>eBook Informativo</h3>
  <p>
    Veja mais detalhes sobre o Ecolote acessando nosso eBook completo&nbsp;
    <a
      href="https://docs.google.com/document/d/1RL7-R-AsGiUBrSFWw1TveYEePA5AmHeAxMDGpwPeSg0/edit?usp=sharing"
      target="_blank"
      rel="noopener noreferrer"
      style={{ textDecoration: 'none' }}
    >
      📘
    </a>
  </p>
</div>

        </div>
      </div>
    </section>
  );
};

export default ExtrasSection;

