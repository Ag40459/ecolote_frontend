import styles from '../Contact/Contact.module.css'; 
import ContactModal from '../ContactModal/ContactModal.jsx';
import { useState } from 'react';

const ContactSection = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  
  return (
    <section id="contact" className={`${styles.contactSection} content-section`}>
      <div className={`${styles.container} container`}>
        <h2 className={styles.sectionTitle}>Faça Seu Pré-Cadastro</h2>
        <p className={styles.sectionSubtitle}>
          Tem interesse em garantir o Ecolote com preço de pré-venda? Faça agora seu pré-cadastro!<br></br><br></br>
        Ao se pré-cadastrar, você garante acesso ao preço especial de pré-venda, sem compromisso de compra.

        </p>
        <br></br>
        <div className={styles.buttonContainer}>
          <button 
            onClick={openModal} 
            className={`${styles.contactButton} cta-button`}>
            Faça Sua Reserva
          </button>
        </div>
        <ContactModal isOpen={isModalOpen} onClose={closeModal} />
      </div>
      <br></br>
          <strong>Ecolote: Energia limpa para todos – um novo Brasil começa aqui 🌱⚡</strong>

    </section>
  );
};

export default ContactSection;

