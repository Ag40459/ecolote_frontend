import React, { useState, useEffect } from 'react';
import styles from './ContactModal.module.css';

const VerificationCodeModal = ({ isOpen, onClose, onVerify, email, onResendCode }) => {
  const [verificationCode, setVerificationCode] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [countdown, setCountdown] = useState(0);

  useEffect(() => {
    let timer;
    if (countdown > 0) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [countdown]);

  useEffect(() => {
  if (!isOpen) {
    // Reset dos estados quando o modal é fechado
    setVerificationCode('');
    setError('');
    setIsSubmitting(false);
  }
}, [isOpen]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!verificationCode.trim()) {
      setError('Por favor, insira o código de verificação');
      return;
    }

    setIsSubmitting(true);
    setError('');

    try {
      await onVerify(verificationCode);
      // Se chegar aqui, a verificação foi bem-sucedida
    } catch (err) {
      setError(err.message || 'Código inválido. Por favor, tente novamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResendCode = () => {
    onResendCode();
    setCountdown(60); // 60 segundos de espera para reenvio
  };

  if (!isOpen) return null;

return (
  <div className={`${styles.modalOverlay} ${document.body.classList.contains('dark-theme') ? styles.darkOverlay : ''}`}>
    <div className={`${styles.modalContent} ${document.body.classList.contains('dark-theme') ? styles.darkContent : ''}`}>
      <button className={styles.closeButton} onClick={onClose}>
        &times;
      </button>
      <h2>Verificação de Email</h2>
      <p>
        Enviamos um código de verificação para <strong>{email}</strong>.
        Por favor, insira o código abaixo para completar seu cadastro.
      </p>

      <form onSubmit={handleSubmit} className={styles.verificationForm}>
        <div className={styles.formGroup}>
          <label htmlFor="verificationCode">Código de Verificação:</label>
          <input
            type="text"
            id="verificationCode"
            value={verificationCode}
            onChange={(e) => setVerificationCode(e.target.value)}
            placeholder="Digite o código recebido"
            required
          />
        </div>

        {error && <p className={styles.errorMessage}>{error}</p>}

        <button type="submit" className={styles.submitButton} disabled={isSubmitting}>
          {isSubmitting ? 'Verificando...' : 'Verificar Código'}
        </button>

        <div className={styles.resendCodeContainer}>
          {countdown > 0 ? (
            <p>Reenviar código em {countdown} segundos</p>
          ) : (
            <span 
      className={styles.resendLink} 
      onClick={handleResendCode} 
      role="button" 
      tabIndex={0} 
    >
      Reenviar Código
    </span>
          )}
        </div>
      </form>
    </div>
  </div>
);


};

export default VerificationCodeModal;