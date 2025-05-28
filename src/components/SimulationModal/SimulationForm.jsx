import { useState, useEffect } from 'react';
import styles from '../SimulationModal/SimulationModal.module.css';
import EnergyPulseAnimation from '../UI/EnergyPulseAnimation';
import { formatCurrency } from '../../utils/calc';
import { formatPhone } from '../../utils/formatters'; // Ensure formatPhone is imported if used for responsavel

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
  // Estado local apenas para o valor formatado da conta
  const [formattedBillValue, setFormattedBillValue] = useState('');

  // Formatar o valor inicial ou quando initialValue mudar
  useEffect(() => {
    setFormattedBillValue(formatCurrency(initialValue.toString(), 'input'));
  }, [initialValue]);

  // Função para lidar com a mudança no valor da conta
  const handleBillValueChange = (e) => {
    const raw = e.target.value.replace(/\D/g, '');
    const numeric = raw ? parseInt(raw, 10) : 0;
    // Atualiza o estado no componente pai (SimulationModal)
    onBillValueChange(numeric);
    // Atualiza o estado local para exibição formatada
    setFormattedBillValue(formatCurrency(numeric.toString(), 'input'));
  };

  // Função para lidar com o envio do formulário
  const handleSubmitInternal = (e) => {
    e.preventDefault();
    // Chama a função onSubmit passada pelo pai (SimulationModal)
    // passando o valor numérico atual da conta (initialValue reflete o estado do pai)
    onSubmit(initialValue);
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
        
        <form onSubmit={handleSubmitInternal}>
          <div className={styles.formGroup} style={{"--animation-order": 1}}>
            <label className={styles.formLabel}>Valor médio da sua conta de luz:</label>
            <div className={styles.currencyInputWrapper}>
              <input
                type="text" // Use text para permitir formatação
                className={styles.formInput}
                value={formattedBillValue} // Exibe valor formatado
                onChange={handleBillValueChange} // Usa handler local
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
            {/* Ajustar label condicionalmente se necessário */}
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
             {/* Ajustar label condicionalmente */}
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

          {/* Campos adicionais para PJ */}
          {profileType === 'empresa' && (
            <>
              <div className={styles.formGroup} style={{"--animation-order": 7}}>
                <label className={styles.formLabel}>CNPJ</label>
                <input
                  type="text"
                  className={styles.formInput}
                  value={cnpj}
                  onChange={onCnpjChange} // Usa a prop passada
                  placeholder="00.000.000/0000-00" // Adicionar máscara se desejar
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
                  onChange={onNomeResponsavelChange} // Usa a prop passada
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
                  onChange={onTelefoneResponsavelChange} // Usa a prop passada
                  placeholder="(00) 00000-0000"
                  required
                  aria-label="Telefone do responsável pela empresa"
                />
              </div>
            </>
          )}
          
          <button type="submit" className={`${styles.submitButton} cta-button`}>
            Calcular Minha Economia
          </button>
        </form>
      </div>
    </>
  );
};

export default SimulationForm;