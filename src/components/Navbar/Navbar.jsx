if (!localStorage.getItem('theme')) {
  localStorage.setItem('theme', 'dark');
  document.body.classList.add('dark-theme');
} else if (localStorage.getItem('theme') === 'dark') {
  document.body.classList.add('dark-theme');
}

import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import styles from './Navbar.module.css';

const Navbar = ({ openAuthModal }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
    const [isDarkTheme, setIsDarkTheme] = useState(true);
  const { admin, logout } = useAuth();
  const navigate = useNavigate();

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

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

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

  const handleThemeToggle = () => {
    document.body.classList.toggle('dark-theme');
  };

  const handleLogout = () => {
    logout();
    setIsMobileMenuOpen(false);
    navigate('/');
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const handleAdminAreaClick = (e) => {
    e.preventDefault(); // Prevenir navegação padrão se for um link
    if (openAuthModal) {
        openAuthModal();
    }
    closeMobileMenu();
  };

  return (
    <header className={`${styles.navbar} ${isScrolled ? styles.scrolled : ''}`}>
      <div className={`${styles.container} container`}>
        <a href="#hero" className={styles.logo} onClick={closeMobileMenu}>Ecolote</a>
        <nav className={`${styles.navLinksContainer} ${isMobileMenuOpen ? styles.active : ''}`}>
          <ul className={styles.navLinks}>
            <li><a href="#hero" onClick={closeMobileMenu}>Início</a></li>
            <li><a href="#about" onClick={closeMobileMenu}>Sobre</a></li>
            <li><a href="#features" onClick={closeMobileMenu}>Diferenciaiss</a></li>
            <li><a href="#how-it-works" onClick={closeMobileMenu}>Funcionamento</a></li>
            <li><a href="#environment" onClick={closeMobileMenu}>Sustentabilidade</a></li>
            <li><a href="#comparison" onClick={closeMobileMenu}>Comparativo</a></li>
            <li><a href="#innovation" onClick={closeMobileMenu}>Inovação</a></li>
            <li><a href="#payment" onClick={closeMobileMenu}>Pagamento</a></li>
            <li><a href="#contact" onClick={closeMobileMenu}>Contato</a></li>
            {admin ? (
              <>
                <li><Link to="/admin/dashboard" onClick={closeMobileMenu}>Dashboard</Link></li>
                {/* O link para cadastrar novo admin pode ser movido para dentro do dashboard ou removido 
                    se o cadastro for apenas via modal inicial e não por admin logado. 
                    Por ora, manterei, mas pode ser um ponto de ajuste futuro. */}
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
        <button onClick={handleThemeToggle} className={styles.themeToggleButton} aria-label="Alternar tema">
          🌙
        </button>
        <button className={styles.menuToggle} id="menu-toggle" aria-label="Abrir menu" onClick={toggleMobileMenu}>
          {isMobileMenuOpen ? '✕' : '☰'}
        </button>
      </div>
    </header>
  );
};

export default Navbar;

