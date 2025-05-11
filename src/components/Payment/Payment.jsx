import styles from './Payment.module.css'; 

const PaymentSection = () => {
  const paymentMethods = [
    {
      iconClass: 'fas fa-credit-card',
      name: 'Cartão de Crédito',
      description: 'Pague seus lotes de energia de forma rápida e segura com as principais bandeiras de cartão de crédito. Parcelamento disponível (verificar condições).'
    },
    {
      iconClass: 'fas fa-barcode',
      name: 'Boleto Bancário',
      description: 'Opção prática para pagamento à vista. Gere seu boleto diretamente na plataforma e pague em qualquer banco ou casa lotérica.'
    },
    {
      iconClass: 'fas fa-university', // Ou 'fas fa-exchange-alt' para TED/DOC
      name: 'Transferência Bancária (PIX/TED)',
      description: 'Realize o pagamento via PIX para aprovação instantânea ou utilize TED/DOC. Informações detalhadas disponíveis na área de pagamento.'
    },
    {
      iconClass: 'fas fa-hand-holding-usd',
      name: 'Financiamento Facilitado',
      description: 'Consulte nossas opções de financiamento em parceria com instituições financeiras para adquirir seus lotes de energia com condições especiais com pagamento da primeira parcela de até 120 dias.'
    }
  ];

  return (
    <section id="payment" className={`${styles.paymentSection} content-section`}>
      <div className={`${styles.container} container`}>
        <h2 className={styles.sectionTitle}>Formas de Pagamento Flexíveis</h2>
        <p className={styles.sectionSubtitle}>
          No Ecolote, facilitamos ao máximo a aquisição dos seus lotes de energia solar, oferecendo diversas opções de pagamento seguras e convenientes.
        </p>
        <div className={styles.paymentMethodsGrid}>
          {paymentMethods.map((method, index) => (
            <div key={index} className={styles.paymentMethodCard}>
              <div className={styles.paymentMethodIconContainer}>
                <i className={`${method.iconClass} ${styles.paymentMethodIcon}`}></i>
              </div>
              <h3 className={styles.paymentMethodName}>{method.name}</h3>
              <p className={styles.paymentMethodDescription}>{method.description}</p>
            </div>
          ))}
        </div>
        <div className={styles.paymentInfo}>
          <p><strong>Transparência Total:</strong> Todos os custos e condições são claramente apresentados antes da finalização da sua compra.</p>
          <p><strong>Segurança Garantida:</strong> Utilizamos as mais modernas tecnologias de segurança para proteger suas transações financeiras.</p>
        </div>
      </div>
    </section>
  );
};

export default PaymentSection;
