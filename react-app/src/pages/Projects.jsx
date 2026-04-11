import { useState } from 'react';
import { motion } from 'framer-motion';
import { projects, categories, getCompletedProjects, getOngoingProjects } from '../data/projects';

const Projects = () => {
  const [activeStatus, setActiveStatus] = useState('all');
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedProject, setSelectedProject] = useState(null);

  const statusFilters = [
    { id: 'all', label: 'All' },
    { id: 'completed', label: 'Completed' },
    { id: 'ongoing', label: 'Ongoing' }
  ];

  const filteredProjects = projects.filter(project => {
    const statusMatch = activeStatus === 'all' || project.status === activeStatus;
    const categoryMatch = activeCategory === 'all' || project.category === activeCategory;
    return statusMatch && categoryMatch;
  });

  const totalValue = filteredProjects
    .filter(p => p.value !== 'Private')
    .reduce((sum, p) => sum + parseFloat(p.value), 0).toFixed(2);

  return (
    <div className="projects-page">
      {/* Hero */}
      <section className="projects-hero">
        <motion.div
          className="projects-hero__content"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <span className="section-label">Our Work</span>
          <h1>Projects</h1>
          <p>Government infrastructure projects across Rajasthan</p>
        </motion.div>
      </section>

      {/* Stats */}
      <section className="stats-bar">
        <div className="stat">
          <span className="stat__value">{filteredProjects.length}</span>
          <span className="stat__label">Projects</span>
        </div>
        <div className="stat">
          <span className="stat__value">₹{totalValue}Cr</span>
          <span className="stat__label">Total Value</span>
        </div>
        <div className="stat">
          <span className="stat__value">{getCompletedProjects().length}</span>
          <span className="stat__label">Completed</span>
        </div>
        <div className="stat">
          <span className="stat__value">{getOngoingProjects().length}</span>
          <span className="stat__label">Ongoing</span>
        </div>
      </section>

      {/* Filters */}
      <section className="filters">
        <div className="filters__inner">
          <div className="filter-group">
            <span className="filter-group__label">Status</span>
            <div className="filter-btns">
              {statusFilters.map(f => (
                <button
                  key={f.id}
                  className={`filter-btn ${activeStatus === f.id ? 'filter-btn--active' : ''}`}
                  onClick={() => setActiveStatus(f.id)}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>
          <div className="filter-group">
            <span className="filter-group__label">Category</span>
            <div className="filter-btns">
              {categories.map(c => (
                <button
                  key={c.id}
                  className={`filter-btn ${activeCategory === c.id ? 'filter-btn--active' : ''}`}
                  onClick={() => setActiveCategory(c.id)}
                >
                  {c.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="projects-grid-section">
        <div className="projects-grid">
          {filteredProjects.map((project, i) => (
            <motion.div
              key={project.id}
              className="project-card"
              onClick={() => setSelectedProject(project)}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: i * 0.05 }}
            >
              <div className="project-card__top">
                <span className={`project-card__status project-card__status--${project.status}`}>
                  {project.status}
                </span>
                <span className="project-card__category">{project.category}</span>
              </div>
              <h3>{project.title}</h3>
              <p className="project-card__client">{project.client}</p>
              <div className="project-card__meta">
                <div>
                  <span className="project-card__meta-label">Value</span>
                  <span className="project-card__meta-value">
                    {project.value === 'Private' ? 'Private' : `₹${project.value}Cr`}
                  </span>
                </div>
                <div>
                  <span className="project-card__meta-label">Duration</span>
                  <span className="project-card__meta-value">{project.duration}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <div className="no-results">
            <p>No projects match your filters.</p>
            <button onClick={() => { setActiveStatus('all'); setActiveCategory('all'); }}>
              Clear Filters
            </button>
          </div>
        )}
      </section>

      {/* Modal */}
      {selectedProject && (
        <div className="modal-overlay" onClick={() => setSelectedProject(null)}>
          <motion.div
            className="modal"
            onClick={e => e.stopPropagation()}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.2 }}
          >
            <button className="modal__close" onClick={() => setSelectedProject(null)}>✕</button>
            <div className="modal__header">
              <span className={`project-card__status project-card__status--${selectedProject.status}`}>
                {selectedProject.status}
              </span>
              <h2>{selectedProject.title}</h2>
              <p className="modal__client">{selectedProject.client}</p>
            </div>
            <div className="modal__stats">
              <div>
                <span className="modal__stats-label">Value</span>
                <span className="modal__stats-value">
                  {selectedProject.value === 'Private' ? 'Private' : `₹${selectedProject.value}Cr`}
                </span>
              </div>
              <div>
                <span className="modal__stats-label">Duration</span>
                <span className="modal__stats-value">{selectedProject.duration}</span>
              </div>
              <div>
                <span className="modal__stats-label">Category</span>
                <span className="modal__stats-value">{selectedProject.category}</span>
              </div>
            </div>
            <div className="modal__body">
              <h3>Project Details</h3>
              <p>{selectedProject.description}</p>
            </div>
          </motion.div>
        </div>
      )}

      <style>{`
        .projects-page {
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
        .projects-hero {
          background: var(--surface-dark);
          padding: 80px var(--container-padding);
          text-align: center;
        }

        .projects-hero__content {
          max-width: 600px;
          margin: 0 auto;
        }

        .projects-hero h1 {
          font-size: clamp(48px, 10vw, 80px);
          line-height: var(--leading-hero);
          color: var(--text-light);
          margin-bottom: 16px;
        }

        .projects-hero p {
          font-size: var(--text-h3);
          color: var(--text-light-secondary);
          margin: 0;
        }

        /* Stats */
        .stats-bar {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          background: #1a1a1a;
        }

        .stat {
          padding: 24px;
          text-align: center;
          border-right: 1px solid rgba(255, 255, 255, 0.1);
        }

        .stat:last-child {
          border-right: none;
        }

        .stat__value {
          display: block;
          font-family: var(--font-display);
          font-size: 24px;
          color: var(--text-light);
          margin-bottom: 4px;
        }

        .stat__label {
          font-size: var(--text-micro);
          text-transform: uppercase;
          letter-spacing: var(--tracking-wide);
          color: var(--text-light-tertiary);
        }

        /* Filters */
        .filters {
          background: var(--surface-light);
          padding: 32px 0;
        }

        .filters__inner {
          max-width: var(--container-wide);
          margin: 0 auto;
          padding: 0 var(--container-padding);
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .filter-group {
          display: flex;
          align-items: center;
          gap: 16px;
          flex-wrap: wrap;
        }

        .filter-group__label {
          font-size: var(--text-micro);
          text-transform: uppercase;
          letter-spacing: var(--tracking-wide);
          color: var(--text-tertiary);
          min-width: 80px;
        }

        .filter-btns {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
        }

        .filter-btn {
          padding: 8px 16px;
          background: var(--white);
          border: 1px solid rgba(0, 0, 0, 0.1);
          border-radius: var(--radius-pill);
          font-family: var(--font-body);
          font-size: var(--text-small);
          cursor: pointer;
          transition: all var(--transition-fast);
        }

        .filter-btn:hover {
          border-color: var(--text-primary);
        }

        .filter-btn--active {
          background: var(--surface-dark);
          border-color: var(--surface-dark);
          color: var(--text-light);
        }

        /* Grid */
        .projects-grid-section {
          background: var(--surface-light);
          padding: 0 0 80px;
        }

        .projects-grid {
          max-width: var(--container-wide);
          margin: 0 auto;
          padding: 0 var(--container-padding);
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
        }

        .project-card {
          background: var(--white);
          padding: 24px;
          border-radius: var(--radius-md);
          cursor: pointer;
          transition: all var(--transition-fast);
        }

        .project-card:hover {
          box-shadow: var(--shadow-card);
          transform: translateY(-4px);
        }

        .project-card__top {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 16px;
        }

        .project-card__status {
          font-size: 10px;
          text-transform: uppercase;
          letter-spacing: var(--tracking-wide);
          padding: 4px 10px;
          border-radius: var(--radius-sm);
        }

        .project-card__status--completed {
          background: rgba(34, 197, 94, 0.15);
          color: #16a34a;
        }

        .project-card__status--ongoing {
          background: rgba(217, 119, 6, 0.15);
          color: var(--accent);
        }

        .project-card__category {
          font-size: var(--text-micro);
          text-transform: uppercase;
          letter-spacing: var(--tracking-wide);
          color: var(--text-tertiary);
        }

        .project-card h3 {
          font-family: var(--font-display);
          font-size: var(--text-body);
          color: var(--text-primary);
          margin-bottom: 4px;
          line-height: var(--leading-snug);
        }

        .project-card__client {
          font-size: var(--text-small);
          color: var(--accent);
          margin-bottom: 16px;
        }

        .project-card__meta {
          display: flex;
          gap: 32px;
          padding-top: 16px;
          border-top: 1px solid rgba(0, 0, 0, 0.05);
        }

        .project-card__meta-label {
          display: block;
          font-size: 10px;
          text-transform: uppercase;
          letter-spacing: var(--tracking-wide);
          color: var(--text-tertiary);
          margin-bottom: 2px;
        }

        .project-card__meta-value {
          font-family: var(--font-display);
          font-size: var(--text-small);
          color: var(--text-primary);
        }

        .no-results {
          text-align: center;
          padding: 64px var(--container-padding);
        }

        .no-results p {
          color: var(--text-tertiary);
          margin-bottom: 16px;
        }

        .no-results button {
          padding: 12px 24px;
          background: var(--surface-dark);
          color: var(--text-light);
          border: none;
          border-radius: var(--radius-pill);
          font-family: var(--font-body);
          cursor: pointer;
        }

        /* Modal */
        .modal-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.9);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          padding: var(--container-padding);
        }

        .modal {
          background: var(--white);
          max-width: 600px;
          width: 100%;
          max-height: 90vh;
          overflow-y: auto;
          border-radius: var(--radius-lg);
          position: relative;
        }

        .modal__close {
          position: absolute;
          top: 16px;
          right: 16px;
          width: 32px;
          height: 32px;
          background: rgba(255, 255, 255, 0.1);
          border: none;
          border-radius: 50%;
          color: var(--text-light);
          font-size: 14px;
          cursor: pointer;
          z-index: 1;
        }

        .modal__header {
          background: var(--surface-dark);
          padding: 32px;
          border-radius: var(--radius-lg) var(--radius-lg) 0 0;
        }

        .modal__header .project-card__status {
          margin-bottom: 16px;
          display: inline-block;
        }

        .modal__header h2 {
          font-size: var(--text-h2);
          color: var(--text-light);
          margin-bottom: 8px;
        }

        .modal__client {
          color: var(--accent);
          font-size: var(--text-body);
        }

        .modal__stats {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
        }

        .modal__stats > div {
          padding: 20px;
          text-align: center;
          border-bottom: 1px solid rgba(0, 0, 0, 0.05);
          border-right: 1px solid rgba(0, 0, 0, 0.05);
        }

        .modal__stats > div:last-child {
          border-right: none;
        }

        .modal__stats-label {
          display: block;
          font-size: 10px;
          text-transform: uppercase;
          letter-spacing: var(--tracking-wide);
          color: var(--text-tertiary);
          margin-bottom: 4px;
        }

        .modal__stats-value {
          font-family: var(--font-display);
          font-size: var(--text-body);
          color: var(--text-primary);
        }

        .modal__body {
          padding: 32px;
        }

        .modal__body h3 {
          font-family: var(--font-display);
          font-size: var(--text-small);
          text-transform: uppercase;
          letter-spacing: var(--tracking-wide);
          color: var(--accent);
          margin-bottom: 16px;
        }

        .modal__body p {
          color: var(--text-secondary);
          line-height: var(--leading-relaxed);
        }

        @media (max-width: 1024px) {
          .projects-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 768px) {
          .stats-bar {
            grid-template-columns: repeat(2, 1fr);
          }

          .stat:nth-child(2) {
            border-right: none;
          }

          .projects-grid {
            grid-template-columns: 1fr;
          }

          .modal__stats {
            grid-template-columns: 1fr;
          }

          .modal__stats > div {
            border-right: none;
          }
        }
      `}</style>
    </div>
  );
};

export default Projects;
