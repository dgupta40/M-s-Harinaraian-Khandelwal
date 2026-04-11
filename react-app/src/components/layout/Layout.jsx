import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

const Layout = ({ children }) => {
  const { pathname } = useLocation();

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className="layout">
      <a href="#main-content" className="skip-to-content">
        Skip to main content
      </a>
      <Header />
      <main id="main-content" className="main-content">
        {children}
      </main>
      <Footer />

      <style>{`
        .layout {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
        }

        .main-content {
          flex: 1;
        }
      `}</style>
    </div>
  );
};

export default Layout;
