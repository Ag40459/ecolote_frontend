import { useState, useEffect, useRef } from 'react';
import styles from './Contact.module.css';
import ContactModal from '../ContactModal/ContactModal.jsx';

const ContactSection = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);
  
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  
  // Detectar quando a seção entra na viewport para animar
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.2 }
    );
    
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    
    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  // Renderizar partículas solares
  const renderSolarParticles = () => {
    const particles = [];
    for (let i = 0; i < 10; i++) {
      particles.push(
        <div 
          key={i} 
          className={styles.particle}
          style={{
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 5}s`,
            animationDuration: `${5 + Math.random() * 5}s`
          }}
        ></div>
      );
    }
    return particles;
  };
  
  return (
    <section 
      id="contact" 
      ref={sectionRef}
      className={`${styles.contactSection} ${isVisible ? styles.visible : ''} content-section`}
    >
      {/* Fundo dinâmico com ondas e partículas */}
      <div className={styles.contactBackground}>
        <div className={styles.energyWaves}>
          <div className={styles.wave}></div>
          <div className={styles.wave}></div>
          <div className={styles.wave}></div>
        </div>
        <div className={styles.solarParticles}>
          {renderSolarParticles()}
        </div>
      </div>
      
      <div className={`${styles.contactContainer} container`}>
                        <div className={styles.contactContent}>
                    <div className={styles.contactInfo}>
                       
        </div>
          <h2 className={styles.sectionTitle}>
          <span className={styles.titleHighlight}>Faça Seu</span> Pré-Cadastro
        </h2>
          <div className={styles.contactAction}>
            <div className={styles.actionCard}>
              
              <div className={styles.cardContent}>
                
                <h3 className={styles.cardTitle}>
                  <span className={styles.typingText}>Pronto para Investir no Seu Futuro Energético?</span>
                </h3>
                <p className={styles.cardText}>
                  Faça seu pré-cadastro agora mesmo e garanta:
                </p>
                
                <div className={styles.benefitsList}>
                  <div className={styles.benefitItem}>
                    <div className={styles.benefitCheck}>✓</div>
                    <span>Preço especial de pré-venda</span>
                  </div>
                  <div className={styles.benefitItem}>
                    <div className={styles.benefitCheck}>✓</div>
                    <span>Atendimento prioritário</span>
                  </div>
                  <div className={styles.benefitItem}>
                    <div className={styles.benefitCheck}>✓</div>
                    <span>Simulação personalizada</span>
                  </div>
                  <div className={styles.benefitItem}>
                    <div className={styles.benefitCheck}>✓</div>
                    <span>Sem compromisso de compra</span>
                  </div>
                </div>
                
                <button 
                  onClick={openModal} 
                  className={`${styles.reserveButton} ${styles.energyButton}`}
                >
                  <span className={styles.buttonText}>Faça Sua Reserva</span>
                  <span className={styles.buttonIcon}>→</span>
                  <span className={styles.buttonPulse}></span>
                </button>
              </div>
            </div>
          </div>
        </div>
        
        <div className={styles.contactFooter}>
          <div className={styles.tagline}>
            <strong>Ecolote: Energia limpa para todos – um novo Brasil começa aqui</strong>
            <span className={styles.taglineIcons}>🌱⚡</span>
          </div>
        </div>
      </div>
      
      <ContactModal isOpen={isModalOpen} onClose={closeModal} />
    </section>
  );
};

export default ContactSection;