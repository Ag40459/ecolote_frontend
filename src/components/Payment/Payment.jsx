import { useState, useEffect } from 'react';
import styles from './Payment.module.css';

// Dados dos métodos de pagamento com textos atualizados
const paymentMethods = [
  {
    iconClass: 'fas fa-credit-card',
    name: 'Cartão de Crédito',
    description:
      'Parcele em até 12x sem juros ou em até 24x com taxas especiais. Aceitamos todas as principais bandeiras.',
    highlight: 'Até 12x sem juros ou 24x com taxas especiais',
    category: 'parcelado',
    order: 1
  },
  {
    iconClass: 'fas fa-barcode',
    name: 'Boleto Bancário',
    description:
      'Gere seu boleto com nosso suporte comercial, com vencimento flexível em até 15 dias e acompanhe a compensação em tempo real. Instalação agendada após a confirmação do pagamento.',
    highlight: 'Economia de 5% no valor total',
    category: 'vista',
    order: 1
  },
  {
    iconClass: 'fas fa-university',
    name: 'Transferência (PIX/TED)',
    description:
      'Ganhe prioridade na instalação com pagamento via PIX ou TED. Confirmação instantânea para PIX e em até 2 horas para TED, com agendamento da instalação.',
    highlight: 'Facilidade e segurança em seu pagamento',
    category: 'vista',
    order: 2
  },
  {
    iconClass: 'fas fa-hand-holding-usd',
    name: 'Financiamento Facilitado',
    description:
      'Entrada de R$ 0,00 e primeira parcela em até 120 dias. Aprovação em até 24h com documentação simplificada. Parcelas que cabem no seu bolso, com opções até 84 meses.',
    highlight: 'Entrada a partir de 10% e carência de até 120 dias',
    category: 'financiado',
    order: 1
  },
  {
    iconClass: 'fas fa-shield-alt',
    name: 'Transparência Total',
    description:
      'Simulação detalhada com todos os custos discriminados antes da finalização. Contrato digital com linguagem simplificada e suporte dedicado durante todo o processo. Garantia de preço fixo sem reajustes.',
    highlight: 'Garantia de preço fixo e devolução em 7 dias',
    category: 'financiado',
    order: 2
  },
];

const PaymentSection = () => {
  const [activeTab, setActiveTab] = useState('vista');
  const [isVisible, setIsVisible] = useState(false);
  
  // Filtrar métodos de pagamento por categoria ativa
  const filteredMethods = paymentMethods.filter(
    method => method.category === activeTab
  );
  
  // Implementar animação baseada em Intersection Observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );
    
    const section = document.getElementById('payment');
    if (section) {
      observer.observe(section);
    }
    
    return () => {
      if (section) {
        observer.unobserve(section);
      }
    };
  }, []);

  return (
    <section id="payment" className={`${styles.paymentSection} content-section`}>
      <div className={`${styles.container} container`}>
        <div className={styles.paymentHeader}>
          <h2 className={styles.sectionTitle}>
            Invista no Seu Futuro Energético com Facilidade
          </h2>
          <p className={styles.sectionSubtitle}>
            Escolha entre nossas opções de pagamento personalizadas, com aprovação rápida e sem burocracia.
          </p>
        </div>
        
        <div className={styles.paymentTabs}>
          <button 
            className={`${styles.paymentTab} ${activeTab === 'vista' ? styles.active : ''}`}
            onClick={() => setActiveTab('vista')}
          >
            <i className={`fas fa-money-bill-wave ${styles.paymentTabIcon}`}></i>
            <span>Pagamento à Vista</span>
          </button>
          <button 
            className={`${styles.paymentTab} ${activeTab === 'parcelado' ? styles.active : ''}`}
            onClick={() => setActiveTab('parcelado')}
          >
            <i className={`fas fa-credit-card ${styles.paymentTabIcon}`}></i>
            <span>Parcelamento</span>
          </button>
          <button 
            className={`${styles.paymentTab} ${activeTab === 'financiado' ? styles.active : ''}`}
            onClick={() => setActiveTab('financiado')}
          >
            <i className={`fas fa-calendar-alt ${styles.paymentTabIcon}`}></i>
            <span>Financiamento</span>
          </button>
        </div>
        
        <div className={styles.paymentMethodsGrid}>
          {filteredMethods.map((method, index) => (

            <div 
              key={index} 
              className={styles.paymentMethodCard}
              style={{"--animation-order": method.order}}
            >
              <div className={styles.paymentMethodIconContainer}>
                <i className={`${method.iconClass} ${styles.paymentMethodIcon}`}></i>
              </div>
              <h3 className={styles.paymentMethodName}>{method.name}</h3>
              <p className={styles.paymentMethodDescription}>{method.description}</p>
              <div className={styles.paymentMethodHighlight}>
                <span className={styles.checkmark}>✓</span> {method.highlight}
              </div>
            </div>
          ))}
        </div>
      
            </div>
    </section>
  );
};

export default PaymentSection;
