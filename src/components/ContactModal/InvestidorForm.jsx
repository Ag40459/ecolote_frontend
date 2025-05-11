import React from 'react';
import styles from './ContactModal.module.css'; // Reutilizando os estilos
import { valorInvestimentoOptions } from '../../config/formConfig'; // Importando opções do config

const InvestidorForm = ({ formData }) => {
  // formData é esperado como o retorno do hook useInvestidorForm
  // Ex: const { invNome, setInvNome, ... } = formData;

  return (
    <>
      <div className={styles.formGroup}>
        <label htmlFor="invNome">Nome:</label>
        <input
          type="text"
          id="invNome"
          name="invNome"
          value={formData.invNome}
          onChange={(e) => formData.setInvNome(e.target.value)}
          required
        />
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="invEmail">Email:</label>
        <input
          type="email"
          id="invEmail"
          name="invEmail"
          value={formData.invEmail}
          onChange={(e) => formData.setInvEmail(e.target.value)}
          required
        />
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="invTelefone">Telefone:</label>
        <input
          type="tel"
          id="invTelefone"
          name="invTelefone"
          value={formData.invTelefone}
          onChange={(e) => formData.setInvTelefone(e.target.value)}
          required
        />
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="invCidade">Cidade:</label>
        <input
          type="text"
          id="invCidade"
          name="invCidade"
          value={formData.invCidade}
          onChange={(e) => formData.setInvCidade(e.target.value)}
          required
        />
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="invEstado">Estado (UF):</label>
        <input
          type="text"
          id="invEstado"
          name="invEstado"
          value={formData.invEstado}
          onChange={(e) => formData.setInvEstado(e.target.value)}
          required
          maxLength="2" // Sigla do estado
        />
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="invValorInvestimento">Valor desejado para investimento:</label>
        <select
          id="invValorInvestimento"
          name="invValorInvestimento"
          value={formData.invValorInvestimento}
          onChange={(e) => formData.setInvValorInvestimento(e.target.value)}
          required
        >
          {valorInvestimentoOptions.map(option => (
            <option key={option.value} value={option.value}>{option.label}</option>
          ))}
        </select>
      </div>
    </>
  );
};

export default InvestidorForm;

