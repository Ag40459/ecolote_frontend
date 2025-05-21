import React, { useState, useEffect } from 'react';
import styles from './SimulationModal.module.css';
import { solarCalculator, formatCurrency } from '../../utils/calc';
import { formatPhone, formatCep } from '../../utils/formatters';
import { fetchCepData } from '../../utils/cepService';
import apiClient from '../../services/apiClient';
import VerificationCodeModal from '../ContactModal/VerificationCodeModal';
import CNPJModal from './CNPJModal';

// Componente de animação para o canto superior esquerdo
const EnergyPulseAnimation = () => (
  <div className={styles.energyPulseContainer}>
    <div className={styles.energyPulseOuter}></div>
    <div className={styles.energyPulseMiddle}></div>
    <div className={styles.energyPulseInner}></div>
  </div>
);

// Componente para o modal de pretensão de pagamento
const PaymentIntentionModal = ({ isOpen, onClose, onSelect }) => {
  if (!isOpen) return null;

  const options = [
    { value: "avista", label: "À vista" },
    { value: "financiado", label: "Financiado" },
    { value: "consorcio", label: "Cartão" }
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
  const [isCNPJModalOpen, setIsCNPJModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  
  // Estado para armazenar resultados da simulação
  const [results, setResults] = useState(null);
  
  // Estado para armazenar dados do CNPJ
  const [cnpjData, setCnpjData] = useState(null);

  // Formatar o valor inicial
  useEffect(() => {
    setFormattedBillValue(formatCurrency(billValue.toString()));
  }, []);

  // Função para lidar com a mudança no valor da conta
  const handleBillValueChange = (e) => {
    const value = e.target.value.replace(/[^\d]/g, '');
    const numericValue = value ? parseInt(value) : 0;
    setBillValue(numericValue);
    setFormattedBillValue(formatCurrency(value));
  };

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
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Calcula resultados com base no valor da conta
    const specifications = solarCalculator({ monthlyBill: billValue });
    setResults(specifications);
    
    // Muda para a etapa de resultados
    setStep('results');
  };

  // Função para iniciar o pré-cadastro
  const handlePreRegister = () => {
    // Se for perfil empresarial, abrir modal de CNPJ primeiro
    if (profileType === 'empresa') {
      setIsCNPJModalOpen(true);
    } else {
      // Para outros perfis, abrir modal de pretensão de pagamento diretamente
      setIsPaymentIntentionModalOpen(true);
    }
  };

  // Função para processar os dados do CNPJ
  const handleCNPJSubmit = (data) => {
    setCnpjData(data);
    setIsCNPJModalOpen(false);
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
          numero: '0001', // Valor fixo conforme solicitado
          complemento: 'Simulador(PF)', // Valor fixo conforme solicitado
          bairro: address.bairro,
          cidade: address.cidade,
          estado: address.estado,
          pretensao_pagamento: paymentIntention
        };
      } else if (profileType === 'empresa') {
        endpoint = '/pessoas-juridicas';
        
        // Usar dados do CNPJ se disponíveis
        const razaoSocial = cnpjData ? cnpjData.razao_social : name;
        const nomeFantasia = cnpjData ? (cnpjData.nome_fantasia || razaoSocial) : name;
        const cnpjValue = cnpjData ? cnpjData.cnpj : '';
        
        // Usar nome do responsável e telefone do formulário se não disponíveis no CNPJ
        const nomeResponsavel = name;
        const telefoneResponsavel = phone;
        
        payload = {
          razao_social: razaoSocial,
          nome_fantasia: nomeFantasia,
          cnpj: cnpjValue,
          telefone_comercial: phone,
          email_comercial: email,
          nome_responsavel: nomeResponsavel,
          telefone_responsavel: telefoneResponsavel,
          tipo_imovel_comercial: 'Comercial', // Valor padrão
          media_conta_energia_pj: billValue.toString(),
          cep_pj: cep,
          rua_pj: address.logradouro || '',
          numero_pj: '0001', // Valor fixo conforme solicitado
          complemento_pj: 'Simulador(PJ)', // Valor fixo conforme solicitado
          bairro_pj: address.bairro || '',
          cidade_pj: address.cidade || '',
          estado_pj: address.estado || '',
          pretensao_pagamento_pj: paymentIntention
        };
      } else if (profileType === 'investidor') {
        endpoint = '/investidores';
        payload = {
          nome_investidor: name,
          email_investidor: email,
          telefone_investidor: phone,
          tipo_investidor: 'Pessoa Física', // Valor padrão
          area_interesse_principal: 'Energia Solar', // Valor padrão
          valor_interesse_investimento: billValue.toString(),
          cidade_investidor: address.cidade || '',
          estado_investidor: address.estado || ''
        };
      }
      
      // Log do payload para depuração
      console.log('Enviando dados para o backend:', endpoint, payload);
      
      try {
        // Envia os dados para o backend
        const response = await apiClient.post(endpoint, payload);
        console.log('Resposta do backend:', response.data);
        
        // Fecha o modal de verificação
        setIsVerificationModalOpen(false);
        
        // Fecha o modal principal
        onClose();
        
        // Exibe mensagem de sucesso
        alert('Pré-cadastro realizado com sucesso!');
      } catch (error) {
        console.error('Erro ao enviar dados:', error);
        console.error('Detalhes do erro:', error.response?.data);
        
        // Exibe mensagem de erro específica
        const errorMessage = error.response?.data?.message || 
                            error.response?.data?.error || 
                            error.message || 
                            "Erro ao processar sua solicitação. Por favor, tente novamente.";
        
        throw new Error(errorMessage);
      }
      
    } catch (error) {
      console.error("Erro na verificação:", error);
      throw new Error(
        error.response?.data?.message || error.message || "Código inválido. Por favor, tente novamente."
      );
    }
  };

  // Função para reenviar o código
  const handleResendCode = async () => {
    try {
      await apiClient.post('/verificacao/enviar-codigo', { email });
    } catch (error) {
      console.error("Erro ao reenviar código:", error);
    }
  };

  // Renderiza o formulário de simulação
  const renderForm = () => (
    <>
      <div className={styles.modalHeader}>
        <button 
          className={styles.modalCloseButton} 
          onClick={onClose}
          aria-label="Fechar modal"
        >×</button>
        <div className={styles.modalIllustration}>
          <EnergyPulseAnimation />
        </div>
      </div>
      
      <div className={styles.modalContent}>
        <h2 className={`${styles.modalTitle} sectionTitle`}>EcoSimula</h2>
        <p className={styles.modalSubtitle}>
          Preencha os campos abaixo e veja agora mesmo quanto você poderia economizar investindo em energia solar.
        </p>
        
        <form onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Média mensal de gasto com energia:</label>
            <div className={styles.currencyInputWrapper}>
              <span className={styles.currencyPrefix}>R$</span>
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
          
          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Qual o seu perfil?</label>
            <div className={styles.radioGroup}>
              <div className={styles.radioOption}>
                <input
                  type="radio"
                  id="pessoal"
                  name="profileType"
                  value="pessoal"
                  checked={profileType === 'pessoal'}
                  onChange={() => setProfileType('pessoal')}
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
                  onChange={() => setProfileType('empresa')}
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
                  onChange={() => setProfileType('investidor')}
                  className={styles.radioInput}
                />
                <label htmlFor="investidor" className={styles.radioLabel}>Investidor</label>
              </div>
            </div>
          </div>
          
          <div className={styles.formGroup}>
            <label className={styles.formLabel}>CEP</label>
            <input
              type="text"
              className={styles.formInput}
              value={cep}
              onChange={handleCepChange}
              placeholder="00000-000"
              required
              aria-label="CEP para instalação"
            />
            {loadingCep && <p className={styles.loadingMessage}>Buscando CEP...</p>}
            {cepError && <p className={styles.errorMessage}>{cepError}</p>}
          </div>
          
          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Nome e sobrenome</label>
            <input
              type="text"
              className={styles.formInput}
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              aria-label="Nome completo"
            />
          </div>
          
          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Email</label>
            <input
              type="email"
              className={styles.formInput}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              aria-label="Endereço de email"
            />
          </div>
          
          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Telefone ou WhatsApp</label>
            <input
              type="tel"
              className={styles.formInput}
              value={phone}
              onChange={(e) => setPhone(formatPhone(e.target.value))}
              placeholder="(00) 00000-0000"
              required
              aria-label="Número de telefone ou WhatsApp"
            />
          </div>
          
          <button type="submit" className={`${styles.submitButton} cta-button`}>
            Ver Resultados da Simulação
          </button>
        </form>
      </div>
    </>
  );

  // Renderiza os resultados da simulação
  const renderResults = () => (
    <>
      <div className={styles.modalHeader}>
        <button 
          className={styles.modalCloseButton} 
          onClick={onClose}
          aria-label="Fechar modal"
        >×</button>
        <div className={styles.modalIllustration}>
          <EnergyPulseAnimation />
        </div>
      </div>
      
      <div className={styles.modalContent}>
        <h2 className={`${styles.modalTitle} sectionTitle`}>Seu Projeto Solar</h2>
        <p className={styles.modalSubtitle}>
          Veja abaixo os detalhes do seu projeto e quanto você pode economizar investindo em energia solar..
        </p>
        
        <div className={styles.resultsContainer}>
          <div className={styles.comparison}>
            <div className={`${styles.comparisonItem} ${styles.comparisonItemCurrent}`}>
              <div className={styles.comparisonLabel}>Valor Atual da Conta</div>
              <div className={styles.comparisonValue}>R$ {formatCurrency(results.monthlyBill)}</div>
            </div>
            
            <div className={`${styles.comparisonItem} ${styles.comparisonItemInstallment}`}>
              <div className={styles.comparisonLabel}>Valor da Sua Parcela</div>
              <div className={styles.comparisonValue}>R$ {formatCurrency(results.monthlyInstallment)}</div>
            </div>
          </div>
          
        <div className={styles.totalValue}>
  <span className={styles.oldValue}>
    Valor do Total do Projeto: {formatCurrency(results.estimatedProjectCost + results.discount)}
  </span>
  <br />
  <span className={styles.newValue}>
    Ecolote com Desconto: {formatCurrency(results.estimatedProjectCost)}
  </span>
</div>
<div className={styles.specificationCard2}>
  <div className={styles.specificationIcon}>💰</div>
  <div className={styles.specificationLabel}>Desconto Pré-Cadastro</div>
  <div className={styles.specificationValue}>{formatCurrency(results.discount)}</div>
</div>

          <div className={styles.specificationsGrid}>

              <div className={styles.specificationCard}>
              <div className={styles.specificationIcon}>📅</div>
              <div className={styles.specificationLabel}>Condição Especial:</div>
              <div className={styles.specificationValue}>  {results.installmentCount} {'Meses'}</div>
            </div>
            
            <div className={styles.specificationCard}>
              <div className={styles.specificationIcon}>⚡</div>
              <div className={styles.specificationLabel}>Geração Média:</div>
              <div className={styles.specificationValue}>{results.consumptionKwh} KWh/mês</div>
            </div>
            
            <div className={styles.specificationCard}>
              <div className={styles.specificationIcon}>🔌</div>
              <div className={styles.specificationLabel}>Potência Final:</div>
              <div className={styles.specificationValue}>{results.finalPowerKwp} KWp</div>
            </div>
            
            <div className={styles.specificationCard}>
              <div className={styles.specificationIcon}>🔋</div>
              <div className={styles.specificationLabel}>Módulo:</div>
              <div className={styles.specificationValue}>{results.modules} ({results.moduleName})</div>
            </div>
            
            <div className={styles.specificationCard}>
              <div className={styles.specificationIcon}>🔄</div>
              <div className={styles.specificationLabel}>Inversor:</div>
              <div className={styles.specificationValue}>{results.inverterQuantity} ({results.inverterBrand})</div>
            </div>
            
                      
            <div className={styles.specificationCard}>
              <div className={styles.specificationIcon}>📅</div>
              <div className={styles.specificationLabel}>Condição Especial:</div>
              <div className={styles.specificationValue}>  {results.installmentCount} {'Meses'}</div>
            </div>

            
          </div>
          
          <p className={styles.installmentNote}>
            * O valor da parcela pode variar de acordo com seu relacionamento com o banco.
          </p>
          
          <button onClick={handlePreRegister} className={styles.preCadastroButton}>
            Fazer Pré-cadastro
          </button>
          
          {submitError && <p className={styles.errorMessage}>{submitError}</p>}
        </div>
      </div>
    </>
  );

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContainer}>
        {step === 'form' ? renderForm() : renderResults()}
        
        {/* Modal de CNPJ */}
        <CNPJModal 
          isOpen={isCNPJModalOpen}
          onClose={() => setIsCNPJModalOpen(false)}
          onSubmit={handleCNPJSubmit}
        />
        
        {/* Modal de pretensão de pagamento */}
        <PaymentIntentionModal 
          isOpen={isPaymentIntentionModalOpen}
          onClose={() => setIsPaymentIntentionModalOpen(false)}
          onSelect={handlePaymentIntentionSelect}
        />
        
        {/* Modal de verificação de código */}
        <VerificationCodeModal
          isOpen={isVerificationModalOpen}
          onClose={() => setIsVerificationModalOpen(false)}
          onVerify={handleVerifyCode}
          onResendCode={handleResendCode}
          email={email}
        />
      </div>
    </div>
  );
};

export default SimulationModal;
