const projectsData = [
  {
    icon: '🚂',
    title: 'Khatipura Railway Station',
    client: 'North Western Railway',
    value: '₹26.78 Crores',
    description: 'Complete railway station development including platforms, station building, and passenger amenities.'
  },
  {
    icon: '🏛️',
    title: 'Rajasthan Police Headquarters',
    client: 'Rajasthan State Road Development Corporation',
    value: '₹35 Crores',
    description: 'New police headquarters complex at Lal Kothi, Jaipur with modern facilities and infrastructure.'
  },
  {
    icon: '🏥',
    title: 'SMS Medical College Hostel',
    client: 'Rajasthan State Road Development Corporation',
    value: '₹46.85 Crores',
    description: "Resident doctor's hostel and 2BHK apartments for medical college staff."
  },
  {
    icon: '🏛️',
    title: 'Gandhi Darshan Vatika Museum',
    client: 'Jaipur Development Authority',
    value: '₹19.12 Crores',
    description: 'Interior works including civil, electrical, HVAC, and furnishing for the museum.'
  },
  {
    icon: '🅿️',
    title: 'Multi-Level Parking Complex',
    client: 'Jaipur Smart City Limited',
    value: '₹15.41 Crores',
    description: 'Smart multi-level car parking at Chaugan Stadium with modern amenities.'
  },
  {
    icon: '🏫',
    title: 'ICAI Center of Excellence',
    client: 'Institute of Chartered Accountants of India',
    value: '₹24.89 Crores',
    description: 'Modern educational facility with state-of-the-art infrastructure for professional training.'
  }
];

const currentProjects = [
  'Kar Bhawan (Tax Facilitation Centre) - ₹56.80 Crores',
  'Underground Parking at Rajasthan High Court - ₹49.88 Crores',
  'Multiple Railway Station Improvements under Amrit Bharat Scheme'
];

function Projects() {
  return (
    <section id="projects" className="projects">
      <div className="container">
        <h2 className="section-title">Major Projects</h2>
        <p style={{ textAlign: 'center', marginBottom: '3rem', fontSize: '1.1rem' }}>
          Showcasing our expertise in government infrastructure development
        </p>

        <div className="projects-grid">
          {projectsData.map((project, index) => (
            <div className="project-card" key={index}>
              <div className="project-image">
                <div className="project-placeholder">{project.icon}</div>
              </div>
              <div className="project-info">
                <h3>{project.title}</h3>
                <p><strong>Client:</strong> {project.client}</p>
                <p><strong>Value:</strong> {project.value}</p>
                <p>{project.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div style={{ textAlign: 'center', marginTop: '3rem' }}>
          <p style={{ fontSize: '1.1rem', marginBottom: '1rem' }}>
            <strong>Current Projects Under Construction:</strong>
          </p>
          {currentProjects.map((project, index) => (
            <p key={index}>• {project}</p>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Projects;
