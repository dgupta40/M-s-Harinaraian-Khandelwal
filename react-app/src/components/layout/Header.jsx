import { useState, useEffect, useRef, useCallback } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Header.css';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const mobileMenuRef = useRef(null);
  const toggleRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  // Handle escape key and body scroll lock
  useEffect(() => {
    if (!isMobileMenuOpen) return;

    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        setIsMobileMenuOpen(false);
        toggleRef.current?.focus();
      }
    };

    document.addEventListener('keydown', handleEscape);
    document.body.style.overflow = 'hidden';

    // Focus first link when menu opens
    const firstLink = mobileMenuRef.current?.querySelector('a');
    firstLink?.focus();

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  // Focus trap for mobile menu
  const handleMenuKeyDown = useCallback((e) => {
    if (e.key !== 'Tab') return;

    const focusableElements = mobileMenuRef.current?.querySelectorAll(
      'a[href], button:not([disabled])'
    );
    if (!focusableElements?.length) return;

    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    if (e.shiftKey && document.activeElement === firstElement) {
      e.preventDefault();
      lastElement.focus();
    } else if (!e.shiftKey && document.activeElement === lastElement) {
      e.preventDefault();
      firstElement.focus();
    }
  }, []);

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/about', label: 'About' },
    { path: '/projects', label: 'Projects' },
    { path: '/services', label: 'Services' },
    { path: '/gallery', label: 'Gallery' },
    { path: '/contact', label: 'Contact' }
  ];

  return (
    <>
      <header className={`header ${isScrolled ? 'header--scrolled' : ''}`}>
        <div className="header__container">
          <Link to="/" className="logo">
            <span className="logo__main">M/S HARINARAYAN</span>
            <span className="logo__sub">Khandelwal</span>
          </Link>

          <nav className="nav">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`nav__link ${location.pathname === link.path ? 'nav__link--active' : ''}`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <Link to="/contact" className="header__cta">
            Get Quote
          </Link>

          <button
            ref={toggleRef}
            className={`mobile-toggle ${isMobileMenuOpen ? 'mobile-toggle--active' : ''}`}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-menu"
          >
            <span className="mobile-toggle__bar" aria-hidden="true" />
            <span className="mobile-toggle__bar" aria-hidden="true" />
          </button>
        </div>
      </header>

      {isMobileMenuOpen && (
        <div
          id="mobile-menu"
          className="mobile-menu"
          ref={mobileMenuRef}
          onKeyDown={handleMenuKeyDown}
          role="dialog"
          aria-modal="true"
          aria-label="Navigation menu"
        >
          <nav className="mobile-menu__nav">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`mobile-menu__link ${location.pathname === link.path ? 'mobile-menu__link--active' : ''}`}
              >
                {link.label}
              </Link>
            ))}
            <Link to="/contact" className="mobile-menu__link mobile-menu__cta">
              Get Quote
            </Link>
          </nav>
        </div>
      )}
    </>
  );
};

export default Header;
