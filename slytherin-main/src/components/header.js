import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import styles from '../styles/navbar.module.css';

/**
 * Navigation link item component
 */
const NavLink = ({ href, label, isActive, onClick, className }) => (
  <a
    href={href}
    className={`${className} ${isActive ? styles.active : ''}`}
    onClick={onClick}
  >
    {label}
  </a>
);

NavLink.propTypes = {
  href: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  isActive: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
  className: PropTypes.string.isRequired,
};

/**
 * Main Navbar component
 */
const Navbar = ({ brandName = 'slytherin' }) => {
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const [activeLink, setActiveLink] = useState('#home');
  const [isScrolled, setIsScrolled] = useState(false);

  // Navigation links configuration
  const navLinks = [
    { href: '#home', label: 'Home' },
    { href: '#about', label: 'About' },
    { href: '#library', label: 'HogwartsLibrary' },
    { href: '#blog', label: 'Events' },
    { href: '#games', label: 'WizardGames' },
    { href: '#contact', label: 'Contact' },
  ];

  /**
   * Toggle mobile navigation menu
   */
  const toggleMobileNav = useCallback(() => {
    setIsMobileNavOpen((prevState) => !prevState);
    document.body.style.overflow = isMobileNavOpen ? 'auto' : 'hidden';
  }, [isMobileNavOpen]);

  /**
   * Handle navigation link click
   */
  const handleLinkClick = useCallback(
    (e, href) => {
      e.preventDefault();
      const element = document.querySelector(href);

      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        setActiveLink(href);

        if (isMobileNavOpen) {
          toggleMobileNav();
        }
      }
    },
    [isMobileNavOpen, toggleMobileNav]
  );

  /**
   * Handle scroll event
   */
  const handleScroll = useCallback(() => {
    setIsScrolled(window.scrollY > 30);
  }, []);

  useEffect(() => {
    // Handle escape key for mobile navigation
    const handleEscKey = (e) => {
      if (e.key === 'Escape' && isMobileNavOpen) {
        toggleMobileNav();
      }
    };

    // Add event listeners
    document.addEventListener('keydown', handleEscKey);
    window.addEventListener('scroll', handleScroll);

    // Initial scroll check
    handleScroll();

    // Clean up event listeners
    return () => {
      document.removeEventListener('keydown', handleEscKey);
      window.removeEventListener('scroll', handleScroll);
      document.body.style.overflow = 'auto';
    };
  }, [isMobileNavOpen, toggleMobileNav, handleScroll]);

  return (
    <header className={`${styles.header} ${isScrolled ? styles.scrolled : ''}`}>
      <div
        className={`${styles.headerContainer} ${
          isScrolled ? styles.headerContainerScrolled : ''
        }`}
      >
        <a href="/" className={styles.logo} aria-label="Home">
          <span className={styles.logoText}>{brandName}</span>
        </a>

        {/* Desktop Navigation */}
        <nav className={styles.nav} aria-label="Primary navigation">
          {navLinks.map(({ href, label }) => (
            <NavLink
              key={href}
              href={href}
              label={label}
              isActive={activeLink === href}
              onClick={(e) => handleLinkClick(e, href)}
              className={styles.navLink}
            />
          ))}
        </nav>

        {/* Mobile Menu Button */}
        <button
          className={styles.mobileMenuButton}
          onClick={toggleMobileNav}
          aria-label="Toggle mobile menu"
          aria-expanded={isMobileNavOpen}
          aria-controls="mobile-menu"
        >
          {isMobileNavOpen ? (
            <i className="fa-solid fa-xmark" aria-hidden="true"></i>
          ) : (
            <i className="fa-solid fa-bars" aria-hidden="true"></i>
          )}
        </button>
      </div>

      {/* Mobile Navigation */}
      <div
        id="mobile-menu"
        className={`${styles.mobileNav} ${isMobileNavOpen ? styles.open : ''}`}
        aria-hidden={!isMobileNavOpen}
      >
        <div className={styles.mobileNavHeader}>
          <a href="/" className={styles.logo} aria-label="Home">
            <span className={styles.logoText}>{brandName}</span>
          </a>
          <button
            className={styles.mobileNavClose}
            onClick={toggleMobileNav}
            aria-label="Close mobile menu"
          >
            <i className="fa-solid fa-xmark" aria-hidden="true"></i>
          </button>
        </div>

        <nav className={styles.mobileNavLinks} aria-label="Mobile navigation">
          {navLinks.map(({ href, label }) => (
            <NavLink
              key={href}
              href={href}
              label={label}
              isActive={activeLink === href}
              onClick={(e) => handleLinkClick(e, href)}
              className={styles.mobileNavLink}
            />
          ))}
        </nav>
      </div>

      {/* Overlay for mobile navigation */}
      {isMobileNavOpen && (
        <div
          className={styles.overlay}
          onClick={toggleMobileNav}
          aria-hidden="true"
          role="presentation"
        />
      )}
    </header>
  );
};

Navbar.propTypes = {
  brandName: PropTypes.string,
};

export default Navbar;