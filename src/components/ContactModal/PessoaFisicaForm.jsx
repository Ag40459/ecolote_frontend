import { useEffect } from 'react';
import styles from './ContactModal.module.css';
import { formatPhone, formatCep,onlyNumbers  } from '../../utils/formatters';
import { formatCurrency } from '../../utils/calc';

const modelosImovelPF = [
  { value: "", label: "Selecione o modelo" },
  { value: "Casa", label: "Casa" },
  { value: "Apartamento", label: "Apartamento" },
  { value: "Comercial", label: "Comercial" },
  { value: "Rural", label: "Rural" },
  { value: "Outro", label: "Outro" },
];

const pretensaoPagamentoOptions = [
  { value: "", label: "Selecione a pretensão" },
  { value: "avista", label: "À vista" },
  { value: "cartao", label: "Cartão" },
  { value: "financiado", label: "Financiamento" },
];

const PessoaFisicaForm = ({ formData, loadingCep, cepError }) => {
  useEffect(() => {
    if (!formData.pfNumero) {
      formData.setPfNumero("0001");
    }
  }, [formData]);


  return (
    <>
      <div className={styles.formGroup}>
        <label htmlFor="pfName">Nome Completo:</label>
        <input type="text" id="pfName" value={formData.pfName || ''} onChange={(e) => formData.setPfName(e.target.value)} required />
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="pfTelefone">Telefone:</label>
        <input
          type="tel"
          id="pfTelefone"
          value={formData.pfTelefone || ''}
          onChange={(e) => formData.setPfTelefone(formatPhone(e.target.value))}
          placeholder="(00) 00000-0000"
          required
        />
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="pfEmail">Email:</label>
        <input
          type="email"
          id="pfEmail"
          value={formData.pfEmail || ''}
          onChange={(e) => formData.setPfEmail(e.target.value)}
          placeholder="exemplo@email.com"
          required
        />
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="pfModeloImovel">Modelo do imóvel:</label>
        <select id="pfModeloImovel" value={formData.pfModeloImovel || ''} onChange={(e) => formData.setPfModeloImovel(e.target.value)} required>
          {modelosImovelPF.map(option => (
            <option key={option.value} value={option.value}>{option.label}</option>
          ))}
        </select>
      </div>

      {formData.pfModeloImovel === 'Outro' && (
        <div className={styles.formGroup}>
          <label htmlFor="pfOutroModeloImovel">Qual tipo de moradia?</label>
          <input
            type="text"
            id="pfOutroModeloImovel"
            value={formData.pfOutroModeloImovel || ''}
            onChange={(e) => formData.setPfOutroModeloImovel(e.target.value)}
            required
          />
        </div>
      )}

      <div className={styles.formGroup}>
        <label htmlFor="pfMediaContaEnergia">Média da conta de energia:</label>
        <input
  type="text"
  id="pfMediaContaEnergia"
  value={formData.pfMediaContaEnergia || ''}
  onChange={(e) => {
    const raw = onlyNumbers(e.target.value); // remove tudo que não for número
    const formatted = formatCurrency(raw, 'input');
    formData.setPfMediaContaEnergia(formatted);
  }}
  placeholder="R$ 0,00"
  required
/>
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="pfCep">CEP:</label>
        <input
          type="text"
          id="pfCep"
          value={formData.pfCep || ''}
          onChange={(e) => formData.setPfCep(formatCep(e.target.value))}
          maxLength="9"
          placeholder="00000-000"
          required
        />
        {loadingCep && <p className={styles.loadingMessage}>Buscando CEP...</p>}
        {cepError && <p className={styles.errorMessage}>{cepError}</p>}
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="pfPretensaoPagamento">Pretensão de Pagamento:</label>
        <select id="pfPretensaoPagamento" value={formData.pfPretensaoPagamento || ''} onChange={(e) => formData.setPfPretensaoPagamento(e.target.value)} required>
          {pretensaoPagamentoOptions.map(option => (
            <option key={option.value} value={option.value}>{option.label}</option>
          ))}
        </select>
      </div>

      {/* Campos ocultos para manter a compatibilidade com o backend */}
      <input type="hidden" id="pfRua" value={formData.pfRua || ''} onChange={(e) => formData.setPfRua(e.target.value)} />
      <input type="hidden" id="pfNumero" value={formData.pfNumero || '0001'} onChange={(e) => formData.setPfNumero(e.target.value)} />
      <input type="hidden" id="pfComplemento" value={formData.pfComplemento || ''} onChange={(e) => formData.setPfComplemento(e.target.value)} />
      <input type="hidden" id="pfBairro" value={formData.pfBairro || ''} onChange={(e) => formData.setPfBairro(e.target.value)} />
      <input type="hidden" id="pfCidade" value={formData.pfCidade || ''} onChange={(e) => formData.setPfCidade(e.target.value)} />
      <input type="hidden" id="pfEstado" value={formData.pfEstado || ''} onChange={(e) => formData.setPfEstado(e.target.value)} />
    </>
  );
};

export default PessoaFisicaForm;
