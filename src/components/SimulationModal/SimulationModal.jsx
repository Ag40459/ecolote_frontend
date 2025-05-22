import { useState, useEffect } from 'react';
import styles from './SimulationModal.module.css';
import { solarCalculator, formatCurrency } from '../../utils/calc';
import { formatPhone, formatCep } from '../../utils/formatters';
import { fetchCepData } from '../../utils/cepService';
import apiClient from '../../services/apiClient';
import VerificationCodeModal from '../ContactModal/VerificationCodeModal';
import SimulationForm from './SimulationForm';
import SimulationResults from './SimulationResults';

// Componente para o modal de pretensão de pagamento
const PaymentIntentionModal = ({ isOpen, onClose, onSelect }) => {
  if (!isOpen) return null;

  const options = [
    { value: "avista", label: "À vista", order: 1 },
    { value: "financiado", label: "Financiado", order: 2 },
    { value: "cartao", label: "Cartão", order: 3 }
  ];

  return (
    <div className={styles.intentionModalOverlay}>
      <div className={styles.intentionModalContainer}>
        <button 
          className={styles.modalCloseButton} 
          onClick={onClose}
          aria-label="Fechar modal"
        >×</button>
        <h3 className={styles.intentionModalTitle}>Pretensão de Pagamento</h3>
        <p className={styles.intentionModalSubtitle}>
          Como você pretende realizar o pagamento?
        </p>
        <div className={styles.intentionOptions}>
          {options.map(option => (
            <button 
              key={option.value}
              className={styles.intentionOption}
              onClick={() => onSelect(option.value)}
              style={{"--animation-order": option.order}}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

const SimulationModal = ({ initialValue, onClose }) => {
  // Estados do formulário
  const [step, setStep] = useState('form'); // 'form' ou 'results'
  const [billValue, setBillValue] = useState(initialValue || 200);
  const [formattedBillValue, setFormattedBillValue] = useState('');
  const [profileType, setProfileType] = useState('pessoal');
  const [cep, setCep] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState({
    logradouro: '',
    bairro: '',
    cidade: '',
    estado: ''
  });
  const [loadingCep, setLoadingCep] = useState(false);
  const [cepError, setCepError] = useState('');
  const [paymentIntention, setPaymentIntention] = useState('');
  
  // Estados para modais
  const [isPaymentIntentionModalOpen, setIsPaymentIntentionModalOpen] = useState(false);
  const [isVerificationModalOpen, setIsVerificationModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  
  // Estado para armazenar resultados da simulação
  const [results, setResults] = useState(null);

  // Formatar o valor inicial
  useEffect(() => {
    setFormattedBillValue(formatCurrency(billValue.toString(), 'input'));
  }, [billValue]);

  // Função para buscar dados do CEP
  const handleCepChange = async (e) => {
    const formattedCep = formatCep(e.target.value);
    setCep(formattedCep);
    
    // Buscar dados do CEP quando tiver 8 dígitos
    if (formattedCep.replace(/\D/g, '').length === 8) {
      setLoadingCep(true);
      setCepError('');
      
      try {
        const data = await fetchCepData(formattedCep);
        setAddress({
          logradouro: data.logradouro || '',
          bairro: data.bairro || '',
          cidade: data.localidade || '',
          estado: data.uf || ''
        });
      } catch (error) {
        setCepError(error.message || 'Erro ao buscar CEP');
      } finally {
        setLoadingCep(false);
      }
    }
  };

  // Função para lidar com o envio do formulário
  const handleSubmit = (billValueFromForm) => {
    // Calcula resultados com base no valor da conta
    const specifications = solarCalculator({ monthlyBill: billValueFromForm });
    setResults(specifications);
    
    // Muda para a etapa de resultados
    setStep('results');
  };

  // Função para iniciar o pré-cadastro
  const handlePreRegister = () => {
    setIsPaymentIntentionModalOpen(true);
  };

  // Função para processar a seleção de pretensão de pagamento
  const handlePaymentIntentionSelect = async (intention) => {
    setPaymentIntention(intention);
    setIsPaymentIntentionModalOpen(false);
    
    // Iniciar processo de verificação de email
    setIsSubmitting(true);
    setSubmitError('');
    
    try {
      // Enviar solicitação de código de verificação
      await apiClient.post('/verificacao/enviar-codigo', { email });
      
      
      // Abrir modal de verificação
      setIsVerificationModalOpen(true);
    } catch (error) {
      console.error("Erro ao iniciar verificação:", error);
      setSubmitError(error.response?.data?.message || "Não foi possível iniciar a verificação. Tente novamente mais tarde.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Função para verificar o código
  const handleVerifyCode = async (code) => {
    try {
      // Verifica o código
      await apiClient.post('/verificacao/validar-codigo', {
        email: email,
        codigo: code
      });
      
      // Se o código for válido, prepara os dados para envio
      let endpoint = '';
      let payload = {};
      
      // Prepara os dados de acordo com o tipo de perfil
      if (profileType === 'pessoal') {
        endpoint = '/pessoas-fisicas';
        payload = {
          nome_completo: name,
          telefone: phone,
          email: email,
          modelo_imovel: 'Casa', // Valor padrão, pode ser ajustado
          media_conta_energia: billValue.toString(),
          cep: cep,
          rua: address.logradouro,
          numero: '', // Precisa ser preenchido pelo usuário em etapa posterior
          bairro: address.bairro,
          cidade: address.cidade,
          estado: address.estado,
          pretensao_pagamento: paymentIntention
        };
      } else if (profileType === 'empresa') {
        endpoint = '/pessoas-juridicas';
        payload = {
          razao_social: name,
          telefone_comercial: phone,
          email_comercial: email,
          tipo_imovel_comercial: 'Comercial', // Valor padrão
          media_conta_energia_pj: billValue,
          cep_pj: cep,
          rua_pj: address.logradouro,
          bairro_pj: address.bairro,
          cidade_pj: address.cidade,
          estado_pj: address.estado,
          pretensao_pagamento_pj: paymentIntention
        };
      } else if (profileType === 'investidor') {
        endpoint = '/investidores';
        payload = {
          nome: name,
          email: email,
          telefone: phone,
          cidade: address.cidade,
          estado: address.estado,
          valor_investimento: billValue.toString(),
          tipo_investidor: 'Pessoa Física' // Valor padrão
        };
      }
      
      // Envia os dados para o backend
      const response = await apiClient.post(endpoint, payload);
      
      // Fecha o modal de verificação
      setIsVerificationModalOpen(false);
      
      // Fecha o modal principal
      onClose();
      
      // Exibe mensagem de sucesso (pode ser implementado de outra forma)
      alert('Pré-cadastro realizado com sucesso!');
      
    } catch (error) {
      console.error("Erro na verificação:", error);
      throw new Error(
        error.response?.data?.message || "Código inválido. Por favor, tente novamente."
      );
    }
  };

  // Função para reenviar o código
  const handleResendCode = async () => {
    try {
      await apiClient.post('/verificacao/enviar-codigo', { email });
      console.log(email);
    } catch (error) {
      console.error("Erro ao reenviar código:", error);
    }
  };

  // Renderiza o modal de verificação de código
  const renderVerificationModal = () => (
    <VerificationCodeModal
      isOpen={isVerificationModalOpen}
      onClose={() => setIsVerificationModalOpen(false)}
      onVerify={handleVerifyCode}
      onResend={handleResendCode}
      email={email}
    />
  );

  // Renderiza o modal de pretensão de pagamento
  const renderPaymentIntentionModal = () => (
    <PaymentIntentionModal
      isOpen={isPaymentIntentionModalOpen}
      onClose={() => setIsPaymentIntentionModalOpen(false)}
      onSelect={handlePaymentIntentionSelect}
    />
  );

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContainer}>
        {step === 'form' ? (
          <SimulationForm 
            initialValue={billValue}
            profileType={profileType}
            cep={cep}
            name={name}
            email={email}
            phone={phone}
            address={address}
            loadingCep={loadingCep}
            cepError={cepError}
            onSubmit={handleSubmit}
            onClose={onClose}
            onProfileTypeChange={(type) => setProfileType(type)}
            onCepChange={handleCepChange}
            onNameChange={(e) => setName(e.target.value)}
            onEmailChange={(e) => setEmail(e.target.value)}
            onPhoneChange={(e) => setPhone(formatPhone(e.target.value))}
          />
        ) : (
          <SimulationResults 
            results={results}
            onPreRegister={handlePreRegister}
            onClose={onClose}
          />
        )}
        {renderVerificationModal()}
        {renderPaymentIntentionModal()}
      </div>
    </div>
  );
};

export default SimulationModal;