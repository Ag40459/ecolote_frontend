import React, { useState } from 'react';
import styles from './Contact.module.css'; // Crie este arquivo CSS

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    userType: 'pf',
    cpf: '',
    cnpj: '',
    companyName: '',
    investmentRange: '',
    exclusiveInterest: false,
  });
  const [formType, setFormType] = useState('general'); // 'general' ou 'investor'
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleFormTypeChange = (type) => {
    setFormType(type);
    setSubmitted(false);
    setError('');
    // Resetar campos específicos ao mudar de formulário pode ser útil
    setFormData(prevData => ({
        ...prevData,
        cpf: '',
        cnpj: '',
        companyName: '',
        investmentRange: '',
        exclusiveInterest: false,
        subject: '', // Resetar assunto também
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitted(false);
    setError('');

    // Validação básica (pode ser mais robusta)
    if (!formData.name || !formData.email) {
      setError('Nome e Email são obrigatórios.');
      return;
    }
    if (formType === 'general' && formData.userType === 'pf' && !formData.cpf) {
        setError('CPF é obrigatório para Pessoa Física.');
        return;
    }
    if (formType === 'general' && formData.userType === 'pj' && !formData.cnpj) {
        setError('CNPJ é obrigatório para Pessoa Jurídica.');
        return;
    }

    const endpoint = formType === 'general' ? '/api/forms/general' : '/api/forms/investor';
    const payload = {
        nome: formData.name,
        email: formData.email,
        telefone: formData.phone,
        // Campos específicos para cada formulário
        ...(formType === 'general' && {
            cpf_cnpj: formData.userType === 'pf' ? formData.cpf : formData.cnpj,
            tipo_imovel: formData.subject, // Usando subject para tipo_imovel ou assunto geral
            forma_pagamento: '', // Adicionar se necessário
            mensagem: formData.message,
            ...(formData.userType === 'pj' && { nome_empresa: formData.companyName }),
        }),
        ...(formType === 'investor' && {
            tipo_investimento: formData.subject, // Usando subject para tipo de investimento
            faixa_capital: formData.investmentRange,
            interesse_exclusivo: formData.exclusiveInterest,
            mensagem: formData.message,
        }),
    };

    try {
      // Simulação de envio para o backend
      // Em um projeto real, você faria uma requisição fetch ou axios aqui
      console.log(`Enviando para ${endpoint}:`, payload);
      // const response = await fetch(process.env.REACT_APP_BACKEND_URL + endpoint, {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify(payload),
      // });
      // if (!response.ok) {
      //   const errorData = await response.json();
      //   throw new Error(errorData.message || 'Falha ao enviar formulário.');
      // }
      // const result = await response.json();
      // console.log(result);
      setSubmitted(true);
      // Limpar formulário após envio bem-sucedido
      setFormData({
        name: '', email: '', phone: '', subject: '', message: '', userType: 'pf', cpf: '', cnpj: '', companyName: '', investmentRange: '', exclusiveInterest: false,
      });

    } catch (err) {
      setError(err.message || 'Ocorreu um erro ao enviar o formulário. Tente novamente.');
    }
  };

  return (
    <section id="contact" className={`${styles.contactSection} content-section`}>
      <div className={`${styles.container} container`}>
        <h2 className={styles.sectionTitle}>Entre em Contato</h2>
        <p className={styles.sectionSubtitle}>
          Tem dúvidas, sugestões ou quer saber mais sobre como o Ecolote pode transformar sua relação com a energia? Fale conosco!
        </p>

        <div className={styles.formToggleButtons}>
          <button 
            onClick={() => handleFormTypeChange('general')} 
            className={`${styles.toggleButton} ${formType === 'general' ? styles.active : ''}`}>
            Cadastro Geral (PF/PJ)
          </button>
          <button 
            onClick={() => handleFormTypeChange('investor')} 
            className={`${styles.toggleButton} ${formType === 'investor' ? styles.active : ''}`}>
            Sou Investidor
          </button>
        </div>

        {submitted && <p className={styles.successMessage}>Formulário enviado com sucesso! Entraremos em contato em breve.</p>}
        {error && <p className={styles.errorMessage}>{error}</p>}

        <form onSubmit={handleSubmit} className={styles.contactForm}>
          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label htmlFor="name">Nome Completo*</label>
              <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="email">Email*</label>
              <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
            </div>
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="phone">Telefone (WhatsApp)</label>
            <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange} placeholder="(XX) XXXXX-XXXX" />
          </div>

          {formType === 'general' && (
            <>
              <div className={styles.formGroup}>
                <label>Tipo de Pessoa*</label>
                <div>
                  <label className={styles.radioLabel}><input type="radio" name="userType" value="pf" checked={formData.userType === 'pf'} onChange={handleChange} /> Pessoa Física</label>
                  <label className={styles.radioLabel}><input type="radio" name="userType" value="pj" checked={formData.userType === 'pj'} onChange={handleChange} /> Pessoa Jurídica</label>
                </div>
              </div>
              {formData.userType === 'pf' && (
                <div className={styles.formGroup}>
                  <label htmlFor="cpf">CPF*</label>
                  <input type="text" id="cpf" name="cpf" value={formData.cpf} onChange={handleChange} placeholder="000.000.000-00" required />
                </div>
              )}
              {formData.userType === 'pj' && (
                <>
                  <div className={styles.formGroup}>
                    <label htmlFor="cnpj">CNPJ*</label>
                    <input type="text" id="cnpj" name="cnpj" value={formData.cnpj} onChange={handleChange} placeholder="00.000.000/0000-00" required />
                  </div>
                  <div className={styles.formGroup}>
                    <label htmlFor="companyName">Nome da Empresa</label>
                    <input type="text" id="companyName" name="companyName" value={formData.companyName} onChange={handleChange} />
                  </div>
                </>
              )}
              <div className={styles.formGroup}>
                <label htmlFor="subject">Assunto/Tipo de Imóvel</label>
                <input type="text" id="subject" name="subject" value={formData.subject} onChange={handleChange} />
              </div>
            </>
          )}

          {formType === 'investor' && (
            <>
              <div className={styles.formGroup}>
                <label htmlFor="subject">Tipo de Investimento Desejado</label>
                <input type="text" id="subject" name="subject" value={formData.subject} onChange={handleChange} />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="investmentRange">Faixa de Capital para Investimento</label>
                <select id="investmentRange" name="investmentRange" value={formData.investmentRange} onChange={handleChange}>
                  <option value="">Selecione...</option>
                  <option value="ate-50k">Até R$50.000</option>
                  <option value="50k-100k">R$50.001 - R$100.000</option>
                  <option value="100k-250k">R$100.001 - R$250.000</option>
                  <option value="acima-250k">Acima de R$250.000</option>
                </select>
              </div>
              <div className={styles.formGroup}>
                <label className={styles.checkboxLabel}>
                  <input type="checkbox" name="exclusiveInterest" checked={formData.exclusiveInterest} onChange={handleChange} />
                  Tenho interesse em oportunidades exclusivas ou projetos maiores.
                </label>
              </div>
            </>
          )}

          <div className={styles.formGroup}>
            <label htmlFor="message">Mensagem</label>
            <textarea id="message" name="message" rows="5" value={formData.message} onChange={handleChange}></textarea>
          </div>

          <button type="submit" className={`${styles.submitButton} cta-button`}>Enviar Mensagem</button>
        </form>

             </div>
    </section>
  );
};

export default ContactSection;
