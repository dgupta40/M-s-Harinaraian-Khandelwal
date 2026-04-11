import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { getFeaturedProjects } from '../data/projects';
import { clients } from '../data/financials';

// Animation variants
const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

const stagger = {
  visible: {
    transition: { staggerChildren: 0.1 }
  }
};

// Hero - Full viewport, centered, cinematic
const Hero = () => {
  return (
    <section className="hero">
      <div className="hero__content">
        <motion.span
          className="hero__label"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
        >
          Government-Proven • Private-Ready
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          Build With
          <br />
          <span className="hero__accent">Confidence</span>
        </motion.h1>

        <motion.p
          className="hero__sub"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Three decades of government infrastructure experience.
          <br />
          Now available for your private projects.
        </motion.p>

        <motion.div
          className="hero__actions"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Link to="/contact" className="btn btn--primary">
            Get Free Quote
          </Link>
          <Link to="/projects" className="btn btn--outline">
            View Projects
          </Link>
        </motion.div>
      </div>

      <style>{`
        .hero {
          min-height: 100vh;
          background: var(--surface-dark);
          display: flex;
          align-items: center;
          justify-content: center;
          text-align: center;
          padding: calc(var(--nav-height) + 60px) var(--container-padding) 60px;
        }

        .hero__content {
          max-width: 800px;
        }

        .hero__label {
          display: inline-block;
          font-size: var(--text-micro);
          text-transform: uppercase;
          letter-spacing: var(--tracking-wider);
          color: var(--accent);
          margin-bottom: 24px;
        }

        .hero h1 {
          font-size: clamp(48px, 10vw, 80px);
          line-height: var(--leading-hero);
          letter-spacing: var(--tracking-tight);
          color: var(--text-light);
          margin-bottom: 24px;
        }

        .hero__accent {
          color: var(--accent);
        }

        .hero__sub {
          font-size: var(--text-h3);
          line-height: var(--leading-normal);
          color: var(--text-light-secondary);
          margin-bottom: 40px;
        }

        .hero__actions {
          display: flex;
          justify-content: center;
          gap: 16px;
        }

        /* Button styles */
        .btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          font-family: var(--font-body);
          font-size: var(--text-body);
          font-weight: 400;
          padding: 12px 24px;
          border-radius: var(--radius-pill);
          text-decoration: none;
          transition: all var(--transition-fast);
        }

        .btn--primary {
          background: var(--accent);
          color: var(--surface-dark);
        }

        .btn--primary:hover {
          background: var(--accent-hover);
        }

        .btn--outline {
          background: transparent;
          color: var(--text-light);
          border: 1px solid rgba(255, 255, 255, 0.4);
        }

        .btn--outline:hover {
          border-color: var(--text-light);
        }

        @media (max-width: 768px) {
          .hero__actions {
            flex-direction: column;
            gap: 12px;
          }

          .hero__sub br {
            display: none;
          }
        }
      `}</style>
    </section>
  );
};

// Stats Strip - Metrics moved from hero
const StatsStrip = () => {
  const stats = [
    { value: '30+', label: 'Years' },
    { value: '₹300Cr+', label: 'Projects' },
    { value: '50+', label: 'Completed' },
    { value: '5', label: 'Sectors' }
  ];

  return (
    <section className="stats">
      <div className="stats__inner">
        {stats.map((stat, i) => (
          <div key={i} className="stats__item">
            <span className="stats__value">{stat.value}</span>
            <span className="stats__label">{stat.label}</span>
          </div>
        ))}
      </div>

      <style>{`
        .stats {
          background: var(--accent);
          padding: 24px 0;
        }

        .stats__inner {
          max-width: var(--container-wide);
          margin: 0 auto;
          padding: 0 var(--container-padding);
          display: flex;
          justify-content: center;
          gap: 48px;
        }

        .stats__item {
          display: flex;
          align-items: baseline;
          gap: 8px;
        }

        .stats__value {
          font-family: var(--font-display);
          font-size: 24px;
          color: var(--surface-dark);
        }

        .stats__label {
          font-size: var(--text-micro);
          text-transform: uppercase;
          letter-spacing: var(--tracking-wide);
          color: var(--surface-dark);
          opacity: 0.8;
        }

        @media (max-width: 768px) {
          .stats__inner {
            flex-wrap: wrap;
            gap: 24px 40px;
          }
        }
      `}</style>
    </section>
  );
};

// Services Section - Light background
const ServicesSection = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  const services = [
    { title: 'Commercial', desc: 'Offices, retail spaces, warehouses' },
    { title: 'Residential', desc: 'Villas, apartments, housing complexes' },
    { title: 'Industrial', desc: 'Factories, workshops, storage units' },
    { title: 'Institutional', desc: 'Schools, hospitals, community centers' },
    { title: 'Renovation', desc: 'Upgrades, expansions, modernization' }
  ];

  return (
    <section className="services" ref={ref}>
      <div className="services__inner">
        <span className="section-label">For Private Clients</span>
        <h2>What We Build</h2>

        <motion.div
          className="services__grid"
          variants={stagger}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {services.map((service, i) => (
            <motion.div
              key={i}
              className="services__item"
              variants={fadeUp}
              transition={{ duration: 0.4 }}
            >
              <h3>{service.title}</h3>
              <p>{service.desc}</p>
            </motion.div>
          ))}
        </motion.div>

        <p className="services__footer">
          The same standards that build railway stations and government complexes.
        </p>
      </div>

      <style>{`
        .services {
          background: var(--surface-light);
          padding: 100px 0;
        }

        .services__inner {
          max-width: var(--container-max);
          margin: 0 auto;
          padding: 0 var(--container-padding);
        }

        .section-label {
          display: block;
          font-size: var(--text-micro);
          text-transform: uppercase;
          letter-spacing: var(--tracking-wider);
          color: var(--accent);
          margin-bottom: 12px;
        }

        .services h2 {
          font-size: var(--text-h1);
          line-height: var(--leading-tight);
          color: var(--text-primary);
          margin-bottom: 48px;
        }

        .services__grid {
          display: flex;
          flex-direction: column;
          border-top: 1px solid rgba(0, 0, 0, 0.1);
        }

        .services__item {
          display: flex;
          align-items: baseline;
          gap: 24px;
          padding: 24px 0;
          border-bottom: 1px solid rgba(0, 0, 0, 0.1);
        }

        .services__item h3 {
          font-family: var(--font-display);
          font-size: var(--text-h2);
          line-height: var(--leading-snug);
          color: var(--text-primary);
          min-width: 200px;
        }

        .services__item p {
          font-size: var(--text-body);
          color: var(--text-tertiary);
          margin: 0;
        }

        .services__footer {
          margin-top: 48px;
          font-size: var(--text-body);
          color: var(--text-tertiary);
        }

        @media (max-width: 768px) {
          .services__item {
            flex-direction: column;
            gap: 8px;
          }

          .services__item h3 {
            min-width: auto;
          }
        }
      `}</style>
    </section>
  );
};

// Featured Projects - Dark background
const FeaturedProjects = () => {
  const projects = getFeaturedProjects().slice(0, 4);
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section className="projects" ref={ref}>
      <div className="projects__inner">
        <div className="projects__header">
          <div>
            <span className="section-label section-label--light">Track Record</span>
            <h2>Projects That Prove Our Capability</h2>
          </div>
          <Link to="/projects" className="link-pill">
            View All →
          </Link>
        </div>

        <motion.div
          className="projects__grid"
          variants={stagger}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {projects.map((project, index) => (
            <motion.article
              key={project.id}
              className="project-card"
              variants={fadeUp}
              transition={{ duration: 0.4 }}
            >
              <div className="project-card__image">
                <span className="project-card__initial">
                  {project.category.charAt(0).toUpperCase()}
                </span>
              </div>
              <div className="project-card__body">
                <span className="project-card__category">{project.category}</span>
                <h3>{project.title}</h3>
                <p>{project.client}</p>
                <div className="project-card__meta">
                  <span className="project-card__value">₹{project.value} Cr</span>
                  <span className={`project-card__status project-card__status--${project.status}`}>
                    {project.status}
                  </span>
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>

      <style>{`
        .projects {
          background: var(--surface-dark);
          padding: 100px 0;
        }

        .projects__inner {
          max-width: var(--container-wide);
          margin: 0 auto;
          padding: 0 var(--container-padding);
        }

        .projects__header {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          margin-bottom: 48px;
        }

        .section-label--light {
          color: var(--accent);
        }

        .projects h2 {
          color: var(--text-light);
          font-size: var(--text-h1);
          line-height: var(--leading-tight);
          max-width: 500px;
        }

        .link-pill {
          font-size: var(--text-small);
          color: var(--accent);
          border: 1px solid var(--accent);
          padding: 8px 20px;
          border-radius: var(--radius-pill);
          text-decoration: none;
          transition: all var(--transition-fast);
        }

        .link-pill:hover {
          background: var(--accent);
          color: var(--surface-dark);
        }

        .projects__grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 24px;
        }

        .project-card {
          background: #1a1a1a;
          border-radius: var(--radius-md);
          overflow: hidden;
        }

        .project-card__image {
          height: 200px;
          background: #0a0a0a;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .project-card__initial {
          font-family: var(--font-display);
          font-size: 64px;
          color: #2a2a2a;
        }

        .project-card__body {
          padding: 24px;
        }

        .project-card__category {
          font-size: var(--text-micro);
          text-transform: uppercase;
          letter-spacing: var(--tracking-wide);
          color: var(--accent);
        }

        .project-card h3 {
          font-family: var(--font-body);
          font-size: var(--text-body);
          font-weight: 600;
          color: var(--text-light);
          text-transform: none;
          margin: 8px 0;
        }

        .project-card p {
          font-size: var(--text-small);
          color: var(--text-light-tertiary);
          margin: 0 0 16px;
        }

        .project-card__meta {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-top: 16px;
          border-top: 1px solid rgba(255, 255, 255, 0.1);
        }

        .project-card__value {
          font-family: var(--font-display);
          font-size: var(--text-body);
          color: var(--text-light);
        }

        .project-card__status {
          font-size: 11px;
          text-transform: uppercase;
          letter-spacing: var(--tracking-wide);
          padding: 4px 10px;
          border-radius: var(--radius-sm);
        }

        .project-card__status--completed {
          background: rgba(34, 197, 94, 0.2);
          color: #22c55e;
        }

        .project-card__status--ongoing {
          background: rgba(217, 119, 6, 0.2);
          color: var(--accent);
        }

        @media (max-width: 768px) {
          .projects__header {
            flex-direction: column;
            align-items: flex-start;
            gap: 24px;
          }

          .projects__grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  );
};

// Testimonials - Light background
const Testimonials = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });

  const testimonials = [
    {
      quote: "Their attention to detail and commitment to deadlines is exceptional. The railway station project was completed ahead of schedule.",
      author: "Senior Official",
      org: "North Western Railway"
    },
    {
      quote: "Quality of construction and adherence to specifications made them our preferred contractor for multiple projects.",
      author: "Executive Engineer",
      org: "PWD Rajasthan"
    },
    {
      quote: "Professional approach, transparent communication, and excellent workmanship. Highly recommended.",
      author: "Project Manager",
      org: "JDA Jaipur"
    }
  ];

  return (
    <section className="testimonials" ref={ref}>
      <div className="testimonials__inner">
        <span className="section-label">Testimonials</span>
        <h2>Trusted by Government Officials</h2>

        <motion.div
          className="testimonials__grid"
          variants={stagger}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              className="testimonial"
              variants={fadeUp}
              transition={{ duration: 0.4 }}
            >
              <p>{t.quote}</p>
              <div className="testimonial__author">
                <span className="testimonial__name">{t.author}</span>
                <span className="testimonial__org">{t.org}</span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <style>{`
        .testimonials {
          background: var(--surface-light);
          padding: 100px 0;
        }

        .testimonials__inner {
          max-width: var(--container-max);
          margin: 0 auto;
          padding: 0 var(--container-padding);
          text-align: center;
        }

        .testimonials h2 {
          color: var(--text-primary);
          margin-bottom: 64px;
        }

        .testimonials__grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 32px;
          text-align: left;
        }

        .testimonial {
          padding: 32px;
          background: var(--white);
          border-radius: var(--radius-md);
        }

        .testimonial p {
          font-size: var(--text-body);
          line-height: var(--leading-relaxed);
          color: var(--text-secondary);
          margin-bottom: 24px;
        }

        .testimonial__author {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .testimonial__name {
          font-weight: 600;
          color: var(--text-primary);
        }

        .testimonial__org {
          font-size: var(--text-small);
          color: var(--accent);
        }

        @media (max-width: 1024px) {
          .testimonials__grid {
            grid-template-columns: 1fr;
            max-width: 600px;
            margin: 0 auto;
          }
        }
      `}</style>
    </section>
  );
};

// Why Choose Us - Dark background
const WhyChooseUs = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });

  const reasons = [
    {
      title: 'Government-Grade Standards',
      desc: 'Same specifications required by Indian Railways and PWD.'
    },
    {
      title: 'Proven Track Record',
      desc: '₹300+ Crore worth of completed projects across Rajasthan.'
    },
    {
      title: 'Transparent Process',
      desc: 'Clear communication, detailed documentation, no surprises.'
    },
    {
      title: 'On-Time Delivery',
      desc: 'Government deadlines are non-negotiable. We deliver.'
    }
  ];

  return (
    <section className="why" ref={ref}>
      <div className="why__inner">
        <span className="section-label section-label--light">The Advantage</span>
        <h2>Why Private Clients Choose Us</h2>

        <motion.div
          className="why__grid"
          variants={stagger}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {reasons.map((reason, i) => (
            <motion.div
              key={i}
              className="why__item"
              variants={fadeUp}
              transition={{ duration: 0.4 }}
            >
              <h3>{reason.title}</h3>
              <p>{reason.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <style>{`
        .why {
          background: var(--surface-dark);
          padding: 100px 0;
        }

        .why__inner {
          max-width: var(--container-max);
          margin: 0 auto;
          padding: 0 var(--container-padding);
          text-align: center;
        }

        .why h2 {
          color: var(--text-light);
          margin-bottom: 64px;
        }

        .why__grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 32px;
          text-align: left;
        }

        .why__item {
          padding: 32px 24px;
          background: rgba(255, 255, 255, 0.05);
          border-radius: var(--radius-md);
        }

        .why__item h3 {
          font-family: var(--font-display);
          font-size: var(--text-body);
          color: var(--accent);
          margin-bottom: 12px;
        }

        .why__item p {
          font-size: var(--text-small);
          color: var(--text-light-secondary);
          line-height: var(--leading-relaxed);
          margin: 0;
        }

        @media (max-width: 1024px) {
          .why__grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 600px) {
          .why__grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  );
};

// Clients Section - Light background
const ClientsSection = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <section className="clients" ref={ref}>
      <div className="clients__inner">
        <span className="section-label">Our Partners</span>
        <h2>Trusted by Leading Organizations</h2>

        <motion.div
          className="clients__grid"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          {clients.map((client, i) => (
            <a
              key={i}
              href={client.url}
              target="_blank"
              rel="noopener noreferrer"
              className="clients__item"
            >
              <span className="clients__abbr">{client.shortName}</span>
              <span className="clients__name">{client.name}</span>
            </a>
          ))}
        </motion.div>
      </div>

      <style>{`
        .clients {
          background: var(--surface-light);
          padding: 80px 0;
        }

        .clients__inner {
          max-width: var(--container-wide);
          margin: 0 auto;
          padding: 0 var(--container-padding);
          text-align: center;
        }

        .clients h2 {
          color: var(--text-primary);
          margin-bottom: 48px;
        }

        .clients__grid {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 16px;
        }

        .clients__item {
          padding: 20px 24px;
          background: var(--white);
          border-radius: var(--radius-md);
          display: flex;
          align-items: center;
          gap: 12px;
          text-decoration: none;
          transition: all var(--transition-fast);
        }

        .clients__item:hover {
          box-shadow: var(--shadow-card);
          transform: translateY(-2px);
        }

        .clients__abbr {
          font-family: var(--font-display);
          font-size: var(--text-h2);
          color: var(--accent);
        }

        .clients__name {
          font-size: var(--text-small);
          color: var(--text-tertiary);
          text-align: left;
          max-width: 120px;
        }
      `}</style>
    </section>
  );
};

// CTA Section - Dark background
const CTASection = () => {
  return (
    <section className="cta">
      <div className="cta__inner">
        <h2>Ready to Start Your Project?</h2>
        <p>Get a free consultation and quote. No obligations.</p>
        <div className="cta__actions">
          <Link to="/contact" className="btn btn--primary btn--large">
            Get Free Quote
          </Link>
          <a href="tel:+919829015856" className="cta__phone">
            Or call +91 9829015856
          </a>
        </div>
      </div>

      <style>{`
        .cta {
          background: var(--surface-dark);
          padding: 100px 0;
          text-align: center;
        }

        .cta__inner {
          max-width: 600px;
          margin: 0 auto;
          padding: 0 var(--container-padding);
        }

        .cta h2 {
          color: var(--text-light);
          font-size: var(--text-h1);
          margin-bottom: 16px;
        }

        .cta p {
          color: var(--text-light-secondary);
          font-size: var(--text-h3);
          margin-bottom: 40px;
        }

        .cta__actions {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 24px;
        }

        .btn--large {
          padding: 16px 40px;
          font-size: var(--text-body);
        }

        .cta__phone {
          font-size: var(--text-small);
          color: var(--text-light-tertiary);
          text-decoration: none;
          transition: color var(--transition-fast);
        }

        .cta__phone:hover {
          color: var(--accent);
        }
      `}</style>
    </section>
  );
};

// Main Home Page
const Home = () => {
  return (
    <>
      <Hero />
      <StatsStrip />
      <ServicesSection />
      <FeaturedProjects />
      <Testimonials />
      <WhyChooseUs />
      <ClientsSection />
      <CTASection />
    </>
  );
};

export default Home;
