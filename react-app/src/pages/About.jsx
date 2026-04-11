import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { turnoverData, companyStats } from '../data/financials';

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

const About = () => {
  const [storyRef, storyInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [valuesRef, valuesInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [timelineRef, timelineInView] = useInView({ triggerOnce: true, threshold: 0.1 });

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div style={{ background: '#1a1a1a', padding: '12px 16px', borderRadius: '8px' }}>
          <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '12px', margin: 0 }}>{label}</p>
          <p style={{ color: '#d97706', fontSize: '18px', fontWeight: 600, margin: '4px 0 0' }}>
            ₹{payload[0].value} Cr
          </p>
        </div>
      );
    }
    return null;
  };

  const milestones = [
    { year: '1995', title: 'Founded', desc: 'Company established in Jaipur' },
    { year: '2015', title: 'First Major Contract', desc: 'Completed first ₹25+ Cr project' },
    { year: '2018', title: 'Railway Partnership', desc: 'North Western Railway contracts' },
    { year: '2020', title: 'Smart City Entry', desc: 'Urban infrastructure development' },
    { year: '2024', title: '₹105 Cr Milestone', desc: 'Record annual turnover achieved' }
  ];

  const values = [
    { title: 'Quality', desc: 'Exceeding expectations with highest construction standards.' },
    { title: 'Integrity', desc: 'Transparent practices and ethical business conduct.' },
    { title: 'Timeliness', desc: 'On-time delivery without compromising quality.' },
    { title: 'Safety', desc: 'Prioritizing worker and public safety always.' }
  ];

  return (
    <div className="about-page">
      {/* Hero */}
      <section className="about-hero">
        <motion.div
          className="about-hero__content"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <span className="section-label">About Us</span>
          <h1>Building Rajasthan's Infrastructure</h1>
          <p>
            M/S Harinarayan Khandelwal & Contractors is a leading construction firm
            specializing in government infrastructure projects since 1995.
          </p>
        </motion.div>
      </section>

      {/* Story */}
      <section className="story" ref={storyRef}>
        <div className="story__inner">
          <motion.div
            className="story__content"
            initial="hidden"
            animate={storyInView ? "visible" : "hidden"}
            variants={fadeUp}
            transition={{ duration: 0.5 }}
          >
            <span className="section-label">Our Story</span>
            <h2>Three Decades of Excellence</h2>
            <p className="story__lead">
              With expertise in public sector development, we execute complex, large-scale
              projects that meet rigorous government standards.
            </p>
            <p>
              Our commitment to quality, safety, and sustainability has earned us a reputation
              as a trusted partner for government contracts. From railway stations to public
              buildings, we bring precision and reliability to every project.
            </p>
          </motion.div>

          <motion.div
            className="story__stats"
            initial="hidden"
            animate={storyInView ? "visible" : "hidden"}
            variants={fadeUp}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="stat">
              <span className="stat__value">{companyStats.projectsCompleted}</span>
              <span className="stat__label">Projects</span>
            </div>
            <div className="stat">
              <span className="stat__value">{companyStats.yearsExperience}</span>
              <span className="stat__label">Years</span>
            </div>
            <div className="stat">
              <span className="stat__value">₹105Cr</span>
              <span className="stat__label">Turnover</span>
            </div>
            <div className="stat">
              <span className="stat__value">{companyStats.governmentClients}</span>
              <span className="stat__label">Govt Clients</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Values */}
      <section className="values" ref={valuesRef}>
        <div className="values__inner">
          <span className="section-label section-label--light">Our Values</span>
          <h2>What Drives Us</h2>

          <div className="values__grid">
            {values.map((value, i) => (
              <motion.div
                key={i}
                className="value-card"
                initial="hidden"
                animate={valuesInView ? "visible" : "hidden"}
                variants={fadeUp}
                transition={{ duration: 0.4, delay: i * 0.1 }}
              >
                <h3>{value.title}</h3>
                <p>{value.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Financial Chart */}
      <section className="chart-section">
        <div className="chart-section__inner">
          <div className="chart-header">
            <div>
              <span className="section-label">Financial Growth</span>
              <h2>Revenue Progression</h2>
            </div>
            <div className="chart-highlight">
              <span className="chart-highlight__label">FY 2024-25</span>
              <span className="chart-highlight__value">₹105.39 Cr</span>
            </div>
          </div>

          <div className="chart-wrapper">
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={turnoverData} margin={{ top: 20, right: 20, left: 0, bottom: 60 }}>
                <defs>
                  <linearGradient id="colorAmount" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#d97706" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#d97706" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.1)" />
                <XAxis
                  dataKey="year"
                  tick={{ fill: 'rgba(0,0,0,0.48)', fontSize: 11 }}
                  angle={-45}
                  textAnchor="end"
                />
                <YAxis
                  tick={{ fill: 'rgba(0,0,0,0.48)', fontSize: 11 }}
                  tickFormatter={(v) => `${v}`}
                />
                <Tooltip content={<CustomTooltip />} />
                <Area
                  type="monotone"
                  dataKey="amount"
                  stroke="#d97706"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#colorAmount)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <div className="chart-stats">
            <div className="chart-stat">
              <span className="chart-stat__label">Total Growth</span>
              <span className="chart-stat__value">+199%</span>
            </div>
            <div className="chart-stat">
              <span className="chart-stat__label">Starting Point</span>
              <span className="chart-stat__value">₹35.24 Cr</span>
            </div>
            <div className="chart-stat">
              <span className="chart-stat__label">Avg Annual</span>
              <span className="chart-stat__value">~12%</span>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="timeline-section" ref={timelineRef}>
        <div className="timeline-section__inner">
          <span className="section-label section-label--light">Our Journey</span>
          <h2>Key Milestones</h2>

          <div className="timeline">
            {milestones.map((m, i) => (
              <motion.div
                key={i}
                className="timeline__item"
                initial="hidden"
                animate={timelineInView ? "visible" : "hidden"}
                variants={fadeUp}
                transition={{ duration: 0.4, delay: i * 0.1 }}
              >
                <span className="timeline__year">{m.year}</span>
                <div className="timeline__content">
                  <h3>{m.title}</h3>
                  <p>{m.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <style>{`
        .about-page {
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

        .section-label--light {
          color: var(--accent);
        }

        /* Hero */
        .about-hero {
          min-height: 60vh;
          background: var(--surface-dark);
          display: flex;
          align-items: center;
          justify-content: center;
          text-align: center;
          padding: 80px var(--container-padding);
        }

        .about-hero__content {
          max-width: 700px;
        }

        .about-hero h1 {
          font-size: clamp(36px, 6vw, 56px);
          line-height: var(--leading-hero);
          color: var(--text-light);
          margin-bottom: 24px;
        }

        .about-hero p {
          font-size: var(--text-h3);
          line-height: var(--leading-normal);
          color: var(--text-light-secondary);
          margin: 0;
        }

        /* Story */
        .story {
          background: var(--surface-light);
          padding: 100px 0;
        }

        .story__inner {
          max-width: var(--container-max);
          margin: 0 auto;
          padding: 0 var(--container-padding);
          display: grid;
          grid-template-columns: 1.5fr 1fr;
          gap: 80px;
          align-items: start;
        }

        .story h2 {
          font-size: var(--text-h1);
          line-height: var(--leading-tight);
          color: var(--text-primary);
          margin-bottom: 24px;
        }

        .story__lead {
          font-size: var(--text-body);
          line-height: var(--leading-relaxed);
          color: var(--text-primary);
          margin-bottom: 16px;
        }

        .story__content p {
          color: var(--text-secondary);
          line-height: var(--leading-relaxed);
        }

        .story__stats {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1px;
          background: rgba(0, 0, 0, 0.1);
        }

        .stat {
          background: var(--white);
          padding: 32px 24px;
          text-align: center;
        }

        .stat__value {
          display: block;
          font-family: var(--font-display);
          font-size: 32px;
          color: var(--text-primary);
          margin-bottom: 8px;
        }

        .stat__label {
          font-size: var(--text-micro);
          text-transform: uppercase;
          letter-spacing: var(--tracking-wide);
          color: var(--text-tertiary);
        }

        /* Values */
        .values {
          background: var(--surface-dark);
          padding: 100px 0;
        }

        .values__inner {
          max-width: var(--container-max);
          margin: 0 auto;
          padding: 0 var(--container-padding);
          text-align: center;
        }

        .values h2 {
          color: var(--text-light);
          margin-bottom: 64px;
        }

        .values__grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 24px;
          text-align: left;
        }

        .value-card {
          background: rgba(255, 255, 255, 0.05);
          padding: 32px 24px;
          border-radius: var(--radius-md);
        }

        .value-card h3 {
          font-family: var(--font-display);
          font-size: var(--text-body);
          color: var(--accent);
          margin-bottom: 12px;
        }

        .value-card p {
          font-size: var(--text-small);
          color: var(--text-light-secondary);
          line-height: var(--leading-relaxed);
          margin: 0;
        }

        /* Chart */
        .chart-section {
          background: var(--surface-light);
          padding: 100px 0;
        }

        .chart-section__inner {
          max-width: var(--container-max);
          margin: 0 auto;
          padding: 0 var(--container-padding);
        }

        .chart-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 32px;
        }

        .chart-header h2 {
          color: var(--text-primary);
        }

        .chart-highlight {
          text-align: right;
        }

        .chart-highlight__label {
          display: block;
          font-size: var(--text-micro);
          text-transform: uppercase;
          letter-spacing: var(--tracking-wide);
          color: var(--text-tertiary);
          margin-bottom: 4px;
        }

        .chart-highlight__value {
          font-family: var(--font-display);
          font-size: 32px;
          color: var(--accent);
        }

        .chart-wrapper {
          background: var(--white);
          border-radius: var(--radius-md);
          padding: 24px;
        }

        .chart-stats {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
          margin-top: 32px;
        }

        .chart-stat {
          background: var(--white);
          padding: 24px;
          border-radius: var(--radius-md);
          text-align: center;
        }

        .chart-stat__label {
          display: block;
          font-size: var(--text-micro);
          text-transform: uppercase;
          letter-spacing: var(--tracking-wide);
          color: var(--text-tertiary);
          margin-bottom: 8px;
        }

        .chart-stat__value {
          font-family: var(--font-display);
          font-size: 24px;
          color: var(--text-primary);
        }

        /* Timeline */
        .timeline-section {
          background: var(--surface-dark);
          padding: 100px 0;
        }

        .timeline-section__inner {
          max-width: 600px;
          margin: 0 auto;
          padding: 0 var(--container-padding);
          text-align: center;
        }

        .timeline-section h2 {
          color: var(--text-light);
          margin-bottom: 64px;
        }

        .timeline {
          text-align: left;
          position: relative;
          padding-left: 32px;
        }

        .timeline::before {
          content: '';
          position: absolute;
          left: 0;
          top: 8px;
          bottom: 0;
          width: 1px;
          background: rgba(255, 255, 255, 0.2);
        }

        .timeline__item {
          position: relative;
          padding-bottom: 32px;
        }

        .timeline__item::before {
          content: '';
          position: absolute;
          left: -36px;
          top: 8px;
          width: 8px;
          height: 8px;
          background: var(--accent);
          border-radius: 50%;
        }

        .timeline__year {
          font-family: var(--font-display);
          font-size: var(--text-small);
          color: var(--accent);
        }

        .timeline__content h3 {
          font-family: var(--font-display);
          font-size: var(--text-body);
          color: var(--text-light);
          margin: 8px 0 4px;
        }

        .timeline__content p {
          font-size: var(--text-small);
          color: var(--text-light-secondary);
          margin: 0;
        }

        @media (max-width: 1024px) {
          .story__inner {
            grid-template-columns: 1fr;
            gap: 48px;
          }

          .values__grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 768px) {
          .values__grid {
            grid-template-columns: 1fr;
          }

          .chart-header {
            flex-direction: column;
            gap: 16px;
          }

          .chart-highlight {
            text-align: left;
          }

          .chart-stats {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
};

export default About;
