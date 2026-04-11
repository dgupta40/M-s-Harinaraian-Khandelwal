import { useState } from 'react';

const contactInfo = [
  {
    icon: '📍',
    label: 'Address',
    content: 'Jaipur, Rajasthan, India'
  },
  {
    icon: '📞',
    label: 'Phone',
    content: 'Contact for Government Contracts'
  },
  {
    icon: '✉️',
    label: 'Email',
    content: 'info@hkcontractors.com'
  },
  {
    icon: '🕒',
    label: 'Hours',
    content: ['Mon-Fri: 7:00 AM - 6:00 PM', 'Sat: 8:00 AM - 4:00 PM']
  }
];

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    project: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.project) {
      alert('Please fill in all required fields.');
      return;
    }

    alert('Thank you for your quote request! We will contact you within 24 hours.');
    setFormData({ name: '', email: '', phone: '', project: '' });
  };

  return (
    <section id="contact" className="contact">
      <div className="container">
        <h2 className="section-title">Get In Touch</h2>
        <div className="contact-content">
          <div className="contact-info">
            <h3>Contact Information</h3>
            {contactInfo.map((item, index) => (
              <div className="contact-item" key={index}>
                <span>{item.icon}</span>
                <div>
                  <strong>{item.label}:</strong><br />
                  {Array.isArray(item.content)
                    ? item.content.map((line, i) => <span key={i}>{line}<br /></span>)
                    : item.content
                  }
                </div>
              </div>
            ))}
          </div>
          <div className="contact-form">
            <h3>Request a Quote</h3>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">Full Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="phone">Phone Number</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="project">Project Requirements</label>
                <textarea
                  id="project"
                  name="project"
                  placeholder="Describe your government infrastructure project requirements..."
                  value={formData.project}
                  onChange={handleChange}
                  required
                />
              </div>
              <button type="submit" className="submit-btn">Request Quote</button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Contact;
