import { useState } from 'react';
import { motion } from 'framer-motion';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    projectType: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const projectTypes = [
    'Commercial Building',
    'Residential Project',
    'Industrial Facility',
    'Institutional Building',
    'Renovation/Expansion',
    'Other'
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setSubmitStatus('success');
    setIsSubmitting(false);
    setFormData({ name: '', email: '', phone: '', projectType: '', message: '' });
    setTimeout(() => setSubmitStatus(null), 5000);
  };

  return (
    <div className="contact-page">
      {/* Hero */}
      <section className="contact-hero">
        <motion.div
          className="contact-hero__content"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <span className="section-label">Get In Touch</span>
          <h1>Contact Us</h1>
          <p>Let's discuss your next infrastructure project</p>
        </motion.div>
      </section>

      {/* Main Content */}
      <section className="contact-main">
        <div className="contact-grid">
          {/* Info */}
          <motion.div
            className="contact-info"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h3>Get in Touch</h3>
            <p className="contact-info__intro">
              Have a project in mind? We'd love to hear from you.
            </p>

            <div className="info-list">
              <div className="info-item">
                <h4>Office</h4>
                <p>A-1 Koolwal Bhawan, Janta Colony</p>
                <p>Jaipur - 302004, Rajasthan</p>
              </div>
              <div className="info-item">
                <h4>Phone</h4>
                <p>+91 9829015856</p>
                <p>+91 9001890434</p>
              </div>
              <div className="info-item">
                <h4>Email</h4>
                <p>harinaraiankhandelwal@gmail.com</p>
              </div>
              <div className="info-item">
                <h4>Hours</h4>
                <p>Monday - Saturday</p>
                <p>9:00 AM - 6:00 PM</p>
              </div>
            </div>
          </motion.div>

          {/* Form */}
          <motion.form
            className="contact-form"
            onSubmit={handleSubmit}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="name">Full Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  autoComplete="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="Your full name"
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  autoComplete="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="your.email@example.com"
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="phone">Phone</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  autoComplete="tel"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  placeholder="+91 XXXXX XXXXX"
                />
              </div>
              <div className="form-group">
                <label htmlFor="projectType">Project Type</label>
                <select
                  id="projectType"
                  name="projectType"
                  value={formData.projectType}
                  onChange={handleChange}
                >
                  <option value="">Select type</option>
                  {projectTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="form-group form-group--full">
              <label htmlFor="message">Project Details</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows="5"
                placeholder="Tell us about your project..."
              />
            </div>

            <button type="submit" className="submit-btn" disabled={isSubmitting}>
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </button>

            {submitStatus === 'success' && (
              <div className="success-msg">
                Thank you! We'll get back to you soon.
              </div>
            )}
          </motion.form>
        </div>
      </section>

      {/* Map */}
      <section className="map-section">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3559.107!2d75.7873!3d26.8629!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x396db40!2sJanta%20Colony%2C%20Jaipur%2C%20Rajasthan!5e0!3m2!1sen!2sin!4v1700000000000"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Office Location"
        />
      </section>

      <style>{`
        .contact-page {
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
        .contact-hero {
          background: var(--surface-dark);
          padding: 80px var(--container-padding);
          text-align: center;
        }

        .contact-hero__content {
          max-width: 600px;
          margin: 0 auto;
        }

        .contact-hero h1 {
          font-size: clamp(40px, 8vw, 64px);
          line-height: var(--leading-hero);
          color: var(--text-light);
          margin-bottom: 16px;
        }

        .contact-hero p {
          font-size: var(--text-h3);
          color: var(--text-light-secondary);
          margin: 0;
        }

        /* Main */
        .contact-main {
          background: var(--surface-light);
          padding: 80px 0;
        }

        .contact-grid {
          max-width: var(--container-wide);
          margin: 0 auto;
          padding: 0 var(--container-padding);
          display: grid;
          grid-template-columns: 1fr 1.5fr;
          gap: 64px;
        }

        /* Info */
        .contact-info h3 {
          font-size: var(--text-h2);
          color: var(--text-primary);
          margin-bottom: 12px;
        }

        .contact-info__intro {
          color: var(--text-secondary);
          margin-bottom: 32px;
        }

        .info-list {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        .info-item {
          padding: 20px;
          background: var(--white);
          border-radius: var(--radius-md);
        }

        .info-item h4 {
          font-family: var(--font-display);
          font-size: var(--text-micro);
          text-transform: uppercase;
          letter-spacing: var(--tracking-wide);
          color: var(--accent);
          margin-bottom: 8px;
        }

        .info-item p {
          font-size: var(--text-small);
          color: var(--text-secondary);
          margin: 0;
          line-height: 1.6;
        }

        /* Form */
        .contact-form {
          background: var(--white);
          padding: 40px;
          border-radius: var(--radius-lg);
        }

        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 24px;
          margin-bottom: 24px;
        }

        .form-group {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .form-group--full {
          margin-bottom: 24px;
        }

        .form-group label {
          font-size: var(--text-micro);
          font-weight: 500;
          text-transform: uppercase;
          letter-spacing: var(--tracking-wide);
          color: var(--text-primary);
        }

        .form-group input,
        .form-group select,
        .form-group textarea {
          padding: 14px 16px;
          border: 1px solid rgba(0, 0, 0, 0.1);
          border-radius: var(--radius-md);
          font-family: var(--font-body);
          font-size: var(--text-body);
          background: var(--surface-light);
          transition: border-color var(--transition-fast);
        }

        .form-group input:focus,
        .form-group select:focus,
        .form-group textarea:focus {
          outline: none;
          border-color: var(--accent);
        }

        .form-group textarea {
          resize: vertical;
          min-height: 120px;
        }

        .submit-btn {
          width: 100%;
          padding: 16px;
          background: var(--accent);
          color: var(--surface-dark);
          border: none;
          border-radius: var(--radius-pill);
          font-family: var(--font-body);
          font-size: var(--text-body);
          font-weight: 500;
          cursor: pointer;
          transition: background var(--transition-fast);
        }

        .submit-btn:hover {
          background: var(--accent-hover);
        }

        .submit-btn:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }

        .success-msg {
          margin-top: 24px;
          padding: 16px;
          background: rgba(34, 197, 94, 0.1);
          color: #16a34a;
          text-align: center;
          border-radius: var(--radius-md);
          font-size: var(--text-small);
        }

        /* Map */
        .map-section {
          height: 400px;
          background: var(--surface-dark);
        }

        .map-section iframe {
          display: block;
        }

        @media (max-width: 1024px) {
          .contact-grid {
            grid-template-columns: 1fr;
            gap: 48px;
          }
        }

        @media (max-width: 768px) {
          .contact-main {
            padding: 48px 0;
          }

          .form-row {
            grid-template-columns: 1fr;
          }

          .contact-form {
            padding: 24px;
          }
        }
      `}</style>
    </div>
  );
};

export default Contact;
