import React, { useState, useEffect } from 'react';
import styles from './Navbar.module.css';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

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
    // Salvar preferência no localStorage, se desejar
  };

  return (
    <header className={`${styles.navbar} ${isScrolled ? styles.scrolled : ''}`}>
      <div className={`${styles.container} container`}>
        <a href="#hero" className={styles.logo}>Ecolote</a>
        <nav className={`${styles.navLinksContainer} ${isMobileMenuOpen ? styles.active : ''}`}>
          <ul className={styles.navLinks}>
            <li><a href="#hero" onClick={() => setIsMobileMenuOpen(false)}>Início</a></li>
            <li><a href="#about" onClick={() => setIsMobileMenuOpen(false)}>Sobre</a></li>
            <li><a href="#features" onClick={() => setIsMobileMenuOpen(false)}>Diferenciais</a></li>
            <li><a href="#how-it-works" onClick={() => setIsMobileMenuOpen(false)}>Funcionamento</a></li>
            <li><a href="#environment" onClick={() => setIsMobileMenuOpen(false)}>Sustentabilidade</a></li>
            <li><a href="#comparison" onClick={() => setIsMobileMenuOpen(false)}>Comparativo</a></li>
            <li><a href="#advantages" onClick={() => setIsMobileMenuOpen(false)}>Vantagens</a></li>
            <li><a href="#innovation" onClick={() => setIsMobileMenuOpen(false)}>Inovação</a></li>
            <li><a href="#payment" onClick={() => setIsMobileMenuOpen(false)}>Pagamento</a></li>
            <li><a href="#contact" onClick={() => setIsMobileMenuOpen(false)}>Contato</a></li>
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
