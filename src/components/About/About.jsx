import React, { useState, useEffect, useRef } from 'react';
import styles from './About.module.css';
import imageAbout from '../../assets/imageAbout.png';

const About = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
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
  
  // Dados para as abas
  const tabs = [
    {
      title: "O Conceito",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={styles.tabIconSvg}>
          <path d="M12 3v18M5.5 6.5L12 3l6.5 3.5M5.5 17.5L12 21l6.5-3.5M4 10h16M4 14h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      content: (
        <>
          <p>
            <strong>Ecolote é a sua porta de entrada para a revolução da energia solar. </strong> 
            Uma plataforma inovadora que democratiza o acesso à energia limpa, tornando-a acessível, rentável e descomplicada para todos os brasileiros.
          </p>
          <p>
            Você adquire uma <strong>mini usina solar remota</strong>, instalada em um lote rural de <strong>35m²</strong> em uma das regiões com maior incidência solar do estado.
            A usina é registrada em seu nome, com <strong>garantia</strong>, <strong>monitoramento</strong> e funcionamento totalmente legalizado.
          </p>
        </>
      )
    },
    {
      title: "Benefícios",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={styles.tabIconSvg}>
          <path d="M12 22c6.075 0 11-4.925 11-11S18.075 0 12 0 1 4.925 1 11s4.925 11 11 11z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M8 14s1.5 2 4 2 4-2 4-2M9 9h.01M15 9h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      content: (
        <div className={styles.benefitsGrid}>
          <div className={styles.benefitCard}>
            <div className={styles.benefitIcon}>
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={styles.benefitIconSvg}>
                <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <circle cx="12" cy="12" r="5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <h4>Economia Real</h4>
            <p>Reduza sua conta de luz à taxa mínima e obtenha retorno do seu investimento.</p>
          </div>
          <div className={styles.benefitCard}>
            <div className={styles.benefitIcon}>
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={styles.benefitIconSvg}>
                <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M9 22V12h6v10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <h4>Sem Instalação Local</h4>
            <p>Não precisa de telhado próprio ou modificações em sua residência ou negócio.</p>
          </div>
          <div className={styles.benefitCard}>
            <div className={styles.benefitIcon}>
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={styles.benefitIconSvg}>
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <h4>Sustentabilidade</h4>
            <p>Energia 100% limpa e renovável, contribuindo para um planeta mais saudável.</p>
          </div>
          <div className={styles.benefitCard}>
            <div className={styles.benefitIcon}>
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={styles.benefitIconSvg}>
                <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M14 2v6h6M16 13H8M16 17H8M10 9H8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <h4>Propriedade Real</h4>
            <p>Usina registrada em seu nome, com documentação completa e garantia de 10 anos.</p>
          </div>
        </div>
      )
    },
    {
      title: "Para Quem",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={styles.tabIconSvg}>
          <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2M9 11a4 4 0 100-8 4 4 0 000 8zM23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      content: (
        <>
          <div className={styles.profilesContainer}>
            <div className={styles.profileCard}>
              <h4>Residências</h4>
              <ul className={styles.profileList}>
                <li>Apartamentos</li>
                <li>Casas alugadas</li>
                <li>Imóveis sem espaço</li>
                <li>Residências com telhados inadequados</li>
              </ul>
            </div>
            <div className={styles.profileCard}>
              <h4>Empresas</h4>
              <ul className={styles.profileList}>
                <li>Comércios em pontos alugados</li>
                <li>Escritórios em prédios comerciais</li>
                <li>Empresas com alto consumo energético</li>
              </ul>
            </div>
          </div>
          <p>
            Seja pessoa física ou jurídica, o Ecolote oferece <strong>planos flexíveis e transparentes</strong>, adaptados ao seu perfil de consumo. 
            Faça parte da transformação energética do Brasil com <strong>energia inteligente para você e sustentabilidade para o planeta</strong>.
          </p>
        </>
      )
    }
  ];
  
  // Renderizar partículas solares
  const renderSolarParticles = () => {
    const particles = [];
    for (let i = 0; i < 8; i++) {
      particles.push(
        <div 
          key={i} 
          className={styles.particle}
          style={{
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 5}s`,
            animationDuration: `${5 + Math.random() * 5}s`
          }}
        ></div>
      );
    }
    return particles;
  };
  
  return (
    <section 
      id="about" 
      ref={sectionRef}
      className={`${styles.aboutSection} ${isVisible ? styles.visible : ''} content-section`}
    >
      {/* Fundo dinâmico com padrão solar */}
      <div className={styles.aboutBackground}>
        <div className={styles.solarPattern}></div>
        <div className={styles.solarParticles}>
          {renderSolarParticles()}
        </div>
      </div>
      
      <div className={`${styles.aboutContainer} container`}>
        <h2 className={styles.sectionTitle}>
          <span className={styles.titleHighlight}>O Que é</span> o Ecolote?
        </h2>
        
        <div className={styles.aboutContent}>
          {/* Coluna da imagem */}
          <div className={styles.aboutImageColumn}>
            <div className={styles.imageWrapper}>
              <img
                src={imageAbout}
                alt="Usina solar do Ecolote com painéis solares organizados em fileiras em um terreno rural, com sistema de monitoramento e segurança"
                className={styles.aboutImage}
              />
              <div className={styles.imageOverlay}>
                <div className={styles.overlayContent}>
                  <span className={styles.overlayIcon}>
                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={styles.overlayIconSvg}>
                      <path d="M12 3v18M5.5 6.5L12 3l6.5 3.5M5.5 17.5L12 21l6.5-3.5M4 10h16M4 14h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </span>
                  <span className={styles.overlayText}>Sua Usina Solar</span>
                </div>
              </div>
            </div>
            <p className={styles.imageCaption}>
              Usina solar remota do Ecolote: sua energia limpa sem complicações
            </p>
            
            <div className={styles.imageFacts}>
              <div className={styles.factItem}>
                <div className={styles.factValue}>35m²</div>
                <div className={styles.factLabel}>Ecolote Padrão</div>
              </div>
              <div className={styles.factItem}>
                <div className={styles.factValue}>10 anos</div>
                <div className={styles.factLabel}>Garantia</div>
              </div>
              <div className={styles.factItem}>
                <div className={styles.factValue}>100%</div>
                <div className={styles.factLabel}>Sua Propriedade</div>
              </div>
            </div>
          </div>
          
          {/* Coluna de texto com sistema de abas */}
          <div className={styles.aboutTextColumn}>
            <div className={styles.tabsContainer}>
              <div className={styles.tabsHeader}>
                {tabs.map((tab, index) => (
                  <button
                    key={index}
                    className={`${styles.tabButton} ${activeTab === index ? styles.activeTab : ''}`}
                    onClick={() => setActiveTab(index)}
                    aria-label={`Ver informações sobre ${tab.title}`}
                  >
                    <span className={styles.tabIcon}>{tab.icon}</span>
                    <span className={styles.tabTitle}>{tab.title}</span>
                  </button>
                ))}
              </div>
              
              <div className={styles.tabContent}>
                {tabs[activeTab].content}
              </div>
            </div>
            
            <div className={styles.ctaContainer}>
              <a href="#contact" className={`${styles.ctaButton} ${styles.energyButton}`}>
                <span className={styles.ctaText}>Quero Minha Usina Solar</span>
                <span className={styles.ctaArrow}>→</span>
                <span className={styles.buttonPulse}></span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
