import React, { useState, useEffect } from 'react';
import styles from './ContactModal.module.css';
import { valorInvestimentoOptions } from '../../config/formConfig';
import { fetchEstados, fetchCidades } from '../../utils/cepService';
import { formatPhone } from '../../utils/formatters';

const InvestidorForm = ({ formData }) => {
  const [estados, setEstados] = useState([]);
  const [cidades, setCidades] = useState([]);

  useEffect(() => {
    const carregarEstados = async () => {
      const estadosData = await fetchEstados();
      setEstados(estadosData);
    };
    carregarEstados();
  }, []);

  useEffect(() => {
    const carregarCidades = async () => {
      if (formData.invEstado) {
        const cidadesData = await fetchCidades(formData.invEstado);
        setCidades(cidadesData);
      } else {
        setCidades([]);
      }
    };
    carregarCidades();
  }, [formData.invEstado]);

  return (
    <>
      <div className={styles.formGroup}>
        <label htmlFor="invNome">Nome Completo:</label>
        <input
          type="text"
          id="invNome"
          value={formData.invNome || ''}
          onChange={(e) => formData.setInvNome(e.target.value)}
          required
        />
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="invEmail">Email:</label>
        <input
          type="email"
          id="invEmail"
          value={formData.invEmail || ''}
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
          value={formData.invTelefone || ''}
          onChange={(e) => formData.setInvTelefone(formatPhone(e.target.value))}
          required
        />
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="invEstado">Estado (UF):</label>
        <select
          id="invEstado"
          value={formData.invEstado || ''}
          onChange={async (e) => {
            const uf = e.target.value;
            formData.setInvEstado(uf);
            formData.setInvCidade('');
            const cidadesData = await fetchCidades(uf);
            setCidades(cidadesData);
          }}
          required
        >
          <option value="">Selecione o estado</option>
          {estados.map((estado) => (
            <option key={estado.sigla} value={estado.sigla}>
              {estado.nome}
            </option>
          ))}
        </select>
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="invCidade">Cidade:</label>
        <select
          id="invCidade"
          value={formData.invCidade || ''}
          onChange={(e) => formData.setInvCidade(e.target.value)}
          required
          disabled={!formData.invEstado}
        >
          <option value="">Selecione a cidade</option>
          {cidades.map((cidade) => (
            <option key={cidade} value={cidade}>
              {cidade}
            </option>
          ))}
        </select>
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="invValorInvestimento">Valor desejado para investimento:</label>
        <select
          id="invValorInvestimento"
          value={formData.invValorInvestimento || ''}
          onChange={(e) => formData.setInvValorInvestimento(e.target.value)}
          required
        >
          {valorInvestimentoOptions.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    </>
  );
};

export default InvestidorForm;