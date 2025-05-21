import React, { useState, useEffect, useCallback } from "react";
import styles from "./ContactModal.module.css";
import { fetchCepData } from "../../utils/cepService";
import apiClient from "../../services/apiClient";

// Importando os hooks de formulário
import { usePessoaFisicaForm } from "../../hooks/usePessoaFisicaForm";
import { usePessoaJuridicaForm } from "../../hooks/usePessoaJuridicaForm";
import { useInvestidorForm } from "../../hooks/useInvestidorForm";

// Importando os componentes de formulário
import PessoaFisicaForm from "./PessoaFisicaForm";
import PessoaJuridicaForm from "./PessoaJuridicaForm";
import InvestidorForm from "./InvestidorForm";
import VerificationCodeModal from "./VerificationCodeModal";

const ContactModal = ({ isOpen, onClose }) => {
  const [modalStep, setModalStep] = useState(1); // 1 for type selection, 2 for form
  const [selectedType, setSelectedType] = useState("");
  const [loadingCep, setLoadingCep] = useState(false);
  const [cepError, setCepError] = useState("");

  // Estados para o envio do formulário
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccessMessage, setSubmitSuccessMessage] = useState("");
  const [submitErrorMessage, setSubmitErrorMessage] = useState("");
  
  // Estados para verificação de código
  const [isVerificationModalOpen, setIsVerificationModalOpen] = useState(false);
  const [tempFormData, setTempFormData] = useState(null);
  const [verificationEmail, setVerificationEmail] = useState('');

  const pfForm = usePessoaFisicaForm();
  const pjForm = usePessoaJuridicaForm();
  const invForm = useInvestidorForm();

  const resetAllFormsAndMessages = useCallback(() => {
    pfForm.resetPessoaFisicaForm();
    pjForm.resetPessoaJuridicaForm();
    invForm.resetInvestidorForm();
    setCepError("");
    setSubmitSuccessMessage("");
    setSubmitErrorMessage("");
    setIsSubmitting(false);
    setTempFormData(null);
    setVerificationEmail('');
  }, [pfForm, pjForm, invForm]);

  const handleTypeSelect = (type) => {
    setSelectedType(type);
    setModalStep(2);
    resetAllFormsAndMessages(); // Reseta tudo ao selecionar novo tipo
  };

  const handleBack = () => {
    setModalStep(1);
    setSubmitSuccessMessage("");
    setSubmitErrorMessage("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    setSubmitSuccessMessage("");
    setSubmitErrorMessage("");

    let endpoint = "";
    let payload = {};
    let email = "";

    if (selectedType === "pessoa física") {
      endpoint = "/pessoas-fisicas";
      payload = pfForm.getValues();
      email = payload.email;
    } else if (selectedType === "pessoa jurídica") {
      endpoint = "/pessoas-juridicas";
      payload = pjForm.getValues();
      email = payload.email_comercial;
    } else if (selectedType === "investidor") {
      endpoint = "/investidores";
      payload = invForm.getValues();
      email = payload.email;
    }

    if (endpoint) {
      try {
        // Armazena os dados temporariamente e solicita o código de verificação
        setTempFormData({ endpoint, payload });
        setVerificationEmail(email);
        
        console.log("Enviando solicitação de código para:", email);
        
        // Chama a API para enviar o código de verificação
        await apiClient.post('/verificacao/enviar-codigo', { email });
        
        // Abre o modal de verificação
        setIsVerificationModalOpen(true);
        
      } catch (error) {
        console.error("Erro ao iniciar verificação:", error);
        if (error.response && error.response.data && error.response.data.message) {
          setSubmitErrorMessage(error.response.data.message);
        } else {
          setSubmitErrorMessage("Não foi possível iniciar a verificação. Tente novamente mais tarde.");
        }
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  // Função para verificar o código
  const handleVerifyCode = async (code) => {
    if (!tempFormData) {
      throw new Error("Dados do formulário não encontrados");
    }

    try {
      console.log("Verificando código:", code, "para email:", verificationEmail);
      
      // Verifica o código
      await apiClient.post('/verificacao/validar-codigo', {
        email: verificationEmail,
        codigo: code
      });

      console.log("Código validado com sucesso, enviando dados do formulário");
      
      // Se o código for válido, envia os dados do formulário
      const response = await apiClient.post(tempFormData.endpoint, tempFormData.payload);
      
      // Fecha o modal de verificação
      setIsVerificationModalOpen(false);
      
      // Exibe mensagem de sucesso
      setSubmitSuccessMessage(response.data.message || "Dados enviados com sucesso!");
      
      // Limpa os formulários
      resetAllFormsAndMessages();
      
      // Fecha o modal principal após um tempo
      setTimeout(() => {
        setModalStep(1);
        onClose();
        setSelectedType("");
      }, 3000);
      
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
      console.log("Reenviando código para:", verificationEmail);
      await apiClient.post('/verificacao/enviar-codigo', { email: verificationEmail });
    } catch (error) {
      console.error("Erro ao reenviar código:", error);
    }
  };

  // Efeito para buscar CEP 
  const currentPfCep = pfForm.pfCep;
  const currentPjCep = pjForm.pjCep;
  const { setPfRua, setPfBairro, setPfCidade, setPfEstado } = pfForm;
  const { setPjRua, setPjBairro, setPjCidade, setPjEstado } = pjForm;

  useEffect(() => {
    let cepToSearch = "";
    let formTypeForCep = "";

    if (selectedType === "pessoa física") {
      cepToSearch = currentPfCep;
      formTypeForCep = "pessoa física";
    } else if (selectedType === "pessoa jurídica") {
      cepToSearch = currentPjCep;
      formTypeForCep = "pessoa jurídica";
    }

    if (cepToSearch && cepToSearch.replace(/[^0-9]/g, "").length === 8) {
      const numericCep = cepToSearch.replace(/[^0-9]/g, "");
      setLoadingCep(true);
      setCepError("");
      fetchCepData(numericCep)
        .then(data => {
          setLoadingCep(false);
          if (data.erro) {
            setCepError("CEP não encontrado.");
            return;
          }
          if (formTypeForCep === "pessoa física") {
            setPfRua(data.logradouro || "");
            setPfBairro(data.bairro || "");
            setPfCidade(data.localidade || "");
            setPfEstado(data.uf || "");
          } else if (formTypeForCep === "pessoa jurídica") {
            setPjRua(data.logradouro || "");
            setPjBairro(data.bairro || "");
            setPjCidade(data.localidade || "");
            setPjEstado(data.uf || "");
          }
        })
        .catch(err => {
          setLoadingCep(false);
          setCepError(err.message || "Erro ao buscar CEP. Tente novamente.");
          if (formTypeForCep === "pessoa física") {
            setPfRua(""); setPfBairro(""); setPfCidade(""); setPfEstado("");
          } else if (formTypeForCep === "pessoa jurídica") {
            setPjRua(""); setPjBairro(""); setPjCidade(""); setPjEstado("");
          }
        });
    }
  }, [currentPfCep, currentPjCep, selectedType, 
      setPfRua, setPfBairro, setPfCidade, setPfEstado, 
      setPjRua, setPjBairro, setPjCidade, setPjEstado]);

  if (!isOpen) {
    return null;
  }

  const renderForm = () => {
    if (selectedType === "pessoa física") {
      return <PessoaFisicaForm formData={pfForm} loadingCep={loadingCep} cepError={cepError} />;
    }
    if (selectedType === "pessoa jurídica") {
      return <PessoaJuridicaForm formData={pjForm} loadingCep={loadingCep} cepError={cepError} />;
    }
    if (selectedType === "investidor") {
      return <InvestidorForm formData={invForm} />;
    }
    return null;
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <button className={styles.closeButton} onClick={() => { resetAllFormsAndMessages(); setModalStep(1); onClose(); }}>
          &times;
        </button>

        {modalStep === 1 && (
          <div className={styles.typeSelectionContainer}>
            <h2>Como Deseja Participar do Ecolote?</h2>
            <button onClick={() => handleTypeSelect("pessoa física")} className={styles.typeButton}>
              Pessoa Física
            </button>
            <button onClick={() => handleTypeSelect("pessoa jurídica")} className={styles.typeButton}>
              Pessoa Jurídica
            </button>
            <button onClick={() => handleTypeSelect("investidor")} className={styles.typeButton}>
              Investidor
            </button>
          </div>
        )}

        {modalStep === 2 && (
          <form onSubmit={handleSubmit} className={styles.contactForm}>
            <button type="button" onClick={handleBack} className={styles.backButton} disabled={isSubmitting}>&larr; Voltar</button>
            <h2>Contato - {selectedType.charAt(0).toUpperCase() + selectedType.slice(1)}</h2>
            {renderForm()}
            {submitSuccessMessage && <p className={styles.successMessage}>{submitSuccessMessage}</p>}
            {submitErrorMessage && <p className={styles.errorMessage}>{submitErrorMessage}</p>}
            <button type="submit" className={styles.submitButton} disabled={isSubmitting}>
              {isSubmitting ? "Enviando..." : "Enviar Mensagem"}
            </button>
          </form>
        )}
      </div>
      
      {/* Modal de verificação */}
      <VerificationCodeModal
        isOpen={isVerificationModalOpen}
        onClose={() => setIsVerificationModalOpen(false)}
        onVerify={handleVerifyCode}
        onResendCode={handleResendCode}
        email={verificationEmail}
      />
    </div>
  );
};

export default ContactModal;