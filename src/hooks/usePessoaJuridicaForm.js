import { useState } from 'react';

export const usePessoaJuridicaForm = () => {
  const [pjNomeEmpresa, setPjNomeEmpresa] = useState('');
  const [pjCnpj, setPjCnpj] = useState('');
  const [pjTelefone, setPjTelefone] = useState('');
  const [pjModeloImovel, setPjModeloImovel] = useState('');
  const [pjOutroModeloImovel, setPjOutroModeloImovel] = useState('');
  const [pjMediaContaEnergia, setPjMediaContaEnergia] = useState('');
  const [pjCep, setPjCep] = useState('');
  const [pjRua, setPjRua] = useState('');
  const [pjNumero, setPjNumero] = useState('');
  const [pjComplemento, setPjComplemento] = useState('');
  const [pjBairro, setPjBairro] = useState('');
  const [pjCidade, setPjCidade] = useState('');
  const [pjEstado, setPjEstado] = useState('');
  const [pjPretensaoPagamento, setPjPretensaoPagamento] = useState('');

  const resetPessoaJuridicaForm = () => {
    setPjNomeEmpresa('');
    setPjCnpj('');
    setPjTelefone('');
    setPjModeloImovel('');
    setPjOutroModeloImovel('');
    setPjMediaContaEnergia('');
    setPjCep('');
    setPjRua('');
    setPjNumero('');
    setPjComplemento('');
    setPjBairro('');
    setPjCidade('');
    setPjEstado('');
    setPjPretensaoPagamento('');
  };

  const getValues = () => ({
    pjNomeEmpresa,
    pjCnpj,
    pjTelefone,
    pjModeloImovel,
    ...(pjModeloImovel === 'Outro' && { pjOutroModeloImovel }),
    pjMediaContaEnergia,
    pjCep,
    pjRua,
    pjNumero,
    pjComplemento,
    pjBairro,
    pjCidade,
    pjEstado,
    pjPretensaoPagamento,
  });

  return {
    pjNomeEmpresa, setPjNomeEmpresa,
    pjCnpj, setPjCnpj,
    pjTelefone, setPjTelefone,
    pjModeloImovel, setPjModeloImovel,
    pjOutroModeloImovel, setPjOutroModeloImovel,
    pjMediaContaEnergia, setPjMediaContaEnergia,
    pjCep, setPjCep,
    pjRua, setPjRua,
    pjNumero, setPjNumero,
    pjComplemento, setPjComplemento,
    pjBairro, setPjBairro,
    pjCidade, setPjCidade,
    pjEstado, setPjEstado,
    pjPretensaoPagamento, setPjPretensaoPagamento,
    resetPessoaJuridicaForm,
    getValues,
  };
};

