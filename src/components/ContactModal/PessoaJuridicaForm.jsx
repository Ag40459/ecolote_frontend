import { useEffect } from 'react';
import styles from './ContactModal.module.css';
import { modelosImovelPJ, pretensaoPagamentoOptions } from '../../config/formConfig';
import { formatCNPJ, formatPhone, formatCurrency, onlyNumbers } from '../../utils/formatters';
import { fetchCnpjData } from '../../utils/cnpjService';

const PessoaJuridicaForm = ({ formData, loadingCep, cepError }) => {
  useEffect(() => {
    const fetchData = async () => {
      const cleanCnpj = formData.pjCnpj?.replace(/\D/g, '');
      if (cleanCnpj?.length === 14) {
        const data = await fetchCnpjData(cleanCnpj);
        if (data) {
          formData.setPjNomeEmpresa(data.razao_social || '');
          formData.setPjEmailComercial(data.email || '');
          formData.setPjTelefone(data.ddd && data.telefone ? formatPhone(`${data.ddd}${data.telefone}`) : '');
          formData.setPjRua(data.logradouro || '');
          formData.setPjNumero(data.numero || '');
          formData.setPjComplemento(data.complemento || '');
          formData.setPjBairro(data.bairro || '');
          formData.setPjCidade(data.municipio || '');
          formData.setPjEstado(data.uf || '');
          formData.setPjCep(data.cep?.replace(/\D/g, '') || '');
        }
      }
    };

    fetchData();
  }, [formData.pjCnpj]); // Executa sempre que o CNPJ muda

   return (
    <>
      <div className={styles.formGroup}>
        <label htmlFor="pjNomeEmpresa">Nome da Empresa:</label>
        <input type="text" id="pjNomeEmpresa" value={formData.pjNomeEmpresa || ''} onChange={(e) => formData.setPjNomeEmpresa(e.target.value)} required />
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="pjCnpj">CNPJ:</label>
        <input type="text" id="pjCnpj" value={formData.pjCnpj || ''} onChange={(e) => formData.setPjCnpj(formatCNPJ(e.target.value))} required />
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="pjTelefone">Telefone Comercial:</label>
        <input type="tel" id="pjTelefone" value={formData.pjTelefone || ''} onChange={(e) => formData.setPjTelefone(formatPhone(e.target.value))} required />
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="pjEmailComercial">E-mail Comercial:</label>
        <input type="email" id="pjEmailComercial" value={formData.pjEmailComercial || ''} onChange={(e) => formData.setPjEmailComercial(e.target.value)} required />
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="pjNomeResponsavel">Nome do Responsável:</label>
        <input type="text" id="pjNomeResponsavel" value={formData.pjNomeResponsavel || ''} onChange={(e) => formData.setPjNomeResponsavel(e.target.value)} required />
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="pjTelefoneResponsavel">Telefone do Responsável:</label>
        <input type="tel" id="pjTelefoneResponsavel" value={formData.pjTelefoneResponsavel || ''} onChange={(e) => formData.setPjTelefoneResponsavel(formatPhone(e.target.value))} required />
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="pjModeloImovel">Modelo do imóvel:</label>
        <select id="pjModeloImovel" value={formData.pjModeloImovel || ''} onChange={(e) => formData.setPjModeloImovel(e.target.value)} required>
          {modelosImovelPJ.map(option => (
            <option key={option.value} value={option.value}>{option.label}</option>
          ))}
        </select>
      </div>

      {formData.pjModeloImovel === 'Outro' && (
        <div className={styles.formGroup}>
          <label htmlFor="pjOutroModeloImovel">Qual tipo de imóvel?</label>
          <input type="text" id="pjOutroModeloImovel" value={formData.pjOutroModeloImovel || ''} onChange={(e) => formData.setPjOutroModeloImovel(e.target.value)} required />
        </div>
      )}

      <div className={styles.formGroup}>
        <label htmlFor="pjMediaContaEnergia">Média da conta de energia (R$):</label>
        <input
          type="text"
          id="pjMediaContaEnergia"
          value={formData.pjMediaContaEnergia || ''}
          onChange={(e) => formData.setPjMediaContaEnergia(formatCurrency(e.target.value))}
          placeholder="Ex: 1.250,00"
          required
        />
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="pjCep">CEP:</label>
        <input
          type="tel"
          id="pjCep"
          value={formData.pjCep || ''}
          onChange={(e) => formData.setPjCep(onlyNumbers(e.target.value))}
          maxLength="8"
          placeholder="00000000"
          required
        />
        {loadingCep && <p className={styles.loadingMessage}>Buscando CEP...</p>}
        {cepError && <p className={styles.errorMessage}>{cepError}</p>}
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="pjRua">Rua:</label>
        <input type="text" id="pjRua" value={formData.pjRua || ''} onChange={(e) => formData.setPjRua(e.target.value)} required />
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="pjNumero">Número:</label>
        <input type="text" id="pjNumero" value={formData.pjNumero || ''} onChange={(e) => formData.setPjNumero(onlyNumbers(e.target.value))} required />
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="pjComplemento">Complemento:</label>
        <input type="text" id="pjComplemento" value={formData.pjComplemento || ''} onChange={(e) => formData.setPjComplemento(e.target.value)} />
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="pjBairro">Bairro:</label>
        <input type="text" id="pjBairro" value={formData.pjBairro || ''} onChange={(e) => formData.setPjBairro(e.target.value)} required />
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="pjCidade">Cidade:</label>
        <input type="text" id="pjCidade" value={formData.pjCidade || ''} onChange={(e) => formData.setPjCidade(e.target.value)} required />
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="pjEstado">Estado:</label>
        <input type="text" id="pjEstado" value={formData.pjEstado || ''} onChange={(e) => formData.setPjEstado(e.target.value)} required />
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="pjPretensaoPagamento">Pretensão de Pagamento:</label>
        <select id="pjPretensaoPagamento" value={formData.pjPretensaoPagamento || ''} onChange={(e) => formData.setPjPretensaoPagamento(e.target.value)} required>
          {pretensaoPagamentoOptions.map(option => (
            <option key={option.value} value={option.value}>{option.label}</option>
          ))}
        </select>
      </div>
    </>
  );
};

export default PessoaJuridicaForm;