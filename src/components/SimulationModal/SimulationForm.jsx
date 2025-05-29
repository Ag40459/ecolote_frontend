import { useState, useEffect } from 'react';
import styles from '../SimulationModal/SimulationModal.module.css';
import EnergyPulseAnimation from '../UI/EnergyPulseAnimation';
// Removida a importação da função formatCurrencyInput que não está mais sendo usada
// import { formatCurrencyInput } from '../../utils/calc';

const SimulationForm = ({ 
  initialValue, 
  profileType, 
  cep, 
  name, 
  email, 
  phone, 
  address, 
  loadingCep, 
  cepError, 
  onSubmit, 
  onClose, 
  onProfileTypeChange, 
  onCepChange, 
  onNameChange, 
  onEmailChange, 
  onPhoneChange, 
  // Novas props para PJ
  cnpj, 
  nomeResponsavel, 
  telefoneResponsavel, 
  onCnpjChange, 
  onNomeResponsavelChange, 
  onTelefoneResponsavelChange,
  // Prop para atualizar valor da conta no modal pai
  onBillValueChange 
}) => {
  // Estado local para o valor formatado da conta
  const [billValue, setBillValue] = useState('');
  // Estado adicional para armazenar o valor numérico puro
  const [numericBillValue, setNumericBillValue] = useState(0);

  // Inicializa o valor do input com o valor inicial
  useEffect(() => {
    if (initialValue) {
      // Formatar o valor inicial para exibição
      const formattedValue = initialValue.toLocaleString('pt-BR', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      });
      setBillValue(formattedValue);
      setNumericBillValue(initialValue);
    }
  }, [initialValue]);

  // Função para lidar com a mudança no valor da conta
  const handleBillValueChange = (e) => {
    const rawValue = e.target.value;
    
    // Limpar caracteres não numéricos, mantendo apenas dígitos
    const digits = rawValue.replace(/\D/g, '');
    
    // Formatar o valor para exibição (X,XX)
    let formattedValue = '';
    if (digits) {
      // Converter para número e formatar como moeda
      const numericValue = parseFloat(digits) / 100;
      formattedValue = numericValue.toLocaleString('pt-BR', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      });
    }
    
    // Atualizar o estado local com o valor formatado
    setBillValue(formattedValue);
    
    // Atualizar o valor numérico puro
    const numericValue = digits ? parseFloat(digits) / 100 : 0;
    setNumericBillValue(numericValue);
    
    // Atualizar o estado pai com o valor numérico
    onBillValueChange(numericValue);
  };

  // Função para lidar com o envio do formulário
  const handleSubmitInternal = (e) => {
    e.preventDefault();
    // Usa o valor numérico atualizado
    onSubmit(numericBillValue); 
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
        <h2 className={`${styles.modalTitle} sectionTitle`}>Custo Do Seu Ecolote</h2>
        <p className={styles.modalSubtitle}>
          Descubra em segundos quanto será o custo do seu Ecolote.
        </p>
        
        <form onSubmit={handleSubmitInternal}>
          <div className={styles.formGroup} style={{"--animation-order": 1}}>
            <label className={styles.formLabel}>Valor médio da sua conta de luz:</label>
            <div className={styles.inputGroup}>
              <span className={styles.currencySymbol}>R$</span>
              <input
                type="text"
                inputMode="decimal"
                value={billValue}
                onChange={handleBillValueChange}
                placeholder="0,00"
                className={styles.simulatorInput}
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
            <label className={styles.formLabel}>{profileType === 'empresa' ? 'CEP da Empresa' : 'CEP'}</label>
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
            <label className={styles.formLabel}>{profileType === 'empresa' ? 'Razão Social' : 'Nome e Sobrenome'}</label>
            <input
              type="text"
              className={styles.formInput}
              value={name}
              onChange={onNameChange}
              required
              aria-label={profileType === 'empresa' ? 'Razão Social' : 'Nome completo'}
            />
          </div>
          
          <div className={styles.formGroup} style={{"--animation-order": 5}}>
            <label className={styles.formLabel}>{profileType === 'empresa' ? 'Email Comercial' : 'Email'}</label>
            <input
              type="email"
              className={styles.formInput}
              value={email}
              onChange={onEmailChange}
              required
              aria-label={profileType === 'empresa' ? 'Email comercial' : 'Endereço de email'}
            />
          </div>
          
          <div className={styles.formGroup} style={{"--animation-order": 6}}>
            <label className={styles.formLabel}>{profileType === 'empresa' ? 'Telefone Comercial' : 'Telefone ou WhatsApp'}</label>
            <input
              type="tel"
              className={styles.formInput}
              value={phone}
              onChange={onPhoneChange}
              placeholder="(00) 00000-0000"
              required
              aria-label={profileType === 'empresa' ? 'Telefone comercial' : 'Número de telefone ou WhatsApp'}
            />
          </div>

          {profileType === 'empresa' && (
            <>
              <div className={styles.formGroup} style={{"--animation-order": 7}}>
                <label className={styles.formLabel}>CNPJ</label>
                <input
                  type="text"
                  className={styles.formInput}
                  value={cnpj}
                  onChange={onCnpjChange}
                  placeholder="00.000.000/0000-00"
                  required
                  aria-label="CNPJ da empresa"
                />
              </div>

              <div className={styles.formGroup} style={{"--animation-order": 8}}>
                <label className={styles.formLabel}>Nome do Responsável</label>
                <input
                  type="text"
                  className={styles.formInput}
                  value={nomeResponsavel}
                  onChange={onNomeResponsavelChange}
                  required
                  aria-label="Nome do responsável pela empresa"
                />
              </div>

              <div className={styles.formGroup} style={{"--animation-order": 9}}>
                <label className={styles.formLabel}>Telefone do Responsável</label>
                <input
                  type="tel"
                  className={styles.formInput}
                  value={telefoneResponsavel}
                  onChange={onTelefoneResponsavelChange}
                  placeholder="(00) 00000-0000"
                  required
                  aria-label="Telefone do responsável pela empresa"
                />
              </div>
            </>
          )}
          
          <button type="submit" className={`${styles.submitButton} cta-button`}>
            Valor do meu Ecolote
          </button>
        </form>
      </div>
    </>
  );
};

export default SimulationForm;
