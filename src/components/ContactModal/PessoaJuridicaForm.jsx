import React from 'react';
import styles from './ContactModal.module.css'; // Reutilizando os estilos do modal principal
import { modelosImovelPJ, pretensaoPagamentoOptions } from '../../config/formConfig';

const PessoaJuridicaForm = ({
  formData, // Objeto contendo todos os estados e setters do usePessoaJuridicaForm
  loadingCep,
  cepError,
}) => {
  return (
    <>
      <div className={styles.formGroup}>
        <label htmlFor="pjNomeEmpresa">Nome da Empresa:</label>
        <input type="text" id="pjNomeEmpresa" value={formData.pjNomeEmpresa} onChange={(e) => formData.setPjNomeEmpresa(e.target.value)} required />
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="pjCnpj">CNPJ:</label>
        <input type="text" id="pjCnpj" value={formData.pjCnpj} onChange={(e) => formData.setPjCnpj(e.target.value)} required />
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="pjTelefone">Telefone:</label>
        <input type="tel" id="pjTelefone" value={formData.pjTelefone} onChange={(e) => formData.setPjTelefone(e.target.value)} required />
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="pjModeloImovel">Modelo do imóvel:</label>
        <select id="pjModeloImovel" value={formData.pjModeloImovel} onChange={(e) => formData.setPjModeloImovel(e.target.value)} required>
          {modelosImovelPJ.map(option => (
            <option key={option.value} value={option.value}>{option.label}</option>
          ))}
        </select>
      </div>
      {formData.pjModeloImovel === 'Outro' && (
        <div className={styles.formGroup}>
          <label htmlFor="pjOutroModeloImovel">Qual tipo de moradia?</label>
          <input type="text" id="pjOutroModeloImovel" value={formData.pjOutroModeloImovel} onChange={(e) => formData.setPjOutroModeloImovel(e.target.value)} required />
        </div>
      )}
      <div className={styles.formGroup}>
        <label htmlFor="pjMediaContaEnergia">Média da conta de energia (R$):</label>
        <input 
          type="text" 
          id="pjMediaContaEnergia" 
          value={formData.pjMediaContaEnergia} 
          onChange={(e) => {
            const val = e.target.value.replace(/[^\d,.]/g, '');
            formData.setPjMediaContaEnergia(val);
          }} 
          placeholder="Ex: 1250.50" 
          required 
        />
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="pjCep">CEP:</label>
        <input type="text" id="pjCep" value={formData.pjCep} onChange={(e) => formData.setPjCep(e.target.value)} maxLength="9" placeholder="00000-000" required />
        {loadingCep && <p className={styles.loadingMessage}>Buscando CEP...</p>}
        {cepError && <p className={styles.errorMessage}>{cepError}</p>}
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="pjRua">Rua:</label>
        <input type="text" id="pjRua" value={formData.pjRua} onChange={(e) => formData.setPjRua(e.target.value)} required />
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="pjNumero">Número:</label>
        <input type="text" id="pjNumero" value={formData.pjNumero} onChange={(e) => formData.setPjNumero(e.target.value)} required />
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="pjComplemento">Complemento:</label>
        <input type="text" id="pjComplemento" value={formData.pjComplemento} onChange={(e) => formData.setPjComplemento(e.target.value)} />
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="pjBairro">Bairro:</label>
        <input type="text" id="pjBairro" value={formData.pjBairro} onChange={(e) => formData.setPjBairro(e.target.value)} required />
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="pjCidade">Cidade:</label>
        <input type="text" id="pjCidade" value={formData.pjCidade} onChange={(e) => formData.setPjCidade(e.target.value)} required />
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="pjEstado">Estado:</label>
        <input type="text" id="pjEstado" value={formData.pjEstado} onChange={(e) => formData.setPjEstado(e.target.value)} required />
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="pjPretensaoPagamento">Pretensão de Pagamento:</label>
        <select id="pjPretensaoPagamento" value={formData.pjPretensaoPagamento} onChange={(e) => formData.setPjPretensaoPagamento(e.target.value)} required>
          {pretensaoPagamentoOptions.map(option => (
            <option key={option.value} value={option.value}>{option.label}</option>
          ))}
        </select>
      </div>
    </>
  );
};

export default PessoaJuridicaForm;

