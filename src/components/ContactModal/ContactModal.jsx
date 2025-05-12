import React, { useState, useEffect } from "react";
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

  const resetAllFormsAndMessages = () => {
    pfForm.resetPessoaFisicaForm();
    pjForm.resetPessoaJuridicaForm();
    invForm.resetInvestidorForm();
    setCepError("");
    setSubmitSuccessMessage("");
    setSubmitErrorMessage("");
    setIsSubmitting(false);
  };

  const handleTypeSelect = (type) => {
    setSelectedType(type);
    setModalStep(2);
    resetAllFormsAndMessages(); // Reseta tudo ao selecionar novo tipo
  };

  const handleBack = () => {
    setModalStep(1);
    // Mantém os dados do formulário caso o usuário queira apenas corrigir o tipo
    // Mas limpa mensagens de submissão
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
      const pfValues = pfForm.getValues();
      payload = {
        nome_completo: pfValues.pfName,
        telefone: pfValues.pfTelefone,
        modelo_imovel: pfValues.pfModeloImovel,
        outro_modelo_imovel: pfValues.pfModeloImovel === "Outro" ? pfValues.pfOutroModeloImovel : null,
        media_conta_energia: pfValues.pfMediaContaEnergia,
        cep: pfValues.pfCep,
        rua: pfValues.pfRua,
        numero: pfValues.pfNumero,
        complemento: pfValues.pfComplemento,
        bairro: pfValues.pfBairro,
        cidade: pfValues.pfCidade,
        estado: pfValues.pfEstado,
        pretensao_pagamento: pfValues.pfPretensaoPagamento,
      };
    } else if (selectedType === "pessoa jurídica") {
      endpoint = "/pessoas-juridicas";
      const pjValues = pjForm.getValues();
      payload = {
        nome_empresa: pjValues.pjNomeEmpresa,
        cnpj: pjValues.pjCnpj,
        telefone: pjValues.pjTelefone,
        modelo_imovel: pjValues.pjModeloImovel,
        outro_modelo_imovel: pjValues.pjModeloImovel === "Outro" ? pjValues.pjOutroModeloImovel : null,
        media_conta_energia: pjValues.pjMediaContaEnergia,
        cep: pjValues.pjCep,
        rua: pjValues.pjRua,
        numero: pjValues.pjNumero,
        complemento: pjValues.pjComplemento,
        bairro: pjValues.pjBairro,
        cidade: pjValues.pjCidade,
        estado: pjValues.pjEstado,
        pretensao_pagamento: pjValues.pjPretensaoPagamento,
      };
    } else if (selectedType === "investidor") {
      endpoint = "/investidores";
      const invValues = invForm.getValues();
      payload = {
        nome: invValues.invNome,
        email: invValues.invEmail,
        telefone: invValues.invTelefone,
        cidade: invValues.invCidade,
        estado: invValues.invEstado,
        valor_investimento: invValues.invValorInvestimento,
      };
    }

    if (endpoint) {
      try {
        const response = await apiClient.post(endpoint, payload);
        setSubmitSuccessMessage(response.data.message || "Dados enviados com sucesso!");
        resetAllFormsAndMessages(); // Limpa formulários e mensagens
        // Opcional: voltar para o passo 1 ou fechar o modal após um tempo
        setTimeout(() => {
            setModalStep(1);
            setSelectedType("");
            // onClose(); // Descomente se quiser fechar automaticamente
        }, 3000); // Fecha ou volta após 3 segundos

      } catch (error) {
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

  // Efeito para buscar CEP (mantido como antes)
  useEffect(() => {
    let currentCep = "";
    if (selectedType === "pessoa física") {
      currentCep = pfForm.pfCep;
    } else if (selectedType === "pessoa jurídica") {
      currentCep = pjForm.pjCep;
    }

    if (currentCep && currentCep.replace(/[^0-9]/g, "").length === 8) {
      const numericCep = currentCep.replace(/[^0-9]/g, "");
      setLoadingCep(true);
      setCepError("");
      fetchCepData(numericCep)
        .then(data => {
          setLoadingCep(false);
          if (data.erro) {
            setCepError("CEP não encontrado.");
            return;
          }
          if (selectedType === "pessoa física") {
            pfForm.setPfRua(data.logradouro || "");
            pfForm.setPfBairro(data.bairro || "");
            pfForm.setPfCidade(data.localidade || "");
            pfForm.setPfEstado(data.uf || "");
          } else if (selectedType === "pessoa jurídica") {
            pjForm.setPjRua(data.logradouro || "");
            pjForm.setPjBairro(data.bairro || "");
            pjForm.setPjCidade(data.localidade || "");
            pjForm.setPjEstado(data.uf || "");
          }
        })
        .catch(err => {
          setLoadingCep(false);
          setCepError(err.message || "Erro ao buscar CEP. Tente novamente.");
          if (selectedType === "pessoa física") {
            pfForm.setPfRua(""); pfForm.setPfBairro(""); pfForm.setPfCidade(""); pfForm.setPfEstado("");
          } else if (selectedType === "pessoa jurídica") {
            pjForm.setPjRua(""); pjForm.setPjBairro(""); pjForm.setPjCidade(""); pjForm.setPjEstado("");
          }
        });
    }
  }, [pfForm.pfCep, pjForm.pjCep, selectedType, pfForm, pjForm]);

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
        <button className={styles.closeButton} onClick={() => { setModalStep(1); resetAllFormsAndMessages(); onClose(); }}>
          &times;
        </button>

        {modalStep === 1 && (
          <div className={styles.typeSelectionContainer}>
            <h2>Como podemos te ajudar?</h2>
            {submitSuccessMessage && <p className={styles.successMessage}>{submitSuccessMessage}</p>} 
            {submitErrorMessage && <p className={styles.errorMessage}>{submitErrorMessage}</p>} 
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

