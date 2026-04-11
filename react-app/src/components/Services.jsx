const servicesData = [
  {
    icon: '🚂',
    title: 'Railway Infrastructure',
    description: 'Railway stations, platforms, residential quarters, and associated infrastructure for Indian Railways and North Western Railway.'
  },
  {
    icon: '🏛️',
    title: 'Government Buildings',
    description: 'Police headquarters, court complexes, tax offices, administrative buildings for various government departments.'
  },
  {
    icon: '🏥',
    title: 'Educational & Healthcare',
    description: 'Medical colleges, schools, training academies, museums, and specialized institutional buildings.'
  },
  {
    icon: '🅿️',
    title: 'Smart City Projects',
    description: 'Multi-level parking complexes, underground parking, smart infrastructure for modern urban development.'
  }
];

function Services() {
  return (
    <section id="services" className="services">
      <div className="container">
        <h2 className="section-title">Our Services</h2>
        <div className="services-grid">
          {servicesData.map((service, index) => (
            <div className="service-card" key={index}>
              <div className="service-icon">{service.icon}</div>
              <h3>{service.title}</h3>
              <p>{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Services;
