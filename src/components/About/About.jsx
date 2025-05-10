import React from 'react';
import styles from './About.module.css';

const About = () => {
  return (
    <section id="about" className={`${styles.aboutSection} content-section`}>
      <div className={`${styles.container} container`}>
        <h2 className={styles.sectionTitle}>O Que é o Ecolote?</h2>
        <div className={styles.aboutContent}>
          <div className={styles.aboutText}>
            <p>
              <strong>Ecolote é a sua porta de entrada para a revolução da energia solar.</strong> Uma plataforma inovadora que nasceu com o propósito de democratizar o acesso à energia limpa, tornando-a mais acessível, rentável e, acima de tudo, descomplicada para todos os brasileiros.
            </p>
            <p>
              Imagine poder contribuir ativamente para um futuro mais sustentável, economizar significativamente na sua conta de luz e ainda fazer parte de uma comunidade engajada na transformação energética do país. Com o Ecolote, isso não é apenas possível, é simples e prático.
            </p>
            <p>
            Você adquire sua própria mini usina solar remota, instalada em um lote rural de 30m², em uma das regiões com maior incidência solar do estado.
Essa usina é sua — registrada no seu nome, com garantia e monitoramento — e injeta energia diretamente na rede elétrica.
A energia gerada é convertida em créditos que abatem em sua conta de luz, sem a necessidade de instalar nada em sua casa ou apartamento.
Tudo de forma legal, sustentável e com segurança contratual.
            </p>
            <p>
              Seja você, pessoa física ou jurídica, o Ecolote oferece planos flexíveis e transparentes, adaptados às suas necessidades de consumo. Junte-se a nós e faça parte da mudança. Ecolote: energia inteligente para você, sustentabilidade para o planeta.
            </p>
          </div>
          <div className={styles.aboutImageContainer}>
            {/* Imagem representativa da energia solar ou da plataforma Ecolote */}
            <img src="https://images.unsplash.com/photo-1620759354896-960271903e32?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80" alt="Painéis solares em um campo verde" className={styles.aboutImage} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
