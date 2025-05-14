import React, { useState, useEffect, useCallback } from "react";
import styles from "./ContactModal.module.css";
import { fetchCepData } from "../../utils/cepService";
import apiClient from "../../services/apiClient"; // Importando o apiClient

// Importando os hooks de formulário
import { usePessoaFisicaForm } from "../../hooks/usePessoaFisicaForm";
import { usePessoaJuridicaForm } from "../../hooks/usePessoaJuridicaForm";
import { useInvestidorForm } from "../../hooks/useInvestidorForm";

// Importando os componentes de formulário
import PessoaFisicaForm from "./PessoaFisicaForm";
import PessoaJuridicaForm from "./PessoaJuridicaForm";
import InvestidorForm from "./InvestidorForm";

const ContactModal = ({ isOpen, onClose }) => {
  const [modalStep, setModalStep] = useState(1); // 1 for type selection, 2 for form
  const [selectedType, setSelectedType] = useState("");
  const [loadingCep, setLoadingCep] = useState(false);
  const [cepError, setCepError] = useState("");

  // Estados para o envio do formulário
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccessMessage, setSubmitSuccessMessage] = useState("");
  const [submitErrorMessage, setSubmitErrorMessage] = useState("");

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

    if (selectedType === "pessoa física") {
      endpoint = "/pessoas-fisicas";
      payload = pfForm.getValues(); // CORRIGIDO: Usa diretamente o retorno do hook
    } else if (selectedType === "pessoa jurídica") {
      endpoint = "/pessoas-juridicas";
      payload = pjForm.getValues(); // CORRIGIDO: Usa diretamente o retorno do hook
    } else if (selectedType === "investidor") {
      endpoint = "/investidores";
      payload = invForm.getValues(); // CORRIGIDO: Usa diretamente o retorno do hook
    }

    if (endpoint) {
      try {
        const response = await apiClient.post(endpoint, payload);
        setSubmitSuccessMessage(response.data.message || "Dados enviados com sucesso!");
        resetAllFormsAndMessages(); 
        setTimeout(() => {
            setModalStep(1);
             onClose();
            setSelectedType("");
        }, 3000); 

      } catch (error) {
         console.error("Erro na submissão:", error);
  console.log("Detalhes do erro:", error.response?.data);
        console.error("Erro na submissão:", error);
        if (error.response && error.response.data && error.response.data.message) {
          setSubmitErrorMessage(error.response.data.message);
        } else {
          setSubmitErrorMessage("Não foi possível enviar seus dados. Tente novamente mais tarde.");
        }
      } finally {
        setIsSubmitting(false);
      }
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
      setPjRua, setPjBairro, setPjCidade, setPjEstado]); // CORRIGIDO: Dependências mais estáveis

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
      // Para Investidor, se o backend realmente não precisar de tipo_investidor,
      // o hook useInvestidorForm_v2_corrigido.js e InvestidorForm_v2_corrigido.jsx já estão corretos.
      // A mensagem de erro sobre tipo_investidor obrigatório não viria do backend se ele não o valida.
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
            {/* Mensagens de sucesso/erro globais podem ser mostradas aqui se desejar, mesmo após voltar ao passo 1 */}
            {/* {submitSuccessMessage && <p className={styles.successMessage}>{submitSuccessMessage}</p>} 
            {submitErrorMessage && <p className={styles.errorMessage}>{submitErrorMessage}</p>} */}
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
    </div>
  );
};

export default ContactModal;