import { useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { services } from '../data/services';
import { projects } from '../data/projects';

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

const Services = () => {
  const location = useLocation();
  const [overviewRef, overviewInView] = useInView({ triggerOnce: true, threshold: 0.1 });

  useEffect(() => {
    if (location.hash) {
      const element = document.querySelector(location.hash);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    }
  }, [location]);

  return (
    <div className="services-page">
      {/* Hero */}
      <section className="services-hero">
        <motion.div
          className="services-hero__content"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <span className="section-label">What We Do</span>
          <h1>Services</h1>
          <p>Comprehensive construction solutions for government infrastructure</p>
        </motion.div>
      </section>

      {/* Overview Grid */}
      <section className="overview-section" ref={overviewRef}>
        <div className="overview-inner">
          <div className="overview-grid">
            {services.map((service, i) => (
              <motion.a
                key={service.id}
                href={`#${service.id}`}
                className="overview-card"
                initial="hidden"
                animate={overviewInView ? "visible" : "hidden"}
                variants={fadeUp}
                transition={{ duration: 0.4, delay: i * 0.1 }}
              >
                <span className="overview-card__count">{service.projectCount}+</span>
                <h3>{service.title}</h3>
                <p>{service.shortDescription}</p>
                <span className="overview-card__link">Learn more</span>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* Service Details */}
      {services.map((service, index) => {
        const relatedProjects = projects
          .filter(p => p.category === service.id)
          .slice(0, 3);

        return (
          <ServiceDetail
            key={service.id}
            service={service}
            relatedProjects={relatedProjects}
            isAlt={index % 2 === 1}
          />
        );
      })}

      <style>{`
        .services-page {
          padding-top: var(--nav-height);
        }

        .section-label {
          display: block;
          font-size: var(--text-micro);
          text-transform: uppercase;
          letter-spacing: var(--tracking-wider);
          color: var(--accent);
          margin-bottom: 12px;
        }

        /* Hero */
        .services-hero {
          background: var(--surface-dark);
          padding: 80px var(--container-padding);
          text-align: center;
        }

        .services-hero__content {
          max-width: 600px;
          margin: 0 auto;
        }

        .services-hero h1 {
          font-size: clamp(48px, 10vw, 80px);
          line-height: var(--leading-hero);
          color: var(--text-light);
          margin-bottom: 16px;
        }

        .services-hero p {
          font-size: var(--text-h3);
          color: var(--text-light-secondary);
          margin: 0;
        }

        /* Overview */
        .overview-section {
          background: var(--surface-light);
          padding: 80px 0;
        }

        .overview-inner {
          max-width: var(--container-wide);
          margin: 0 auto;
          padding: 0 var(--container-padding);
        }

        .overview-grid {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: 24px;
        }

        .overview-card {
          background: var(--white);
          padding: 32px 24px;
          border-radius: var(--radius-md);
          text-decoration: none;
          transition: all var(--transition-fast);
          display: flex;
          flex-direction: column;
        }

        .overview-card:hover {
          box-shadow: var(--shadow-card);
          transform: translateY(-4px);
        }

        .overview-card__count {
          font-family: var(--font-display);
          font-size: 32px;
          color: var(--accent);
          margin-bottom: 16px;
        }

        .overview-card h3 {
          font-family: var(--font-display);
          font-size: var(--text-body);
          color: var(--text-primary);
          margin-bottom: 8px;
          line-height: var(--leading-snug);
        }

        .overview-card p {
          font-size: var(--text-small);
          color: var(--text-secondary);
          line-height: var(--leading-relaxed);
          margin-bottom: auto;
          flex: 1;
        }

        .overview-card__link {
          font-size: var(--text-small);
          color: var(--accent);
          margin-top: 16px;
        }

        /* Service Detail */
        .service-detail {
          padding: 100px 0;
        }

        .service-detail--light {
          background: var(--surface-light);
        }

        .service-detail--dark {
          background: var(--surface-dark);
        }

        .detail-inner {
          max-width: var(--container-wide);
          margin: 0 auto;
          padding: 0 var(--container-padding);
          display: grid;
          grid-template-columns: 1.5fr 1fr;
          gap: 80px;
          align-items: start;
        }

        .detail-header {
          margin-bottom: 24px;
        }

        .detail-header .section-label {
          color: var(--accent);
        }

        .service-detail--light .detail-header h2 {
          font-size: var(--text-h1);
          color: var(--text-primary);
          line-height: var(--leading-tight);
        }

        .service-detail--dark .detail-header h2 {
          font-size: var(--text-h1);
          color: var(--text-light);
          line-height: var(--leading-tight);
        }

        .service-detail--light .detail-desc {
          font-size: var(--text-body);
          color: var(--text-secondary);
          line-height: var(--leading-relaxed);
          margin-bottom: 32px;
        }

        .service-detail--dark .detail-desc {
          font-size: var(--text-body);
          color: var(--text-light-secondary);
          line-height: var(--leading-relaxed);
          margin-bottom: 32px;
        }

        .highlights {
          margin-bottom: 32px;
        }

        .highlights h4 {
          font-family: var(--font-display);
          font-size: var(--text-micro);
          text-transform: uppercase;
          letter-spacing: var(--tracking-wide);
          color: var(--accent);
          margin-bottom: 16px;
        }

        .highlights ul {
          list-style: none;
          margin: 0;
          padding: 0;
        }

        .highlights li {
          padding: 12px 0;
          padding-left: 24px;
          position: relative;
          font-size: var(--text-body);
          line-height: var(--leading-normal);
        }

        .service-detail--light .highlights li {
          color: var(--text-primary);
          border-bottom: 1px solid rgba(0, 0, 0, 0.05);
        }

        .service-detail--dark .highlights li {
          color: var(--text-light);
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }

        .highlights li:last-child {
          border-bottom: none;
        }

        .highlights li::before {
          content: '+';
          position: absolute;
          left: 0;
          color: var(--accent);
          font-weight: 600;
        }

        .stat-badge {
          display: inline-flex;
          flex-direction: column;
          padding: 24px 32px;
          border-radius: var(--radius-md);
        }

        .service-detail--light .stat-badge {
          background: var(--surface-dark);
        }

        .service-detail--dark .stat-badge {
          background: rgba(255, 255, 255, 0.05);
        }

        .stat-badge__num {
          font-family: var(--font-display);
          font-size: 48px;
          color: var(--text-light);
          line-height: 1;
        }

        .stat-badge__txt {
          font-size: var(--text-micro);
          color: var(--text-light-tertiary);
          text-transform: uppercase;
          letter-spacing: var(--tracking-wide);
          margin-top: 8px;
        }

        /* Related Projects */
        .related-projects h4 {
          font-family: var(--font-display);
          font-size: var(--text-micro);
          text-transform: uppercase;
          letter-spacing: var(--tracking-wide);
          margin-bottom: 20px;
        }

        .service-detail--light .related-projects h4 {
          color: var(--text-tertiary);
        }

        .service-detail--dark .related-projects h4 {
          color: var(--text-light-tertiary);
        }

        .projects-list {
          display: flex;
          flex-direction: column;
          gap: 12px;
          margin-bottom: 24px;
        }

        .related-item {
          padding: 20px;
          border-radius: var(--radius-md);
          transition: all var(--transition-fast);
        }

        .service-detail--light .related-item {
          background: var(--white);
        }

        .service-detail--dark .related-item {
          background: rgba(255, 255, 255, 0.05);
        }

        .service-detail--light .related-item:hover {
          box-shadow: var(--shadow-card);
        }

        .service-detail--dark .related-item:hover {
          background: rgba(255, 255, 255, 0.08);
        }

        .related-item h5 {
          font-family: var(--font-display);
          font-size: var(--text-small);
          margin-bottom: 4px;
          line-height: var(--leading-snug);
        }

        .service-detail--light .related-item h5 {
          color: var(--text-primary);
        }

        .service-detail--dark .related-item h5 {
          color: var(--text-light);
        }

        .related-item__client {
          display: block;
          font-size: var(--text-micro);
          margin-bottom: 8px;
        }

        .service-detail--light .related-item__client {
          color: var(--text-tertiary);
        }

        .service-detail--dark .related-item__client {
          color: var(--text-light-tertiary);
        }

        .related-item__value {
          font-family: var(--font-display);
          font-size: var(--text-small);
          color: var(--accent);
        }

        .view-all-link {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-size: var(--text-small);
          color: var(--accent);
          text-decoration: none;
          padding: 10px 20px;
          border: 1px solid var(--accent);
          border-radius: var(--radius-pill);
          transition: all var(--transition-fast);
        }

        .view-all-link:hover {
          background: var(--accent);
          color: var(--surface-dark);
        }

        @media (max-width: 1200px) {
          .overview-grid {
            grid-template-columns: repeat(3, 1fr);
          }
        }

        @media (max-width: 1024px) {
          .detail-inner {
            grid-template-columns: 1fr;
            gap: 48px;
          }
        }

        @media (max-width: 768px) {
          .overview-grid {
            grid-template-columns: repeat(2, 1fr);
          }

          .service-detail {
            padding: 64px 0;
          }
        }

        @media (max-width: 480px) {
          .overview-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
};

// Separate component for service detail with its own useInView
const ServiceDetail = ({ service, relatedProjects, isAlt }) => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const bgClass = isAlt ? 'service-detail--dark' : 'service-detail--light';

  return (
    <section
      id={service.id}
      className={`service-detail ${bgClass}`}
      ref={ref}
    >
      <div className="detail-inner">
        <motion.div
          className="detail-text"
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={fadeUp}
          transition={{ duration: 0.5 }}
        >
          <div className="detail-header">
            <span className="section-label">{service.projectCount}+ Projects</span>
            <h2>{service.title}</h2>
          </div>
          <p className="detail-desc">{service.description}</p>

          <div className="highlights">
            <h4>What We Offer</h4>
            <ul>
              {service.highlights.map((h, i) => (
                <li key={i}>{h}</li>
              ))}
            </ul>
          </div>

          <div className="stat-badge">
            <span className="stat-badge__num">{service.projectCount}+</span>
            <span className="stat-badge__txt">Projects Completed</span>
          </div>
        </motion.div>

        <motion.div
          className="related-projects"
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={fadeUp}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h4>Related Projects</h4>
          <div className="projects-list">
            {relatedProjects.map(p => (
              <div key={p.id} className="related-item">
                <h5>{p.title}</h5>
                <span className="related-item__client">{p.client}</span>
                <span className="related-item__value">
                  {p.value === 'Private' ? 'Private' : `₹${p.value} Cr`}
                </span>
              </div>
            ))}
          </div>
          <Link to={`/projects?category=${service.id}`} className="view-all-link">
            View All Projects
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default Services;
