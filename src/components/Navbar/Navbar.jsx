import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import styles from './Navbar.module.css';

// Inicialização do tema no carregamento da página
if (!localStorage.getItem('theme')) {
  localStorage.setItem('theme', 'dark');
  document.body.classList.add('dark-theme');
} else if (localStorage.getItem('theme') === 'dark') {
  document.body.classList.add('dark-theme');
}

const Navbar = ({ openAuthModal }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDarkTheme, setIsDarkTheme] = useState(localStorage.getItem('theme') === 'dark');
  const { admin, logout } = useAuth();
  const navigate = useNavigate();

  // Inicialização do tema
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setIsDarkTheme(savedTheme === 'dark');
      document.body.classList.toggle('dark-theme', savedTheme === 'dark');
    } else {
      setIsDarkTheme(true);
      document.body.classList.add('dark-theme');
      localStorage.setItem('theme', 'dark');
    }
  }, []);

  // Controle de scroll para mudar aparência da navbar
  const handleScroll = () => {
    if (window.scrollY > 50) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Controle do menu mobile
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    // Impedir scroll do body quando o menu está aberto
    document.body.style.overflow = !isMobileMenuOpen ? 'hidden' : '';
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
    document.body.style.overflow = '';
  };

  // Controle do tema
  const handleThemeToggle = () => {
    const newTheme = !isDarkTheme;
    setIsDarkTheme(newTheme);
    document.body.classList.toggle('dark-theme', newTheme);
    localStorage.setItem('theme', newTheme ? 'dark' : 'light');
  };

  // Funções de autenticação
  const handleLogout = () => {
    logout();
    setIsMobileMenuOpen(false);
    navigate('/');
  };

  const handleAdminAreaClick = (e) => {
    e.preventDefault();
    if (openAuthModal) {
      openAuthModal();
    }
    closeMobileMenu();
  };

  // Fechar menu ao clicar fora
  useEffect(() => {
    const handleClickOutside = (event) => {
      const navContainer = document.querySelector(`.${styles.navLinksContainer}`);
      const menuToggle = document.querySelector(`.${styles.menuToggle}`);
      
      if (isMobileMenuOpen && navContainer && !navContainer.contains(event.target) && 
          menuToggle && !menuToggle.contains(event.target)) {
        closeMobileMenu();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMobileMenuOpen]);

  return (
    <header className={`${styles.navbar} ${isScrolled ? styles.scrolled : ''}`}>
      {/* Overlay para fechar o menu ao clicar fora */}
      {isMobileMenuOpen && (
        <div 
          className={`${styles.menuOverlay} ${isMobileMenuOpen ? styles.active : ''}`} 
          onClick={closeMobileMenu}
          aria-hidden="true"
        />
      )}
      
      <div className={`${styles.container} container`}>
        <a href="#hero" className={styles.logo} onClick={closeMobileMenu}>Ecolote</a>
        
        {/* Botão de alternância de tema - Ícone melhorado */}
        <button 
          onClick={handleThemeToggle} 
          className={styles.themeToggleButton} 
          aria-label="Alternar tema"
        >
          {isDarkTheme ? (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 18C15.3137 18 18 15.3137 18 12C18 8.68629 15.3137 6 12 6C8.68629 6 6 8.68629 6 12C6 15.3137 8.68629 18 12 18Z" fill="currentColor"/>
              <path d="M12 2V4" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              <path d="M12 20V22" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              <path d="M4.93 4.93L6.34 6.34" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              <path d="M17.66 17.66L19.07 19.07" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              <path d="M2 12H4" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              <path d="M20 12H22" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              <path d="M6.34 17.66L4.93 19.07" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              <path d="M19.07 4.93L17.66 6.34" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          ) : (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M20.9999 12.79C20.8426 14.4922 20.2038 16.1144 19.1581 17.4668C18.1125 18.8192 16.7034 19.8458 15.0956 20.4265C13.4878 21.0073 11.7479 21.1181 10.0794 20.7461C8.41092 20.3741 6.8829 19.5345 5.67413 18.3258C4.46536 17.117 3.62584 15.589 3.25381 13.9205C2.88178 12.252 2.99262 10.5121 3.57336 8.9043C4.15411 7.29651 5.18073 5.88737 6.53311 4.84175C7.8855 3.79614 9.5077 3.15731 11.2099 3C10.2133 4.34827 9.73375 6.00945 9.85843 7.68141C9.98312 9.35338 10.7038 10.9251 11.8893 12.1106C13.0748 13.2961 14.6465 14.0168 16.3185 14.1415C17.9905 14.2662 19.6516 13.7866 20.9999 12.79Z" fill="currentColor"/>
            </svg>
          )}
        </button>
        
        {/* Botão de menu mobile (três pontinhos) */}
        <button 
          className={styles.menuToggle} 
          id="menu-toggle" 
          aria-label={isMobileMenuOpen ? "Fechar menu" : "Abrir menu"} 
          onClick={toggleMobileMenu}
        >
          {isMobileMenuOpen ? '' : '⋮'}
        </button>
        
        {/* Menu de navegação */}
        <nav className={`${styles.navLinksContainer} ${isMobileMenuOpen ? styles.active : ''}`}>
          {/* Cabeçalho do menu mobile com botão de fechar */}
          <div className={styles.mobileMenuHeader}>
            <span className={styles.mobileMenuTitle}>Menu</span>
            <button 
              className={styles.closeMenuButton} 
              onClick={closeMobileMenu}
              aria-label="Fechar menu"
            >
              ✕
            </button>
          </div>
          
          <ul className={styles.navLinks}>
            <li><a href="#hero" onClick={closeMobileMenu}>Início</a></li>
            <li><a href="#about" onClick={closeMobileMenu}>Sobre</a></li>
            <li><a href="#features" onClick={closeMobileMenu}>Diferenciais</a></li>
            <li><a href="#how-it-works" onClick={closeMobileMenu}>Funcionamento</a></li>
            <li><a href="#simulation" onClick={closeMobileMenu}>Simulação</a></li>
            <li><a href="#payment" onClick={closeMobileMenu}>Pagamento</a></li>
            <li><a href="#contact" onClick={closeMobileMenu}>Contato</a></li>
            {admin ? (
              <>
                <li><Link to="/admin/dashboard" onClick={closeMobileMenu}>Dashboard</Link></li>
                <li><Link to="/admin/register" onClick={closeMobileMenu}>Admin</Link></li> 
                <li><button onClick={handleLogout} className={styles.navButtonLogout}>Sair</button></li>
              </>
            ) : (
              <li>
                <a href="#" onClick={handleAdminAreaClick} className={styles.navLinkAdmin}>
                  Admin
                </a>
              </li>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
