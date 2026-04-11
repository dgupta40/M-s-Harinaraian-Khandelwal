function Hero() {
  const scrollToContact = (e) => {
    e.preventDefault();
    const target = document.querySelector('#contact');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section id="home" className="hero">
      <div className="container">
        <div className="hero-content">
          <h1>Constructing Your Dreams, One Brick at a Time</h1>
          <p>Leading construction firm specializing in government infrastructure projects across Rajasthan. With years of expertise in public sector development, we deliver complex, large-scale projects that meet rigorous government standards.</p>
          <a href="#contact" className="cta-button" onClick={scrollToContact}>Get Free Quote</a>
        </div>
      </div>
    </section>
  );
}

export default Hero;
