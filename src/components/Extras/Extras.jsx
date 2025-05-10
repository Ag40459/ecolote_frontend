import React, { useState, useEffect } from 'react';
import styles from './Extras.module.css';

const ExtrasSection = () => {
  const [rssContent, setRssContent] = useState(null);

  useEffect(() => {
    // Tentando buscar o conteúdo de um feed RSS alternativo
    fetch('https://example.com/rss-feed')  // Substitua com a URL do feed correto
      .then((response) => response.json())
      .then((data) => setRssContent(data))
      .catch((error) => console.error('Erro ao buscar o RSS:', error));
  }, []);

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
            <p>Fique por dentro das últimas novidades sobre energia solar, sustentabilidade e o Ecolote.</p>

            {/* Se o conteúdo RSS for carregado, exibe; caso contrário, mostra uma mensagem de erro */}
            {rssContent ? (
              <div>
                <p>{rssContent.title}</p> {/* Exibe um título ou qualquer dado necessário */}
                {/* Renderize mais conteúdo conforme a estrutura do RSS */}
              </div>
            ) : (
              <p>Não foi possível carregar o feed de notícias. Tente novamente mais tarde.</p>
            )}
          </div>

          <h3>EBook Informativo</h3>
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
    </section>
  );
};

export default ExtrasSection;
