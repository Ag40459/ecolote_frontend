import styles from './About.module.css';
import imageAbout from '../../assets/imageAbout.png';

const About = () => {
  return (
    <section id="about" className={`${styles.aboutSection} content-section`}>
      <div className={`${styles.container} container`}>
        <h2 className={styles.sectionTitle}>O Que é o Ecolote?</h2>

        <div className={styles.aboutImageContainer}>
          <img
            src={imageAbout}
            alt="Usina solar do Ecolote com painéis solares organizados em fileiras em um terreno rural, com sistema de monitoramento e segurança"
            className={styles.aboutImage}
          />
          <p className={styles.imageCaption}>
            Usina solar remota do Ecolote: sua energia limpa sem complicações
          </p>
        </div>

        <div className={styles.aboutText}>
          <p>
            <strong>Ecolote é a sua porta de entrada para a revolução da energia solar. </strong> 
            Uma plataforma inovadora que democratiza o acesso à energia limpa, tornando-a acessível, rentável e descomplicada para todos os brasileiros.
          </p>
          <p>
            Você adquire uma <strong>mini usina solar remota</strong>, instalada em um lote rural de <strong>30m²</strong> em uma das regiões com maior incidência solar do estado.
            A usina é registrada em seu nome, com <strong>garantia</strong>, <strong>monitoramento</strong> e funcionamento totalmente legalizado.
          </p>

          <h3 className={styles.subtitle}>Benefícios</h3>
         
         <ul className={styles.benefitsList}>
          
  <li><strong><span className={styles.checkmark}>✔</span> Reduz sua conta de luz a taxa mínima</strong></li>
  <li><strong><span className={styles.checkmark}>✔</span> Sem instalação em sua casa</strong></li>
  <li><strong><span className={styles.checkmark}>✔</span> Energia 100% limpa e sustentável</strong></li>
  <li><strong><span className={styles.checkmark}>✔</span> Usina registrada em seu nome</strong></li>
</ul>


          <h3 className={styles.subtitle}>Para Quem é Indicado</h3>
          <p>
            Seja pessoa física ou jurídica, o Ecolote oferece <strong>planos flexíveis e transparentes</strong>, adaptados ao seu perfil de consumo. 
            Faça parte da transformação energética do Brasil com <strong>energia inteligente para você e sustentabilidade para o planeta</strong>.
          </p>

          <div className={styles.ctaContainer}>
            <a href="#contact" className={styles.ctaButton}>Quero Minha Usina Solar</a>

          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
