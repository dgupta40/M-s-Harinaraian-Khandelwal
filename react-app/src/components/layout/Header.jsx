import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Header.css';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

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
            className={`mobile-toggle ${isMobileMenuOpen ? 'mobile-toggle--active' : ''}`}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <span className="mobile-toggle__bar" />
            <span className="mobile-toggle__bar" />
          </button>
        </div>
      </header>

      {isMobileMenuOpen && (
        <div className="mobile-menu">
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
