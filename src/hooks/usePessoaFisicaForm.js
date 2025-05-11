import { useState } from 'react';

export const usePessoaFisicaForm = () => {
  const [pfName, setPfName] = useState('');
  const [pfTelefone, setPfTelefone] = useState('');
  const [pfModeloImovel, setPfModeloImovel] = useState('');
  const [pfOutroModeloImovel, setPfOutroModeloImovel] = useState('');
  const [pfMediaContaEnergia, setPfMediaContaEnergia] = useState('');
  const [pfCep, setPfCep] = useState('');
  const [pfRua, setPfRua] = useState('');
  const [pfNumero, setPfNumero] = useState('');
  const [pfComplemento, setPfComplemento] = useState('');
  const [pfBairro, setPfBairro] = useState('');
  const [pfCidade, setPfCidade] = useState('');
  const [pfEstado, setPfEstado] = useState('');
  const [pfPretensaoPagamento, setPfPretensaoPagamento] = useState('');

  const resetPessoaFisicaForm = () => {
    setPfName('');
    setPfTelefone('');
    setPfModeloImovel('');
    setPfOutroModeloImovel('');
    setPfMediaContaEnergia('');
    setPfCep('');
    setPfRua('');
    setPfNumero('');
    setPfComplemento('');
    setPfBairro('');
    setPfCidade('');
    setPfEstado('');
    setPfPretensaoPagamento('');
  };

  const getValues = () => ({
    pfName,
    pfTelefone,
    pfModeloImovel,
    ...(pfModeloImovel === 'outro' && { pfOutroModeloImovel }),
    pfMediaContaEnergia,
    pfCep,
    pfRua,
    pfNumero,
    pfComplemento,
    pfBairro,
    pfCidade,
    pfEstado,
    pfPretensaoPagamento,
  });

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

