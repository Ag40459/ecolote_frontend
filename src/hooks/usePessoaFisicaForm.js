import { useState, useCallback } from "react";

// v2: Alinhado com o pessoaFisicaController.js e ContactModal_corrigido.jsx
export const usePessoaFisicaForm = () => {
  const [pfName, setPfName] = useState("");
  const [pfTelefone, setPfTelefone] = useState("");
  const [pfModeloImovel, setPfModeloImovel] = useState(""); // Ex: "Casa", "Apartamento", "Outro"
  const [pfOutroModeloImovel, setPfOutroModeloImovel] = useState("");
  const [pfMediaContaEnergia, setPfMediaContaEnergia] = useState("");
  const [pfCep, setPfCep] = useState("");
  const [pfRua, setPfRua] = useState("");
  const [pfNumero, setPfNumero] = useState("");
  const [pfComplemento, setPfComplemento] = useState("");
  const [pfBairro, setPfBairro] = useState("");
  const [pfCidade, setPfCidade] = useState("");
  const [pfEstado, setPfEstado] = useState("");
  const [pfPretensaoPagamento, setPfPretensaoPagamento] = useState("");

  const resetPessoaFisicaForm = useCallback(() => {
    setPfName("");
    setPfTelefone("");
    setPfModeloImovel("");
    setPfOutroModeloImovel("");
    setPfMediaContaEnergia("");
    setPfCep("");
    setPfRua("");
    setPfNumero("");
    setPfComplemento("");
    setPfBairro("");
    setPfCidade("");
    setPfEstado("");
    setPfPretensaoPagamento("");
  }, []);

  const getValues = useCallback(() => {
    // Mapeia os nomes dos estados do hook para os nomes esperados pelo backend (pessoaFisicaController.js)
    const payload = {
      nome_completo: pfName,
      telefone: pfTelefone,
      modelo_imovel: pfModeloImovel === 'Outro' ? 'outro' : pfModeloImovel, // Ajusta 'Outro' para 'outro' para o backend
      media_conta_energia: pfMediaContaEnergia,
      cep: pfCep,
      rua: pfRua,
      numero: pfNumero,
      complemento: pfComplemento || null,
      bairro: pfBairro,
      cidade: pfCidade,
      estado: pfEstado,
      pretensao_pagamento: pfPretensaoPagamento,
    };

    // Adiciona outro_modelo_imovel apenas se modelo_imovel for 'outro' (após o ajuste de case)
    if (payload.modelo_imovel && payload.modelo_imovel.toLowerCase() === "outro") {
      payload.outro_modelo_imovel = pfOutroModeloImovel;
    } else {
      payload.outro_modelo_imovel = null; // Garante que seja null se não for 'outro'
    }

    return payload;
  }, [
    pfName,
    pfTelefone,
    pfModeloImovel,
    pfOutroModeloImovel,
    pfMediaContaEnergia,
    pfCep,
    pfRua,
    pfNumero,
    pfComplemento,
    pfBairro,
    pfCidade,
    pfEstado,
    pfPretensaoPagamento,
  ]);

  return {
    pfName, setPfName,
    pfTelefone, setPfTelefone,
    pfModeloImovel, setPfModeloImovel,
    pfOutroModeloImovel, setPfOutroModeloImovel,
    pfMediaContaEnergia, setPfMediaContaEnergia,
    pfCep, setPfCep,
    pfRua, setPfRua,
    pfNumero, setPfNumero,
    pfComplemento, setPfComplemento,
    pfBairro, setPfBairro,
    pfCidade, setPfCidade,
    pfEstado, setPfEstado,
    pfPretensaoPagamento, setPfPretensaoPagamento,
    resetPessoaFisicaForm,
    getValues,
  };
};