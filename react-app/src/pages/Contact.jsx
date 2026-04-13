import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    projectType: '',
    state: '',
    city: '',
    plotSize: '',
    budget: '',
    timeline: '',
    hasPlans: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const timeoutRef = useRef(null);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const projectTypes = [
    'Residential - New Construction',
    'Residential - Renovation/Extension',
    'Commercial Building',
    'Factory/Warehouse',
    'Farmhouse/Villa',
    'Showroom/Retail Space',
    'Office Building',
    'Other'
  ];

  const states = [
    'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
    'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka',
    'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram',
    'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu',
    'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal',
    'Delhi', 'Chandigarh', 'Other'
  ];

  const budgetRanges = [
    'Below ₹25 Lakhs',
    '₹25 Lakhs - ₹50 Lakhs',
    '₹50 Lakhs - ₹1 Crore',
    '₹1 Crore - ₹5 Crore',
    '₹5 Crore - ₹10 Crore',
    'Above ₹10 Crore'
  ];

  const timelines = [
    'Ready to start immediately',
    'Within 1-3 months',
    'Within 3-6 months',
    'Within 6-12 months',
    'Just exploring options'
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await fetch('https://formspree.io/f/xbdqrvzb', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          projectType: formData.projectType,
          location: `${formData.city}, ${formData.state}`,
          plotSize: formData.plotSize || 'Not specified',
          budget: formData.budget,
          timeline: formData.timeline,
          hasPlans: formData.hasPlans || 'Not specified',
          message: formData.message || 'None'
        })
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({
          name: '', email: '', phone: '', projectType: '', state: '', city: '',
          plotSize: '', budget: '', timeline: '', hasPlans: '', message: ''
        });
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      setSubmitStatus('error');
    }

    setIsSubmitting(false);

    // Clear status after 5 seconds
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => setSubmitStatus(null), 5000);
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
          <span className="section-label">Start Your Project</span>
          <h1>Get a Free Quote</h1>
          <p>Tell us about your project and we'll get back to you within 24 hours</p>
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
            <h3>Why Choose Us?</h3>
            <p className="contact-info__intro">
              29+ years of experience building across India. From homes to commercial complexes, we deliver quality construction on time.
            </p>

            <div className="info-list">
              <div className="info-item">
                <h4>Head Office</h4>
                <p>A-1 Koolwal Bhawan, Janta Colony</p>
                <p>Jaipur - 302004, Rajasthan</p>
              </div>
              <div className="info-item">
                <h4>Call Us</h4>
                <p>+91 9829015856</p>
                <p>+91 9001890434</p>
              </div>
              <div className="info-item">
                <h4>Email</h4>
                <p>harinaraiankhandelwal@gmail.com</p>
              </div>
              <div className="info-item">
                <h4>Working Hours</h4>
                <p>Monday - Saturday</p>
                <p>9:00 AM - 6:00 PM</p>
              </div>
            </div>

            <div className="trust-badges">
              <div className="trust-badge">
                <span className="trust-badge__number">50+</span>
                <span className="trust-badge__label">Projects Completed</span>
              </div>
              <div className="trust-badge">
                <span className="trust-badge__number">₹700Cr+</span>
                <span className="trust-badge__label">Project Value</span>
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
            <div className="form-section">
              <h4 className="form-section__title">Your Details</h4>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="name">Full Name *</label>
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
                  <label htmlFor="phone">Phone Number *</label>
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
              </div>
              <div className="form-group">
                <label htmlFor="email">Email Address *</label>
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

            <div className="form-section">
              <h4 className="form-section__title">Project Information</h4>
              <div className="form-group">
                <label htmlFor="projectType">Project Type *</label>
                <select
                  id="projectType"
                  name="projectType"
                  value={formData.projectType}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select project type</option>
                  {projectTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="state">State *</label>
                  <select
                    id="state"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select state</option>
                    {states.map(state => (
                      <option key={state} value={state}>{state}</option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="city">City *</label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    required
                    placeholder="Enter city name"
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="plotSize">Plot/Built-up Area</label>
                  <input
                    type="text"
                    id="plotSize"
                    name="plotSize"
                    value={formData.plotSize}
                    onChange={handleChange}
                    placeholder="e.g., 2000 sq ft"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="budget">Estimated Budget *</label>
                  <select
                    id="budget"
                    name="budget"
                    value={formData.budget}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select budget range</option>
                    {budgetRanges.map(range => (
                      <option key={range} value={range}>{range}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="timeline">When do you want to start? *</label>
                  <select
                    id="timeline"
                    name="timeline"
                    value={formData.timeline}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select timeline</option>
                    {timelines.map(t => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="hasPlans">Do you have approved plans?</label>
                  <select
                    id="hasPlans"
                    name="hasPlans"
                    value={formData.hasPlans}
                    onChange={handleChange}
                  >
                    <option value="">Select</option>
                    <option value="yes">Yes, plans are ready</option>
                    <option value="in-progress">In progress</option>
                    <option value="no">No, need help with planning</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="form-section">
              <h4 className="form-section__title">Additional Details</h4>
              <div className="form-group">
                <label htmlFor="message">Tell us more about your project</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="4"
                  placeholder="Any specific requirements, preferences, or questions..."
                />
              </div>
            </div>

            <button type="submit" className="submit-btn" disabled={isSubmitting}>
              {isSubmitting ? 'Sending...' : 'Get Free Quote'}
            </button>

            <p className="form-note">
              We respect your privacy. Your information will only be used to contact you about your project.
            </p>

            {submitStatus === 'success' && (
              <div className="success-msg">
                <strong>Query Submitted Successfully!</strong>
                <p>Thank you for your interest. Our team will review your requirements and get back to you within 24-48 hours.</p>
              </div>
            )}

            {submitStatus === 'error' && (
              <div className="error-msg">
                Something went wrong. Please try again or call us at +91 9829015856.
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
          align-items: start;
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
          line-height: var(--leading-relaxed);
        }

        .info-list {
          display: flex;
          flex-direction: column;
          gap: 16px;
          margin-bottom: 32px;
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

        .trust-badges {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
        }

        .trust-badge {
          background: var(--surface-dark);
          padding: 20px;
          border-radius: var(--radius-md);
          text-align: center;
        }

        .trust-badge__number {
          display: block;
          font-family: var(--font-display);
          font-size: 24px;
          color: var(--accent);
          margin-bottom: 4px;
        }

        .trust-badge__label {
          font-size: var(--text-micro);
          color: var(--text-light-secondary);
          text-transform: uppercase;
          letter-spacing: var(--tracking-wide);
        }

        /* Form */
        .contact-form {
          background: var(--white);
          padding: 40px;
          border-radius: var(--radius-lg);
        }

        .form-section {
          margin-bottom: 32px;
          padding-bottom: 32px;
          border-bottom: 1px solid rgba(0, 0, 0, 0.05);
        }

        .form-section:last-of-type {
          border-bottom: none;
          padding-bottom: 0;
          margin-bottom: 24px;
        }

        .form-section__title {
          font-family: var(--font-display);
          font-size: var(--text-body);
          color: var(--text-primary);
          margin-bottom: 20px;
        }

        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
          margin-bottom: 20px;
        }

        .form-row:last-child {
          margin-bottom: 0;
        }

        .form-group {
          display: flex;
          flex-direction: column;
          gap: 8px;
          margin-bottom: 20px;
        }

        .form-row .form-group {
          margin-bottom: 0;
        }

        .form-group:last-child {
          margin-bottom: 0;
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
          border-color: var(--accent);
          outline: 2px solid transparent;
        }

        .form-group input:focus-visible,
        .form-group select:focus-visible,
        .form-group textarea:focus-visible {
          border-color: var(--accent);
          outline: 2px solid var(--accent);
          outline-offset: 2px;
        }

        .form-group textarea {
          resize: vertical;
          min-height: 100px;
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

        .submit-btn:focus-visible {
          outline: 2px solid var(--accent);
          outline-offset: 2px;
        }

        .form-note {
          text-align: center;
          font-size: var(--text-micro);
          color: var(--text-tertiary);
          margin-top: 16px;
        }

        .success-msg {
          margin-top: 24px;
          padding: 20px;
          background: rgba(34, 197, 94, 0.1);
          color: #16a34a;
          text-align: center;
          border-radius: var(--radius-md);
          font-size: var(--text-small);
        }

        .success-msg strong {
          display: block;
          font-size: var(--text-body);
          margin-bottom: 8px;
        }

        .success-msg p {
          margin: 0;
          color: var(--text-secondary);
        }

        .error-msg {
          margin-top: 24px;
          padding: 16px;
          background: rgba(239, 68, 68, 0.1);
          color: #dc2626;
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

          .trust-badges {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
};

export default Contact;
