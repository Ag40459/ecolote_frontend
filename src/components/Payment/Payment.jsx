import styles from './Payment.module.css';

const paymentMethods = [
  {
    iconClass: 'fas fa-credit-card',
    name: 'Cartão de Crédito',
    description:
      'Adquira seu EcoLote com rapidez e segurança utilizando as principais bandeiras de cartão. Parcelamento em até 12x disponível para sua comodidade.',
  },
  {
    iconClass: 'fas fa-barcode',
    name: 'Boleto Bancário',
    description:
      'Prefere pagamento à vista com desconto especial? Gere seu boleto diretamente na plataforma e efetue o pagamento em qualquer banco ou aplicativo financeiro.',
  },
  {
    iconClass: 'fas fa-university',
    name: 'Transferência Bancária (PIX/TED)',
    description:
      'Realize o pagamento via PIX para aprovação instantânea e liberação imediata do seu processo de aquisição, ou utilize TED/DOC para transferências tradicionais.',
  },
  {
    iconClass: 'fas fa-hand-holding-usd',
    name: 'Financiamento Facilitado',
    description:
      'Torne-se proprietário da sua usina solar com entrada reduzida e parcelas que cabem no seu orçamento. Financiamento com instituições parceiras e carência de até 120 dias.',
  },
  {
    iconClass: 'fas fa-shield-alt',
    name: 'Transparência Total',
    description:
      'Todos os custos, condições e benefícios são apresentados com clareza antes da finalização da sua compra. Sem surpresas, sem taxas ocultas.',
  },
];

const PaymentSection = () => {
  return (
    <section id="payment" className={`${styles.paymentSection} content-section`}>
      <div className={`${styles.container} container`}>
        <h2 className={styles.sectionTitle}>Formas de Pagamento Flexíveis</h2>
        <p className={styles.sectionSubtitle}>
          No Ecolote, facilitamos a aquisição do seu lote de energia solar com propriedade individual,
          oferecendo opções de pagamento seguras que se adaptam à sua realidade financeira.
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

        <div className={styles.paymentCTA}>
          <h3>Pronto para Investir no Seu Futuro Energético?</h3>
          <p>
            Faça seu pré-cadastro agora mesmo e nossa equipe apresentará a simulação completa com todas as opções
            de pagamento personalizadas para o seu perfil.
          </p>
          <a href="#contact" className={styles.ctaButton}>Solicitar Simulação</a>
        </div>
      </div>
    </section>
  );
};

export default PaymentSection;