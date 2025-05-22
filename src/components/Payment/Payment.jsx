import { useState, useEffect } from 'react';
import styles from './Payment.module.css';

// Dados dos métodos de pagamento com textos atualizados
const paymentMethods = [
  {
    iconClass: 'fas fa-credit-card',
    name: 'Cartão de Crédito',
    description:
      'Parcele em até 12x sem juros ou em até 24x com taxas especiais. Aprovação imediata e início da instalação em até 48h após confirmação. Aceitamos todas as bandeiras principais e oferecemos desconto de 5% na primeira parcela.',
    highlight: 'Até 12x sem juros ou 24x com taxas especiais',
    category: 'parcelado',
    order: 1
  },
  {
    iconClass: 'fas fa-barcode',
    name: 'Boleto Bancário',
    description:
      'Economize 8% no valor total com pagamento à vista via boleto. Gere seu boleto online com vencimento flexível em até 15 dias e acompanhe a compensação em tempo real. Instalação agendada imediatamente após a confirmação do pagamento.',
    highlight: 'Economia de 8% no valor total',
    category: 'vista',
    order: 1
  },
  {
    iconClass: 'fas fa-university',
    name: 'Transferência (PIX/TED)',
    description:
      'Ganhe prioridade na instalação com pagamento via PIX (desconto de 10%) ou TED (desconto de 8%). Confirmação instantânea para PIX e em até 2 horas para TED, com agendamento imediato da instalação e bônus exclusivo de monitoramento premium por 6 meses.',
    highlight: 'Até 10% de desconto + monitoramento premium grátis',
    category: 'vista',
    order: 2
  },
  {
    iconClass: 'fas fa-hand-holding-usd',
    name: 'Financiamento Facilitado',
    description:
      'Entrada a partir de 10% e primeira parcela em até 120 dias. Aprovação em até 24h com documentação simplificada. Parcelas que cabem no seu bolso, com opções de 36 a 72 meses e possibilidade de quitação antecipada com desconto progressivo.',
    highlight: 'Entrada a partir de 10% e carência de até 120 dias',
    category: 'financiado',
    order: 1
  },
  {
    iconClass: 'fas fa-shield-alt',
    name: 'Transparência Total',
    description:
      'Simulação detalhada com todos os custos discriminados antes da finalização. Contrato digital com linguagem simplificada e suporte dedicado durante todo o processo. Garantia de preço fixo sem reajustes surpresa e devolução garantida em caso de arrependimento em até 7 dias.',
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
        
        <div className={styles.paymentPartners}>
          <div className={styles.partnerLogo}>
            <i className="fas fa-university"></i>
          </div>
          <div className={styles.partnerLogo}>
            <i className="fas fa-credit-card"></i>
          </div>
          <div className={styles.partnerLogo}>
            <i className="fas fa-landmark"></i>
          </div>
          <div className={styles.partnerLogo}>
            <i className="fas fa-piggy-bank"></i>
          </div>
        </div>

        <div className={styles.paymentCTA}>
          <h3 className={styles.paymentCTATitle}>Pronto para Investir no Seu Futuro Energético?</h3>
          <p className={styles.paymentCTAText}>
            Faça seu pré-cadastro agora mesmo e nossa equipe apresentará a simulação completa com todas as opções
            de pagamento personalizadas para o seu perfil.
          </p>
          <a href="#contact" className={styles.ctaButton}>
            Quero Conhecer a Melhor Opção para Mim
            <i className={`fas fa-arrow-right ${styles.ctaButtonIcon}`}></i>
          </a>
        </div>
      </div>
    </section>
  );
};

export default PaymentSection;
