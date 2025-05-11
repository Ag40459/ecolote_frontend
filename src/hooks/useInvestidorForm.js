import { useState } from 'react';

export const useInvestidorForm = () => {
  const [invNome, setInvNome] = useState('');
  const [invEmail, setInvEmail] = useState('');
  const [invTelefone, setInvTelefone] = useState('');
  const [invCidade, setInvCidade] = useState('');
  const [invEstado, setInvEstado] = useState('');
  const [invValorInvestimento, setInvValorInvestimento] = useState('');

  const resetInvestidorForm = () => {
    setInvNome('');
    setInvEmail('');
    setInvTelefone('');
    setInvCidade('');
    setInvEstado('');
    setInvValorInvestimento('');
  };

  const getValues = () => ({
    invNome,
    invEmail,
    invTelefone,
    invCidade,
    invEstado,
    invValorInvestimento,
  });

  return {
    invNome, setInvNome,
    invEmail, setInvEmail,
    invTelefone, setInvTelefone,
    invCidade, setInvCidade,
    invEstado, setInvEstado,
    invValorInvestimento, setInvValorInvestimento,
    resetInvestidorForm,
    getValues,
  };
};

