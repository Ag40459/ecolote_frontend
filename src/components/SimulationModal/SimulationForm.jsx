import { useState, useEffect } from 'react';
import styles from '../SimulationModal/SimulationModal.module.css';
import { formatPhone, formatCep } from '../../utils/formatters';
import { fetchCepData } from '../../utils/cepService';
import EnergyPulseAnimation from '../UI/EnergyPulseAnimation';
import { formatCurrency } from '../../utils/calc';

const SimulationForm = ({ initialValue, profileType, cep, name, email, phone, address, loadingCep, cepError, onSubmit, onClose, onProfileTypeChange, onCepChange, onNameChange, onEmailChange, onPhoneChange }) => {
  const [billValue, setBillValue] = useState(initialValue || 200);
  const [formattedBillValue, setFormattedBillValue] = useState('');

  // Formatar o valor inicial
  useEffect(() => {
    setFormattedBillValue(formatCurrency(billValue.toString(), 'input'));
  }, [billValue]);

  // Função para lidar com a mudança no valor da conta
  const handleBillValueChange = (e) => {
    const raw = e.target.value.replace(/\D/g, '');
    const numeric = raw ? parseInt(raw, 10) : 0;

    setBillValue(numeric);
    setFormattedBillValue(formatCurrency(numeric, 'input'));
  };

  // Função para lidar com o envio do formulário
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(billValue);
  };

  return (
    <>
      <div className={styles.modalHeader}>
        <button 
          id='simulation'
          className={styles.modalCloseButton} 
          onClick={onClose}
          aria-label="Fechar modal"
        >×</button>
        <div className={styles.modalIllustration}>
          <EnergyPulseAnimation />
        </div>
      </div>
      
      <div className={styles.modalContent}>
        <h2 className={`${styles.modalTitle} sectionTitle`}>Calcule Sua Economia Solar</h2>
        <p className={styles.modalSubtitle}>
          Descubra em segundos quanto você economizará com seu Ecolote e como ele se pagará ao longo do tempo.
        </p>
        
        <form onSubmit={handleSubmit}>
          <div className={styles.formGroup} style={{"--animation-order": 1}}>
            <label className={styles.formLabel}>Valor médio da sua conta de luz:</label>
            <div className={styles.currencyInputWrapper}>
              <input
                type="text"
                className={styles.formInput}
                value={formattedBillValue}
                onChange={handleBillValueChange}
                required
                aria-label="Valor médio mensal da conta de energia"
              />
            </div>
          </div>
          
          <div className={styles.formGroup} style={{"--animation-order": 2}}>
            <label className={styles.formLabel}>Tipo de uso:</label>
            <div className={styles.radioGroup}>
              <div className={styles.radioOption}>
                <input
                  type="radio"
                  id="pessoal"
                  name="profileType"
                  value="pessoal"
                  checked={profileType === 'pessoal'}
                  onChange={() => onProfileTypeChange('pessoal')}
                  className={styles.radioInput}
                />
                <label htmlFor="pessoal" className={styles.radioLabel}>Residencial</label>
              </div>
              
              <div className={styles.radioOption}>
                <input
                  type="radio"
                  id="empresa"
                  name="profileType"
                  value="empresa"
                  checked={profileType === 'empresa'}
                  onChange={() => onProfileTypeChange('empresa')}
                  className={styles.radioInput}
                />
                <label htmlFor="empresa" className={styles.radioLabel}>Empresarial</label>
              </div>
              
              <div className={styles.radioOption}>
                <input
                  type="radio"
                  id="investidor"
                  name="profileType"
                  value="investidor"
                  checked={profileType === 'investidor'}
                  onChange={() => onProfileTypeChange('investidor')}
                  className={styles.radioInput}
                />
                <label htmlFor="investidor" className={styles.radioLabel}>Investimento</label>
              </div>
            </div>
          </div>
          
          <div className={styles.formGroup} style={{"--animation-order": 3}}>
            <label className={styles.formLabel}>CEP</label>
            <input
              type="text"
              className={styles.formInput}
              value={cep}
              onChange={onCepChange}
              placeholder="00000-000"
              required
              aria-label="CEP para instalação"
            />
            {loadingCep && <p className={styles.loadingMessage}>Buscando CEP...</p>}
            {cepError && <p className={styles.errorMessage}>{cepError}</p>}
          </div>
          
          <div className={styles.formGroup} style={{"--animation-order": 4}}>
            <label className={styles.formLabel}>Nome e sobrenome</label>
            <input
              type="text"
              className={styles.formInput}
              value={name}
              onChange={onNameChange}
              required
              aria-label="Nome completo"
            />
          </div>
          
          <div className={styles.formGroup} style={{"--animation-order": 5}}>
            <label className={styles.formLabel}>Email</label>
            <input
              type="email"
              className={styles.formInput}
              value={email}
              onChange={onEmailChange}
              required
              aria-label="Endereço de email"
            />
          </div>
          
          <div className={styles.formGroup} style={{"--animation-order": 6}}>
            <label className={styles.formLabel}>Telefone ou WhatsApp</label>
            <input
              type="tel"
              className={styles.formInput}
              value={phone}
              onChange={onPhoneChange}
              placeholder="(00) 00000-0000"
              required
              aria-label="Número de telefone ou WhatsApp"
            />
          </div>
          
          <button type="submit" className={`${styles.submitButton} cta-button`}>
            Calcular Minha Economia
          </button>
        </form>
      </div>
    </>
  );
};

export default SimulationForm;
