import { useEffect } from 'react';
import styles from './ContactModal.module.css';
import { useForm, Controller } from 'react-hook-form';
import { NumericFormat } from 'react-number-format';
import { formatPhone, formatCep } from '../../utils/formatters';

const modelosImovelPF = [
  { value: "", label: "Tipo de Moradia" },
  { value: "Casa", label: "Casa" },
  { value: "Apartamento", label: "Apartamento" },
  { value: "Comercial", label: "Comercial" },
  { value: "Rural", label: "Rural" },
  { value: "Outro", label: "Outro" },
];

const pretensaoPagamentoOptions = [
  { value: "", label: "Selecione a pretensão de pagamento" },
  { value: "avista", label: "À vista" },
  { value: "cartao", label: "Cartão" },
  { value: "financiado", label: "Financiamento" },
];

const PessoaFisicaForm = ({ formData, loadingCep, cepError, onSubmitTrigger }) => {
  const {
    control,
    register,
    setValue,
    watch,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues: {
      pfName: formData?.pfName || '',
      pfTelefone: formData?.pfTelefone || '',
      pfEmail: formData?.pfEmail || '',
      pfModeloImovel: formData?.pfModeloImovel || '',
      pfOutroModeloImovel: formData?.pfOutroModeloImovel || '',
      pfMediaContaEnergia: formData?.pfMediaContaEnergia || null,
      pfCep: formData?.pfCep || '',
      pfPretensaoPagamento: formData?.pfPretensaoPagamento || '',
      pfRua: formData?.pfRua || '',
      pfNumero: formData?.pfNumero || '0001',
      pfComplemento: formData?.pfComplemento || '',
      pfBairro: formData?.pfBairro || '',
      pfCidade: formData?.pfCidade || '',
      pfEstado: formData?.pfEstado || ''
    }
  });

  const handleFormSubmit = (data) => {
    console.log('Dados do formulário Pessoa Física:', data);
  };

  useEffect(() => {
    if (onSubmitTrigger) {
      onSubmitTrigger(() => handleSubmit(handleFormSubmit)());
    }
  }, [onSubmitTrigger, handleSubmit]);

  const watchedCep = watch('pfCep');
  const watchedRua = watch('pfRua');
  const watchedNumero = watch('pfNumero');
  const watchedComplemento = watch('pfComplemento');
  const watchedBairro = watch('pfBairro');
  const watchedCidade = watch('pfCidade');
  const watchedEstado = watch('pfEstado');

  useEffect(() => {
    if (formData?.pfRua !== watchedRua) setValue('pfRua', formData?.pfRua || '');
    if (formData?.pfNumero !== watchedNumero) setValue('pfNumero', formData?.pfNumero || '0001');
    if (formData?.pfComplemento !== watchedComplemento) setValue('pfComplemento', formData?.pfComplemento || '');
    if (formData?.pfBairro !== watchedBairro) setValue('pfBairro', formData?.pfBairro || '');
    if (formData?.pfCidade !== watchedCidade) setValue('pfCidade', formData?.pfCidade || '');
    if (formData?.pfEstado !== watchedEstado) setValue('pfEstado', formData?.pfEstado || '');
  }, [
    formData?.pfRua, formData?.pfNumero, formData?.pfComplemento, 
    formData?.pfBairro, formData?.pfCidade, formData?.pfEstado, 
    setValue, 
    watchedRua, watchedNumero, watchedComplemento, 
    watchedBairro, watchedCidade, watchedEstado
  ]);

  return (
    <>
      <div className={styles.formGroup}>
        <input
          id="pfName"
          type="text"
          className={styles.formInput}
          placeholder="Nome"
          {...register('pfName', { required: 'Nome é obrigatório' })}
        />
        {errors.pfName && <p className={styles.errorMessage}>{errors.pfName.message}</p>}
      </div>

      <div className={styles.formGroup}>
        <input
          id="pfTelefone"
          type="tel"
          className={styles.formInput}
          placeholder="Telefone - (00) 00000-0000"
          maxLength={15}
          {...register('pfTelefone', {
            required: 'Telefone é obrigatório',
            pattern: { value: /^\(\d{2}\)\s?\d{5}-\d{4}$/, message: 'Telefone inválido' },
            onChange: (e) => {
              const formatted = formatPhone(e.target.value);
              setValue('pfTelefone', formatted, { shouldValidate: true });
            }
          })}
        />
        {errors.pfTelefone && <p className={styles.errorMessage}>{errors.pfTelefone.message}</p>}
      </div>

      <div className={styles.formGroup}>
        <input
          id="pfEmail"
          type="email"
          className={styles.formInput}
          placeholder="exemplo@email.com"
          {...register('pfEmail', {
            required: 'Email é obrigatório',
            pattern: { value: /\S+@\S+\.\S+/, message: 'Email inválido' }
          })}
        />
        {errors.pfEmail && <p className={styles.errorMessage}>{errors.pfEmail.message}</p>}
      </div>

      <div className={styles.formGroup}>
        <select
          id="pfModeloImovel"
          className={styles.formInput}
          {...register('pfModeloImovel', { required: 'Selecione o modelo' })}
        >
          {modelosImovelPF.map(option => (
            <option key={option.value} value={option.value}>{option.label}</option>
          ))}
        </select>
        {errors.pfModeloImovel && <p className={styles.errorMessage}>{errors.pfModeloImovel.message}</p>}
      </div>

      {watch('pfModeloImovel') === 'Outro' && (
        <div className={styles.formGroup}>
          <input
            id="pfOutroModeloImovel"
            type="text"
            className={styles.formInput}
            {...register('pfOutroModeloImovel', {
              required: watch('pfModeloImovel') === 'Outro' ? 'Especifique o tipo' : false
            })}
          />
          {errors.pfOutroModeloImovel && <p className={styles.errorMessage}>{errors.pfOutroModeloImovel.message}</p>}
        </div>
      )}

      <div className={styles.formGroup}>
        <Controller
          name="pfMediaContaEnergia"
          control={control}
          rules={{
            required: 'Valor é obrigatório',
            min: { value: 0.01, message: 'Valor deve ser maior que zero' }
          }}
          render={({ field: { onChange, onBlur, value, name, ref } }) => (
            <NumericFormat
              id="pfMediaContaEnergia"
              name={name}
              getInputRef={ref}
              className={styles.formInput}
              value={value}
              onValueChange={(values) => {
                onChange(values.floatValue === undefined ? null : values.floatValue);
              }}
              onBlur={onBlur}
              thousandSeparator="."
              decimalSeparator=","
              prefix="R$ "
              decimalScale={2}
              fixedDecimalScale={true}
              allowNegative={false}
              placeholder="Qual o valor da sua conta de luz - R$ 0,00"
              inputMode="decimal"
              required
            />
          )}
        />
        {errors.pfMediaContaEnergia && <p className={styles.errorMessage}>{errors.pfMediaContaEnergia.message}</p>}
      </div>

      <div className={styles.formGroup}>
        <input
          id="pfCep"
          type="tel"
          className={styles.formInput}
          maxLength={9}
          placeholder="00000-000"
          {...register('pfCep', {
            required: 'CEP é obrigatório',
            pattern: { value: /^\d{5}-\d{3}$/, message: 'CEP inválido' },
            onChange: (e) => {
              const formatted = formatCep(e.target.value);
              setValue('pfCep', formatted, { shouldValidate: true });
              // Disparar busca de CEP no componente pai, se necessário
              // Ex: props.onCepChange(formatted);
            }
          })}
        />
        {loadingCep && <p className={styles.loadingMessage}>Buscando CEP...</p>}
        {cepError && <p className={styles.errorMessage}>{cepError}</p>}
        {errors.pfCep && <p className={styles.errorMessage}>{errors.pfCep.message}</p>}
      </div>

      <div className={styles.formGroup}>
        <select
          id="pfPretensaoPagamento"
          className={styles.formInput}
          {...register('pfPretensaoPagamento', { required: 'Selecione a pretensão' })}
        >
          {pretensaoPagamentoOptions.map(option => (
            <option key={option.value} value={option.value}>{option.label}</option>
          ))}
        </select>
        {errors.pfPretensaoPagamento && <p className={styles.errorMessage}>{errors.pfPretensaoPagamento.message}</p>}
      </div>

      <input type="hidden" {...register('pfRua')} />
      <input type="hidden" {...register('pfNumero')} />
      <input type="hidden" {...register('pfComplemento')} />
      <input type="hidden" {...register('pfBairro')} />
      <input type="hidden" {...register('pfCidade')} />
      <input type="hidden" {...register('pfEstado')} />
    </>
  );
};

export default PessoaFisicaForm;

