import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/about', label: 'About' },
    { path: '/projects', label: 'Projects' },
    { path: '/services', label: 'Services' },
    { path: '/gallery', label: 'Gallery' },
    { path: '/contact', label: 'Contact' }
  ];

  const services = [
    'Railway Infrastructure',
    'Government Buildings',
    'Educational Facilities',
    'Healthcare Projects',
    'Smart City Projects'
  ];

  return (
    <footer className="footer">
      <div className="footer__main">
        <div className="footer__brand">
          <h2>M/S Harinarayan Khandelwal</h2>
          <p>Building Rajasthan's Infrastructure Since 1995</p>
        </div>

        <div className="footer__grid">
          <div className="footer__col">
            <h4>Navigation</h4>
            <nav>
              {navLinks.map((link) => (
                <Link key={link.path} to={link.path}>{link.label}</Link>
              ))}
            </nav>
          </div>

          <div className="footer__col">
            <h4>Services</h4>
            <nav>
              {services.map((service) => (
                <Link key={service} to="/services">{service}</Link>
              ))}
            </nav>
          </div>

          <div className="footer__col">
            <h4>Contact</h4>
            <address className="footer__address">
              <p>A-1 Koolwal Bhawan</p>
              <p>Janta Colony, Jaipur 302004</p>
              <p className="footer__spacer" />
              <p><a href="tel:+919829015856">+91 9829015856</a></p>
              <p><a href="mailto:harinaraiankhandelwal@gmail.com">harinaraiankhandelwal@gmail.com</a></p>
            </address>
          </div>
        </div>
      </div>

      <div className="footer__bottom">
        <p>© {currentYear} M/S Harinarayan Khandelwal & Contractors</p>
      </div>

      <style>{`
        .footer {
          background: var(--surface-dark);
          color: var(--text-light);
        }

        .footer__main {
          max-width: var(--container-wide);
          margin: 0 auto;
          padding: 64px var(--container-padding);
          display: grid;
          grid-template-columns: 1fr 2fr;
          gap: 64px;
        }

        .footer__brand h2 {
          font-family: var(--font-display);
          font-size: var(--text-body);
          font-weight: 400;
          margin-bottom: 8px;
          letter-spacing: var(--tracking-tight);
        }

        .footer__brand p {
          font-size: var(--text-small);
          color: var(--text-light-tertiary);
          margin: 0;
        }

        .footer__grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 32px;
        }

        .footer__col h4 {
          font-family: var(--font-display);
          font-size: var(--text-micro);
          text-transform: uppercase;
          letter-spacing: var(--tracking-wider);
          margin-bottom: 20px;
          color: var(--accent);
        }

        .footer__col nav {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .footer__col a,
        .footer__col p {
          font-size: var(--text-small);
          color: var(--text-light-secondary);
          text-decoration: none;
          transition: color var(--transition-fast);
          margin: 0;
        }

        .footer__col a:hover {
          color: var(--text-light);
        }

        .footer__col a:focus-visible {
          outline: 2px solid var(--accent);
          outline-offset: 2px;
        }

        .footer__address {
          font-style: normal;
        }

        .footer__spacer {
          height: 8px;
        }

        .footer__bottom {
          border-top: 1px solid rgba(255, 255, 255, 0.1);
          padding: 24px var(--container-padding);
          text-align: center;
        }

        .footer__bottom p {
          font-size: var(--text-micro);
          color: var(--text-light-tertiary);
          margin: 0;
        }

        @media (max-width: 1024px) {
          .footer__main {
            grid-template-columns: 1fr;
            gap: 48px;
          }
        }

        @media (max-width: 768px) {
          .footer__main {
            padding: 48px var(--container-padding);
          }

          .footer__grid {
            grid-template-columns: 1fr;
            gap: 32px;
          }

          .footer__brand h2 {
            font-size: var(--text-small);
          }
        }
      `}</style>
    </footer>
  );
};

export default Footer;
