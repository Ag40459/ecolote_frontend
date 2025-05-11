import React from 'react';
import styles from './ContactModal.module.css'; // Reutilizando os estilos do modal principal
import { modelosImovelPF, mediaContaEnergiaOptions, pretensaoPagamentoOptions } from '../../config/formConfig';

const PessoaFisicaForm = ({
  formData, // Objeto contendo todos os estados e setters do usePessoaFisicaForm
  loadingCep,
  cepError,
}) => {
  return (
    <>
      <div className={styles.formGroup}>
        <label htmlFor="pfName">Nome Completo:</label>
        <input type="text" id="pfName" value={formData.pfName} onChange={(e) => formData.setPfName(e.target.value)} required />
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="pfTelefone">Telefone:</label>
        <input type="tel" id="pfTelefone" value={formData.pfTelefone} onChange={(e) => formData.setPfTelefone(e.target.value)} required />
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="pfModeloImovel">Modelo do imóvel:</label>
        <select id="pfModeloImovel" value={formData.pfModeloImovel} onChange={(e) => formData.setPfModeloImovel(e.target.value)} required>
          {modelosImovelPF.map(option => (
            <option key={option.value} value={option.value}>{option.label}</option>
          ))}
        </select>
      </div>
      {formData.pfModeloImovel === 'outro' && (
        <div className={styles.formGroup}>
          <label htmlFor="pfOutroModeloImovel">Qual tipo de moradia?</label>
          <input type="text" id="pfOutroModeloImovel" value={formData.pfOutroModeloImovel} onChange={(e) => formData.setPfOutroModeloImovel(e.target.value)} required />
        </div>
      )}
      <div className={styles.formGroup}>
        <label htmlFor="pfMediaContaEnergia">Média da conta de energia (últimos 3 meses):</label>
        <select id="pfMediaContaEnergia" value={formData.pfMediaContaEnergia} onChange={(e) => formData.setPfMediaContaEnergia(e.target.value)} required>
          {mediaContaEnergiaOptions.map(option => (
            <option key={option.value} value={option.value}>{option.label}</option>
          ))}
        </select>
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="pfCep">CEP:</label>
        <input type="text" id="pfCep" value={formData.pfCep} onChange={(e) => formData.setPfCep(e.target.value)} maxLength="9" placeholder="00000-000" required />
        {loadingCep && <p className={styles.loadingMessage}>Buscando CEP...</p>}
        {cepError && <p className={styles.errorMessage}>{cepError}</p>}
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="pfRua">Rua:</label>
        <input type="text" id="pfRua" value={formData.pfRua} onChange={(e) => formData.setPfRua(e.target.value)} required />
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="pfNumero">Número:</label>
        <input type="text" id="pfNumero" value={formData.pfNumero} onChange={(e) => formData.setPfNumero(e.target.value)} required />
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="pfComplemento">Complemento:</label>
        <input type="text" id="pfComplemento" value={formData.pfComplemento} onChange={(e) => formData.setPfComplemento(e.target.value)} />
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="pfBairro">Bairro:</label>
        <input type="text" id="pfBairro" value={formData.pfBairro} onChange={(e) => formData.setPfBairro(e.target.value)} required />
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="pfCidade">Cidade:</label>
        <input type="text" id="pfCidade" value={formData.pfCidade} onChange={(e) => formData.setPfCidade(e.target.value)} required />
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="pfEstado">Estado:</label>
        <input type="text" id="pfEstado" value={formData.pfEstado} onChange={(e) => formData.setPfEstado(e.target.value)} required />
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="pfPretensaoPagamento">Pretensão de Pagamento:</label>
        <select id="pfPretensaoPagamento" value={formData.pfPretensaoPagamento} onChange={(e) => formData.setPfPretensaoPagamento(e.target.value)} required>
          {pretensaoPagamentoOptions.map(option => (
            <option key={option.value} value={option.value}>{option.label}</option>
          ))}
        </select>
      </div>
    </>
  );
};

export default PessoaFisicaForm;

