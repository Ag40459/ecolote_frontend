import { useForm } from 'react-hook-form';
import styles from './ContactModal.module.css';
import { valorInvestimentoOptions } from '../../config/formConfig';
import { fetchCNPJData } from '../../utils/cnpjService';
import { formatPhone, formatCep } from '../../utils/formatters';
import { useEffect } from 'react';

const InvestidorForm = ({ onSubmitTrigger }) => {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    setError,
    clearErrors,
    trigger
  } = useForm({
    defaultValues: {
      invNome: '',
      invEmail: '',
      invTelefone: '',
      invCep: '',
      invCidade: '',
      invEstado: '',
      invValorInvestimento: '',
    }
  });

  const handleFormSubmit = (data) => {
    console.log('Dados do formulário Investidor:', data);
  };

  useEffect(() => {
    if (onSubmitTrigger) {
      onSubmitTrigger(() => handleSubmit(handleFormSubmit)());
    }
  }, [onSubmitTrigger, handleSubmit]);

  const handleCepBlur = async (e) => {
    const cepRaw = e.target.value;
    const cep = cepRaw.replace(/\D/g, '');

    if (cep.length === 8) {
      clearErrors('invCep');
      try {
        const address = await fetchCNPJData(cep);
        if (address && !address.erro) {
          setValue('invCidade', address.localidade, { shouldDirty: true, shouldValidate: false });
          setValue('invEstado', address.uf, { shouldDirty: true, shouldValidate: false });
        } else {
          setError('invCep', {
            type: 'manual',
            message: 'CEP não encontrado ou inválido',
          });
          setValue('invCidade', '', { shouldDirty: true });
          setValue('invEstado', '', { shouldDirty: true });
        }
      } catch (error) {
        console.error('Erro ao buscar CEP:', error);
        setError('invCep', {
          type: 'manual',
          message: 'Erro ao buscar CEP. Tente novamente.',
        });
         setValue('invCidade', '', { shouldDirty: true });
         setValue('invEstado', '', { shouldDirty: true });
      }
    } else if (cepRaw.length > 0) {
        setValue('invCidade', '', { shouldDirty: true });
        setValue('invEstado', '', { shouldDirty: true });
    }
  };

  return (
    <>
      <div className={styles.formGroup}>
        <input
          id="invNome"
          type="text"
          className={styles.formInput}
          placeholder="Seu Nome"
          {...register('invNome', { required: 'Nome é obrigatório' })}
        />
        {errors.invNome && <span className={styles.error}>{errors.invNome.message}</span>}
      </div>

      <div className={styles.formGroup}>
        <input
          id="invEmail"
          type="email"
          className={styles.formInput}
          placeholder="Email"
          {...register('invEmail', {
            required: 'Email é obrigatório',
            pattern: { value: /^\S+@\S+$/i, message: 'Formato de email inválido' },
          })}
        />
        {errors.invEmail && <span className={styles.error}>{errors.invEmail.message}</span>}
      </div>

      <div className={styles.formGroup}>
        <input
          id="invTelefone"
          type="tel"
          className={styles.formInput}
          maxLength={15}
          placeholder="(00) 00000-0000 - Telefone"
          {...register('invTelefone', {
            required: 'Telefone é obrigatório',
            onChange: (e) => {
              const formatted = formatPhone(e.target.value);
              setValue('invTelefone', formatted, { shouldValidate: false, shouldDirty: true });
            },
          })}
        />
        {errors.invTelefone && <span className={styles.error}>{errors.invTelefone.message}</span>}
      </div>

      <div className={styles.formGroup}>
        <input
          id="invCep"
          type="tel"
          className={styles.formInput}
          maxLength={9}
          placeholder="00000-000"
          {...register('invCep', {
            required: 'CEP é obrigatório',
            pattern: { value: /^\d{5}-\d{3}$/, message: 'Formato de CEP inválido (00000-000)' },
            onChange: (e) => {
              const formatted = formatCep(e.target.value);
              setValue('invCep', formatted, { shouldValidate: false, shouldDirty: true });
            },
            onBlur: handleCepBlur,
          })}
        />
        {errors.invCep && <span className={styles.error}>{errors.invCep.message}</span>}
      </div>

      <div className={styles.formGroup}>
        <select
          id="invValorInvestimento"
          className={styles.formInput}
          {...register('invValorInvestimento', { required: 'Selecione um valor de investimento' })}
        >
          {valorInvestimentoOptions.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {errors.invValorInvestimento && <span className={styles.error}>{errors.invValorInvestimento.message}</span>}
      </div>

      {/* O botão de submit deve estar no formulário pai (ContactModal) */}
    </>
  );
};

export default InvestidorForm;

