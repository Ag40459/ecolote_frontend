import { useEffect } from 'react';
import styles from './ContactModal.module.css';
import { modelosImovelPJ, pretensaoPagamentoOptions } from '../../config/formConfig';
import { formatCNPJ, formatPhone, onlyNumbers } from '../../utils/formatters';
import { formatCurrency } from '../../utils/calc';
import { fetchCNPJData } from '../../utils/cnpjService';

const setIfEmpty = (currentValue, newValue, setFunction) => {
  if (newValue && !currentValue) {
    setFunction(newValue);
  }
};

const validateEmail = (email) => /\S+@\S+\.\S+/.test(email);
const validatePhone = (phone) => /^\(\d{2}\)\s?\d{4,5}-\d{4}$/.test(phone);
const validateCNPJ = (cnpj) => /^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/.test(cnpj);
const validateCep = (cep) => /^\d{8}$/.test(cep);

const PessoaJuridicaForm = ({ formData, loadingCep, cepError }) => {
  useEffect(() => {
    if (!formData.pjNumero) {
      formData.setPjNumero("0002");
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const cleanCnpj = formData.pjCnpj?.replace(/\D/g, '');
      if (cleanCnpj?.length === 14) {
        const data = await fetchCNPJData(cleanCnpj);
        if (data) {
          setIfEmpty(formData.pjNomeEmpresa, data.razao_social, formData.setPjNomeEmpresa);
          setIfEmpty(formData.pjEmailComercial, data.email, formData.setPjEmailComercial);
          setIfEmpty(formData.pjTelefone, formatPhone(`${data.ddd}${data.telefone}`), formData.setPjTelefone);
          setIfEmpty(formData.pjRua, data.logradouro, formData.setPjRua);
          setIfEmpty(formData.pjComplemento, data.complemento, formData.setPjComplemento);
          setIfEmpty(formData.pjBairro, data.bairro, formData.setPjBairro);
          setIfEmpty(formData.pjCidade, data.municipio, formData.setPjCidade);
          setIfEmpty(formData.pjEstado, data.uf, formData.setPjEstado);
          setIfEmpty(formData.pjCep, data.cep?.replace(/\D/g, ''), formData.setPjCep);
        }
      }
    };

    fetchData();
  }, [formData.pjCnpj]);

  const isNomeEmpresaFromApi = formData.pjCnpj?.replace(/\D/g, '').length === 14 && formData.pjNomeEmpresa;

  return (
    <>
      <div className={styles.formGroup}>
        <label htmlFor="pjCnpj">CNPJ:</label>
        <input
          type="text"
          id="pjCnpj"
          value={formData.pjCnpj || ''}
          onChange={(e) => formData.setPjCnpj(formatCNPJ(e.target.value))}
          required
          pattern="\d{2}\.\d{3}\.\d{3}/\d{4}-\d{2}"
          title="CNPJ inválido"
        />
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="pjNomeEmpresa">Razão Social:</label>
        <input
          type="text"
          id="pjNomeEmpresa"
          value={formData.pjNomeEmpresa || ''}
          onChange={(e) => formData.setPjNomeEmpresa(e.target.value)}
          readOnly={isNomeEmpresaFromApi}
          required
        />
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="pjNomeResponsavel">Nome do Responsável:</label>
        <input
          type="text"
          id="pjNomeResponsavel"
          value={formData.pjNomeResponsavel || ''}
          onChange={(e) => formData.setPjNomeResponsavel(e.target.value)}
          required
        />
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="pjTelefone">Telefone Comercial:</label>
        <input
          type="tel"
          id="pjTelefone"
          value={formData.pjTelefone || ''}
          onChange={(e) => {
            const formatted = formatPhone(e.target.value);
            formData.setPjTelefone(formatted);
            formData.setPjTelefoneResponsavel(formatted);
          }}
          required
          pattern="\(\d{2}\)\s?\d{4,5}-\d{4}"
          placeholder="(00) 00000-0000"
        />
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="pjEmailComercial">Email Comercial:</label>
        <input
          type="email"
          id="pjEmailComercial"
          value={formData.pjEmailComercial || ''}
          onChange={(e) => formData.setPjEmailComercial(e.target.value)}
          required
        />
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="pjModeloImovel">Tipo do Imóvel Comercial:</label>
        <select
          id="pjModeloImovel"
          value={formData.pjModeloImovel || ''}
          onChange={(e) => formData.setPjModeloImovel(e.target.value)}
          required
        >
          {modelosImovelPJ.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      {formData.pjModeloImovel === 'Outro' && (
        <div className={styles.formGroup}>
          <label htmlFor="pjOutroModeloImovel">Outro tipo de imóvel:</label>
          <input
            type="text"
            id="pjOutroModeloImovel"
            value={formData.pjOutroModeloImovel || ''}
            onChange={(e) => formData.setPjOutroModeloImovel(e.target.value)}
            required
          />
        </div>
      )}

      <div className={styles.formGroup}>
        <label htmlFor="pjMediaContaEnergia">Média da Conta de Energia:</label>
        <input
          type="text"
          id="pjMediaContaEnergia"
          value={formData.pjMediaContaEnergia || ''}
          onChange={(e) => formData.setPjMediaContaEnergia(formatCurrency(e.target.value, 'input'))}
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
          pattern="\d{8}"
        />
        {loadingCep && <p className={styles.loadingMessage}>Buscando CEP...</p>}
        {cepError && <p className={styles.errorMessage}>{cepError}</p>}
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="pjPretensaoPagamento">Pretensão de Pagamento:</label>
        <select
          id="pjPretensaoPagamento"
          value={formData.pjPretensaoPagamento || ''}
          onChange={(e) => formData.setPjPretensaoPagamento(e.target.value)}
          required
        >
          {pretensaoPagamentoOptions.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      {/* Campos ocultos para integração com backend */}
      <input type="hidden" id="pjRua" value={formData.pjRua || ''} onChange={(e) => formData.setPjRua(e.target.value)} />
      <input type="hidden" id="pjNumero" value={formData.pjNumero || '0002'} onChange={(e) => formData.setPjNumero(e.target.value)} />
      <input type="hidden" id="pjComplemento" value={formData.pjComplemento || ''} onChange={(e) => formData.setPjComplemento(e.target.value)} />
      <input type="hidden" id="pjBairro" value={formData.pjBairro || ''} onChange={(e) => formData.setPjBairro(e.target.value)} />
      <input type="hidden" id="pjCidade" value={formData.pjCidade || ''} onChange={(e) => formData.setPjCidade(e.target.value)} />
      <input type="hidden" id="pjEstado" value={formData.pjEstado || ''} onChange={(e) => formData.setPjEstado(e.target.value)} />
      <input type="hidden" id="pjTelefoneResponsavel" value={formData.pjTelefoneResponsavel || formData.pjTelefone || ''} onChange={(e) => formData.setPjTelefoneResponsavel(e.target.value)} />
    </>
  );
};

export default PessoaJuridicaForm;
