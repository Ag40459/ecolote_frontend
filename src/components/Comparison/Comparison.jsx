import React, { useState, useEffect, useRef } from 'react';
import styles from './Comparison.module.css';
import { FaHome, FaUsers, FaDollarSign, FaLeaf, FaShieldAlt, FaCheckCircle, FaFileContract, FaChartLine, FaHandshake, FaMoneyBillWave } from 'react-icons/fa';

const Comparison = () => {
  const [activeTab, setActiveTab] = useState('benefits');
  const [isVisible, setIsVisible] = useState(false);
  const [activeComparison, setActiveComparison] = useState(0);
  const sectionRef = useRef(null);
  
  // Detectar quando a seção entra na viewport para animar
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.2 }
    );
    
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    
    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);
  
  // Rotação automática dos itens de comparação
  useEffect(() => {
    if (activeTab === 'comparison') {
      const interval = setInterval(() => {
        setActiveComparison((prev) => (prev + 1) % comparisonData.length);
      }, 5000);
      
      return () => clearInterval(interval);
    }
  }, [activeTab]);

  const benefits = [
    { 
      icon: <FaHome />, 
      title: 'Propriedade Real', 
      description: 'Você é o dono de uma usina solar remota com documentação em seu nome, um ativo que valoriza com o tempo e pode ser vendido ou transmitido como herança.' 
    },
    { 
      icon: <FaUsers />, 
      title: 'Gestão Associativa', 
      description: 'Modelo único com propriedade individual e gestão coletiva eficiente, otimizando custos e benefícios.' 
    },
    { 
      icon: <FaDollarSign />, 
      title: 'Economia Comprovada', 
      description: 'Reduza sua conta, acumule créditos e proteja-se contra tarifas.' 
    },
    { 
      icon: <FaLeaf />, 
      title: 'Impacto Ambiental Positivo', 
      description: 'Energia 100% renovável e reserva ambiental preservada.' 
    },
    { 
      icon: <FaShieldAlt />, 
      title: 'Segurança Completa', 
      description: 'Seguro, garantia e monitoramento constante da sua usina.' 
    },
    { 
      icon: <FaCheckCircle />, 
      title: 'Simplicidade e Conveniência', 
      description: 'Sem obras, sem manutenção, adesão rápida e gerenciamento online.' 
    }
  ];

  const comparisonData = [
    { 
      feature: 'Propriedade', 
      ecolote: 'Você é dono de uma usina solar remota em seu nome', 
      tradicional: 'Você aluga uma cota de energia gerada por terceiros', 
      destaqueEcolote: true,
      icon: <FaFileContract />
    },
    { 
      feature: 'Custo Inicial', 
      ecolote: 'Acessível e com parcelas que cabem no lugar da conta de luz', 
      tradicional: 'Sem custo inicial pois se trata de desconto na conta de luz', 
      destaqueEcolote: true,
      icon: <FaMoneyBillWave />
    },
    { 
      feature: 'Manutenção', 
      ecolote: 'Inclusa (gerenciada pela usina do projeto Ecolote)', 
      tradicional: 'Não visível ao cliente, mas embutida no custo mensal', 
      destaqueEcolote: true,
      icon: <FaShieldAlt />
    },
    { 
      feature: 'Flexibilidade', 
      ecolote: 'Alta — créditos acumulam no seu CPF', 
      tradicional: 'Baixa — depende do contrato, região e prestador', 
      destaqueEcolote: true,
      icon: <FaCheckCircle />
    },
    { 
      feature: 'Valorização', 
      ecolote: 'É um ativo real que pode ser valorizado e revendido', 
      tradicional: 'Sem valor de revenda — apenas uso temporário', 
      destaqueEcolote: true,
      icon: <FaChartLine />
    },
    { 
      feature: 'Duração dos Benefícios', 
      ecolote: 'Permanente (25+ anos de vida útil dos equipamentos)', 
      tradicional: 'Limitada ao contrato (geralmente 5-10 anos)', 
      destaqueEcolote: true,
      icon: <FaHandshake />
    },
  ];

  return (
    <section 
      id="comparison" 
      ref={sectionRef}
      className={`${styles.comparison} ${isVisible ? styles.visible : ''}`}
    >
      <div className={styles.comparisonBackground}>
        <div className={styles.energyWaves}>
          <div className={styles.wave}></div>
          <div className={styles.wave}></div>
        </div>
      </div>
      
      <div className={styles.container}>
        <h2 className={styles.sectionTitle}>
          <span className={styles.titleHighlight}>Por Que Escolher</span> o Ecolote?
        </h2>
        
        <p className={styles.sectionIntro}>
          Descubra como o Ecolote revoluciona o acesso à energia solar através de um modelo único de propriedade individual com gestão associativa.
        </p>
        
        <div className={styles.viewTabs}>
          <button 
            className={`${styles.tabBtn} ${activeTab === 'benefits' ? styles.active : ''}`}
            onClick={() => setActiveTab('benefits')}
            aria-selected={activeTab === 'benefits'}
            role="tab"
          >
            <span className={styles.tabText}>Benefícios Exclusivos</span>
          </button>
          <button 
            className={`${styles.tabBtn} ${activeTab === 'comparison' ? styles.active : ''}`}
            onClick={() => setActiveTab('comparison')}
            aria-selected={activeTab === 'comparison'}
            role="tab"
          >
            <span className={styles.tabText}>Comparativo Detalhado</span>
          </button>
        </div>
        
        <div className={styles.tabContent}>
          {activeTab === 'benefits' && (
            <div className={styles.benefitsGrid}>
              {benefits.map((item, i) => (
                <div 
                  className={styles.benefitCard} 
                  key={i}
                  style={{ animationDelay: `${i * 0.1}s` }}
                >
                  <div className={styles.iconContainer}>
                    <div className={styles.icon}>{item.icon}</div>
                  </div>
                  <h4 className={styles.benefitTitle}>{item.title}</h4>
                  <p className={styles.benefitDescription}>{item.description}</p>
                </div>
              ))}
            </div>
          )}
          
          {activeTab === 'comparison' && (
            <div className={styles.comparisonContainer}>
              <div className={styles.comparisonVisual}>
                <div className={styles.comparisonSlider}>
                  {comparisonData.map((item, idx) => (
                    <div 
                      key={idx}
                      className={`${styles.comparisonItem} ${activeComparison === idx ? styles.activeItem : ''}`}
                      onClick={() => setActiveComparison(idx)}
                    >
                      <div className={styles.comparisonFeature}>
                        <div className={styles.featureIcon}>{item.icon}</div>
                        <h4 className={styles.featureTitle}>{item.feature}</h4>
                      </div>
                      
                      <div className={styles.comparisonCards}>
                        <div className={`${styles.comparisonCard} ${styles.ecoloteCard} ${item.destaqueEcolote ? styles.highlighted : ''}`}>
                          <h5 className={styles.cardTitle}>Ecolote</h5>
                          <div className={styles.cardContent}>
                            <p>{item.ecolote}</p>
                            {item.destaqueEcolote && (
                              <div className={styles.winnerBadge}>
                                <span>Melhor Opção</span>
                              </div>
                            )}
                          </div>
                        </div>
                        
                        <div className={`${styles.comparisonCard} ${styles.traditionalCard}`}>
                          <h5 className={styles.cardTitle}>Energia Solar Compartilhada</h5>
                          <div className={styles.cardContent}>
                            <p>{item.tradicional}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className={styles.comparisonControls}>
                  {comparisonData.map((_, idx) => (
                    <button
                      key={idx}
                      className={`${styles.controlDot} ${activeComparison === idx ? styles.activeDot : ''}`}
                      onClick={() => setActiveComparison(idx)}
                      aria-label={`Ver comparação ${idx + 1}`}
                    />
                  ))}
                </div>
              </div>
              
              <div className={styles.comparisonTableWrapper}>
                <table className={styles.comparisonTable}>
                  <thead>
                    <tr>
                      <th>Característica</th>
                      <th>Ecolote</th>
                      <th>Energia Solar Compartilhada</th>
                    </tr>
                  </thead>
                  <tbody>
                    {comparisonData.map((item, idx) => (
                      <tr key={idx} className={item.destaqueEcolote ? styles.highlightEcolote : ''}>
                        <td>
                          <div className={styles.tableFeature}>
                            <span className={styles.tableIcon}>{item.icon}</span>
                            <span>{item.feature}</span>
                          </div>
                        </td>
                        <td>{item.ecolote}</td>
                        <td>{item.tradicional}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
        
        <div className={styles.highlightNote}>
          <div className={styles.noteIcon}>
            <FaShieldAlt />
          </div>
          <div className={styles.noteContent}>
            <strong>Importante:</strong> O Ecolote não é um serviço temporário: é sua própria mini usina solar remota, com segurança jurídica, liberdade total e potencial de valorização.
          </div>
        </div>
        
        <div className={styles.ctaContainer}>
          <h3 className={styles.ctaTitle}>Pronto para Investir no Seu Futuro Energético?</h3>
          <p className={styles.ctaText}>Dê o primeiro passo para a independência energética com propriedade real.</p>
          <a href="#contact" className={styles.ctaButton}>
            <span className={styles.ctaButtonText}>Solicitar Simulação Personalizada</span>
            <span className={styles.ctaButtonIcon}>→</span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Comparison;
