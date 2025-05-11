import React, { useState, useEffect } from 'react';
import styles from './ContactModal.module.css';
import { fetchCepData } from '../../utils/cepService';

// Importando os hooks de formulário
import { usePessoaFisicaForm } from '../../hooks/usePessoaFisicaForm';
import { usePessoaJuridicaForm } from '../../hooks/usePessoaJuridicaForm';
import { useInvestidorForm } from '../../hooks/useInvestidorForm';

// Importando os componentes de formulário
import PessoaFisicaForm from './PessoaFisicaForm';
import PessoaJuridicaForm from './PessoaJuridicaForm';
import InvestidorForm from './InvestidorForm';

const ContactModal = ({ isOpen, onClose }) => {
  const [modalStep, setModalStep] = useState(1); // 1 for type selection, 2 for form
  const [selectedType, setSelectedType] = useState('');
  const [loadingCep, setLoadingCep] = useState(false);
  const [cepError, setCepError] = useState('');

  const pfForm = usePessoaFisicaForm();
  const pjForm = usePessoaJuridicaForm();
  const invForm = useInvestidorForm();

  const resetAllForms = () => {
    pfForm.resetPessoaFisicaForm();
    pjForm.resetPessoaJuridicaForm();
    invForm.resetInvestidorForm();
    setCepError('');
  };

  const handleTypeSelect = (type) => {
    setSelectedType(type);
    setModalStep(2);
    resetAllForms();
  };

  const handleBack = () => {
    setModalStep(1);
    // Não resetar aqui para permitir correção do tipo
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    let formData = { selectedType };

    if (selectedType === 'pessoa física') {
      formData = { ...formData, ...pfForm.getValues() };
    } else if (selectedType === 'pessoa jurídica') {
      formData = { ...formData, ...pjForm.getValues() };
    } else if (selectedType === 'investidor') {
      formData = { ...formData, ...invForm.getValues() };
    }

    console.log('Submitting contact form:', formData);
    resetAllForms();
    setModalStep(1);
    setSelectedType('');
    onClose(); // Fechar o modal após o envio
  };

  // Efeito para buscar CEP
  useEffect(() => {
    let currentCep = '';
    if (selectedType === 'pessoa física') {
      currentCep = pfForm.pfCep;
    } else if (selectedType === 'pessoa jurídica') {
      currentCep = pjForm.pjCep;
    }

    if (currentCep && currentCep.replace(/[^0-9]/g, '').length === 8) {
      const numericCep = currentCep.replace(/[^0-9]/g, '');
      setLoadingCep(true);
      setCepError('');
      fetchCepData(numericCep)
        .then(data => {
          setLoadingCep(false);
          if (selectedType === 'pessoa física') {
            pfForm.setPfRua(data.logradouro || '');
            pfForm.setPfBairro(data.bairro || '');
            pfForm.setPfCidade(data.localidade || '');
            pfForm.setPfEstado(data.uf || '');
          } else if (selectedType === 'pessoa jurídica') {
            pjForm.setPjRua(data.logradouro || '');
            pjForm.setPjBairro(data.bairro || '');
            pjForm.setPjCidade(data.localidade || '');
            pjForm.setPjEstado(data.uf || '');
          }
        })
        .catch(err => {
          setLoadingCep(false);
          setCepError(err.message || 'Erro ao buscar CEP. Tente novamente.');
          // Limpar campos em caso de erro
          if (selectedType === 'pessoa física') {
            pfForm.setPfRua(''); pfForm.setPfBairro(''); pfForm.setPfCidade(''); pfForm.setPfEstado('');
          } else if (selectedType === 'pessoa jurídica') {
            pjForm.setPjRua(''); pjForm.setPjBairro(''); pjForm.setPjCidade(''); pjForm.setPjEstado('');
          }
        });
    }
  }, [pfForm.pfCep, pjForm.pjCep, selectedType, pfForm, pjForm]); // Adicionado pfForm e pjForm como dependências

  if (!isOpen) {
    return null;
  }

  const renderForm = () => {
    if (selectedType === 'pessoa física') {
      return <PessoaFisicaForm formData={pfForm} loadingCep={loadingCep} cepError={cepError} />;
    }
    if (selectedType === 'pessoa jurídica') {
      return <PessoaJuridicaForm formData={pjForm} loadingCep={loadingCep} cepError={cepError} />;
    }
    if (selectedType === 'investidor') {
      return <InvestidorForm formData={invForm} />;
    }
    return null;
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <button className={styles.closeButton} onClick={() => { setModalStep(1); resetAllForms(); onClose(); }}>
          &times;
        </button>

        {modalStep === 1 && (
          <div className={styles.typeSelectionContainer}>
            <h2>Como podemos te ajudar?</h2>
            <button onClick={() => handleTypeSelect('pessoa física')} className={styles.typeButton}>
              Pessoa Física
            </button>
            <button onClick={() => handleTypeSelect('pessoa jurídica')} className={styles.typeButton}>
              Pessoa Jurídica
            </button>
            <button onClick={() => handleTypeSelect('investidor')} className={styles.typeButton}>
              Investidor
            </button>
          </div>
        )}

        {modalStep === 2 && (
          <form onSubmit={handleSubmit} className={styles.contactForm}>
            <button type="button" onClick={handleBack} className={styles.backButton}>&larr; Voltar</button>
            <h2>Contato - {selectedType.charAt(0).toUpperCase() + selectedType.slice(1)}</h2>
            {renderForm()}
            <button type="submit" className={styles.submitButton}>
              Enviar Mensagem
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default ContactModal;

