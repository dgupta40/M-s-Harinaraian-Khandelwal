const statsData = [
  { number: '₹90+', label: 'Crores Annual Turnover' },
  { number: '50+', label: 'Major Projects Completed' },
  { number: '100%', label: 'Government Focus' },
  { number: '24/7', label: 'Project Support' }
];

function About() {
  return (
    <section id="about" className="about">
      <div className="container">
        <h2 className="section-title">About M/S Harinarayan Khandelwal & Contractors</h2>
        <div className="about-content">
          <div className="about-text">
            <p>M/S Harinarayan Khandelwal & Contractors is a leading construction firm based in Jaipur, specializing in delivering high-quality, government-focused infrastructure projects. With years of expertise in public sector development, we pride ourselves on our ability to execute complex, large-scale projects that meet the rigorous standards and timelines required by government bodies.</p>

            <p>Our commitment to quality, safety, and sustainability has earned us a reputation as a trusted partner for government contracts across Rajasthan. From railway stations and government buildings to educational institutions and smart city infrastructure, we bring precision, innovation, and reliability to every project we undertake.</p>

            <div className="about-stats">
              {statsData.map((stat, index) => (
                <div className="stat-item" key={index}>
                  <div className="stat-number">{stat.number}</div>
                  <div>{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="about-image">
            <div style={{
              background: 'linear-gradient(45deg, #f39c12, #e67e22)',
              height: '300px',
              borderRadius: '10px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontSize: '1.2rem',
              textAlign: 'center',
              flexDirection: 'column'
            }}>
              Professional Construction Team<br />
              <small>Quality • Reliability • Excellence</small>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
