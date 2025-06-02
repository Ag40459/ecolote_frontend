import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
// Use the rewritten CSS module
import styles from './Navbar.module.css'; 

const themes = [
  { name: 'light', displayName: 'Claro', logoName: 'Ecolote Sol' }, 
  { name: 'dark', displayName: 'Escuro', logoName: 'Ecolote Noite' },
  { name: 'nature', displayName: 'Natureza', logoName: 'Ecolote Flora' },
  { name: 'ocean', displayName: 'Oceano', logoName: 'Ecolote Mar' },
  { name: 'fire', displayName: 'Fogo', logoName: 'Ecolote Chama' },
];

// Function to apply theme class to body 
const applyTheme = (themeName) => {
  // Clear existing theme classes more robustly
  document.body.className = document.body.className
    .split(' ')
    .filter(cls => !themes.some(t => `theme-${t.name}` === cls) && cls !== 'dark-theme') // Remove theme- prefixed and dark-theme
    .join(' ');

  // Add the new theme class (handle light as default/no class or add theme-light if needed)
  if (themeName !== 'light') { // Assuming 'light' theme doesn't need a specific class, or adjust if it does
     const themeClass = themeName === 'dark' ? 'dark-theme' : `theme-${themeName}`; // Use theme- prefix for consistency except dark
     document.body.classList.add(themeClass);
  }
  // Store the theme preference
  localStorage.setItem('theme', themeName);
};


const Navbar = ({ openAuthModal }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  // Initialize theme from localStorage or default to 'dark'
  const [currentTheme, setCurrentTheme] = useState(() => {
      const savedTheme = localStorage.getItem('theme');
      // Validate saved theme against available themes
      return themes.some(t => t.name === savedTheme) ? savedTheme : 'dark';
  });
  const [isThemeMenuOpen, setIsThemeMenuOpen] = useState(false);
  const [themeChangeMessage, setThemeChangeMessage] = useState('');
  // Add state for the dynamic logo name
  const [currentLogoName, setCurrentLogoName] = useState('');
  const { admin, logout } = useAuth();
  const navigate = useNavigate();
  const themeMenuToggleRef = useRef(null);
  const navContainerRef = useRef(null);
  const menuToggleRef = useRef(null);
  const messageTimeoutRef = useRef(null);

  // Apply theme and set initial logo name on mount and when theme changes
  useEffect(() => {
    applyTheme(currentTheme);
    const themeData = themes.find(t => t.name === currentTheme);
    setCurrentLogoName('Ecolote'); 
  }, [currentTheme]);

  const handleScroll = useCallback(() => {
    setIsScrolled(window.scrollY > 50);
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  const toggleMenu = useCallback(() => {
    setIsMenuOpen(prev => {
      const nextState = !prev;
      if (window.innerWidth <= 992) {
        document.body.style.overflow = nextState ? 'hidden' : '';
      }
      return nextState;
    });
    setIsThemeMenuOpen(false); // Close theme menu when main menu toggles
  }, []);

  const closeMenu = useCallback(() => {
    setIsMenuOpen(false);
    setIsThemeMenuOpen(false);
    if (window.innerWidth <= 992) {
        document.body.style.overflow = '';
    }
  }, []);

  // Function to handle theme selection from the menu
  const handleThemeChange = (themeName) => {
    setCurrentTheme(themeName);
    // applyTheme is called by the useEffect hook for currentTheme
    if (themeMenuToggleRef.current) {
      themeMenuToggleRef.current.focus(); // Keep focus logic if needed
    }
    setIsThemeMenuOpen(false); // Close theme submenu
    closeMenu(); // Close main menu as well
  };

  // Function to handle theme change on logo click (cycle themes)
  const handleLogoClick = (e) => {
    e.preventDefault();
    closeMenu(); // Close menu if open

    const currentIndex = themes.findIndex(t => t.name === currentTheme);
    const nextIndex = (currentIndex + 1) % themes.length;
    const nextTheme = themes[nextIndex];

    setCurrentTheme(nextTheme.name); // Update theme state -> triggers useEffect
    setThemeChangeMessage(`Tema: ${nextTheme.displayName}`); // Show message

    // Clear previous timeout if exists
    if (messageTimeoutRef.current) {
      clearTimeout(messageTimeoutRef.current);
    }

    // Set timeout to clear message
    messageTimeoutRef.current = setTimeout(() => {
      setThemeChangeMessage('');
    }, 2500); // Matches CSS animation duration
  };

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (messageTimeoutRef.current) {
        clearTimeout(messageTimeoutRef.current);
      }
      // Ensure body overflow is reset if component unmounts while menu is open
      document.body.style.overflow = '';
    };
  }, []);

  const toggleThemeMenu = (e) => {
    e.stopPropagation(); // Prevent closing main menu if theme menu is inside
    setIsThemeMenuOpen(prev => !prev);
  };

  const handleLogout = () => {
    logout();
    closeMenu();
    navigate('/');
  };

  const handleAdminAreaClick = (e) => {
    e.preventDefault();
    if (openAuthModal) {
      openAuthModal();
    }
    closeMenu();
  };

  // Click outside handler for closing menus
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Close main menu (mobile sidebar)
      if (isMenuOpen && navContainerRef.current && !navContainerRef.current.contains(event.target) && menuToggleRef.current && !menuToggleRef.current.contains(event.target)) {
         closeMenu();
      }
      // Close theme submenu (desktop dropdown)
      if (isThemeMenuOpen && themeMenuToggleRef.current && !themeMenuToggleRef.current.contains(event.target) && navContainerRef.current && !navContainerRef.current.contains(event.target)) {
         // Check if click is outside the submenu itself too
         const submenu = document.getElementById('theme-submenu');
         if (submenu && !submenu.contains(event.target)) {
            setIsThemeMenuOpen(false);
         }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isMenuOpen, isThemeMenuOpen, closeMenu]); // Added isThemeMenuOpen dependency

  const currentThemeDisplayName = themes.find(t => t.name === currentTheme)?.displayName || 'Tema';

  return (
    // Apply scrolled class based on state
    <header className={`${styles.navbar} ${isScrolled ? styles.scrolled : ''}`}>
      {/* Mobile menu overlay */}
      {isMenuOpen && window.innerWidth <= 992 && (
        <div
          className={`${styles.menuOverlay} ${isMenuOpen ? styles.active : ''}`}
          onClick={closeMenu}
          aria-hidden="true"
        />
      )}

      {/* Main container for logo, button */}
      <div className={`${styles.container} container`}>
        {/* Logo Area: Contains Logo and Theme Message */}
        <div className={styles.logoAreaContainer}>
          <a href="#" className={styles.logo} onClick={handleLogoClick}>
            {currentLogoName} {/* Use dynamic logo name */}
          </a>
          {/* Theme change message appears below logo due to flex-direction: column */}
          {themeChangeMessage && (
            <span className={styles.themeChangeMessage}>{themeChangeMessage}</span>
          )}
        </div>

        {/* Hamburger Menu Toggle Button */}
        <button
          ref={menuToggleRef}
          className={styles.menuToggle}
          id="menu-toggle"
          aria-label={isMenuOpen ? "Fechar menu" : "Abrir menu"}
          aria-expanded={isMenuOpen}
          aria-controls="navLinksContainer"
          onClick={toggleMenu}
        >
          <div className={`${styles.hamburgerIcon} ${isMenuOpen ? styles.open : ''}`}>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </button>
      </div>

      {/* Navigation Links Container (Desktop Dropdown / Mobile Sidebar) */}
      <nav
        ref={navContainerRef}
        id="navLinksContainer"
        className={`${styles.navLinksContainer} ${isMenuOpen ? styles.active : ''}`}
        aria-hidden={!isMenuOpen} // Hide from screen readers when closed
      >
        {/* Header for Mobile Sidebar */}
        <div className={styles.mobileMenuHeader}>
          <span className={styles.mobileMenuTitle}>Menu</span>
          {/* Optional: Add a close button inside mobile header if needed */}
        </div>

        {/* List of Navigation Links */}
        <ul className={styles.navLinks}>
          {/* Standard Links */}
          <li><a href="#hero" onClick={closeMenu}>Início</a></li>
          <li><a href="#about" onClick={closeMenu}>Sobre</a></li>
          <li><a href="#features" onClick={closeMenu}>Diferenciais</a></li>
          <li><a href="#how-it-works" onClick={closeMenu}>Funcionamento</a></li>
          <li><a href="#simulation" onClick={closeMenu}>Simulação</a></li>
          <li><a href="#payment" onClick={closeMenu}>Pagamento</a></li>
          <li><a href="#contact" onClick={closeMenu}>Contato</a></li>

          {/* Conditional Admin Links */}
          {admin ? (
            <>
              <li><Link to="/admin/dashboard" onClick={closeMenu}>Dashboard</Link></li>
              <li><Link to="/admin/register" onClick={closeMenu}>Admin</Link></li>
              <li><button onClick={handleLogout} className={styles.navButtonLogout}>Sair</button></li>
            </>
          ) : (
            <li>
              <a href="#" onClick={handleAdminAreaClick} className={styles.navLinkAdmin}>
                Admin
              </a>
            </li>
          )}

          {/* Theme Selection Menu */}
          <li className={`${styles.themeMenuContainer} ${isThemeMenuOpen ? styles.open : ''}`}>
            <button
              ref={themeMenuToggleRef}
              className={styles.themeMenuToggle}
              onClick={toggleThemeMenu}
              aria-haspopup="true" // Indicate it controls a menu
              aria-expanded={isThemeMenuOpen}
              aria-controls="theme-submenu"
              id="theme-menu-toggle" // Added ID for aria-labelledby
            >
              Tema: {currentThemeDisplayName}
              <span className={styles.arrowIcon} aria-hidden="true"></span>
            </button>
            {/* Theme Submenu */}
            <ul
              id="theme-submenu"
              className={styles.themeSubmenu}
              role="menu" // Role for accessibility
              aria-labelledby="theme-menu-toggle" // Reference the button that controls it
              aria-hidden={!isThemeMenuOpen}
            >
              {themes.map(theme => (
                <li key={theme.name} role="none"> {/* Role 'none' on li containing menuitem */}
                  <button
                    onClick={() => handleThemeChange(theme.name)}
                    className={currentTheme === theme.name ? styles.activeTheme : ''}
                    role="menuitemradio" // Correct role for theme selection
                    aria-checked={currentTheme === theme.name}
                  >
                    {theme.displayName}
                  </button>
                </li>
              ))}
            </ul>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;