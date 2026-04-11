import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { projects } from '../data/projects';

const Gallery = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedIndex, setSelectedIndex] = useState(null);

  const categoryLabels = {
    railway: 'Railway',
    government: 'Government',
    education: 'Education',
    healthcare: 'Healthcare',
    smartcity: 'Smart City'
  };

  const categories = [
    { id: 'all', label: 'All' },
    { id: 'railway', label: 'Railway' },
    { id: 'government', label: 'Government' },
    { id: 'education', label: 'Education' },
    { id: 'healthcare', label: 'Healthcare' },
    { id: 'smartcity', label: 'Smart City' }
  ];

  const galleryItems = projects.map(p => ({
    id: p.id,
    title: p.title,
    client: p.client,
    category: p.category,
    categoryLabel: categoryLabels[p.category]
  }));

  const filteredItems = activeCategory === 'all'
    ? galleryItems
    : galleryItems.filter(item => item.category === activeCategory);

  // Close lightbox if selected index becomes out of bounds (e.g., category changed)
  useEffect(() => {
    if (selectedIndex !== null && selectedIndex >= filteredItems.length) {
      setSelectedIndex(null);
    }
  }, [selectedIndex, filteredItems.length]);

  const handlePrev = useCallback(() => {
    setSelectedIndex(prev => prev === 0 ? filteredItems.length - 1 : prev - 1);
  }, [filteredItems.length]);

  const handleNext = useCallback(() => {
    setSelectedIndex(prev => prev === filteredItems.length - 1 ? 0 : prev + 1);
  }, [filteredItems.length]);

  useEffect(() => {
    if (selectedIndex === null) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setSelectedIndex(null);
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        handlePrev();
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        handleNext();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [selectedIndex, handlePrev, handleNext]);

  return (
    <div className="gallery-page">
      {/* Hero */}
      <section className="gallery-hero">
        <motion.div
          className="gallery-hero__content"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <span className="section-label">Our Work</span>
          <h1>Gallery</h1>
          <p>Visual showcase of construction projects across Rajasthan</p>
        </motion.div>
      </section>

      {/* Filters */}
      <section className="filters-section">
        <div className="filters-inner">
          <div className="filter-btns" role="group" aria-label="Filter by category">
            {categories.map(c => (
              <button
                key={c.id}
                className={`filter-btn ${activeCategory === c.id ? 'filter-btn--active' : ''}`}
                onClick={() => setActiveCategory(c.id)}
                aria-pressed={activeCategory === c.id}
              >
                {c.label}
              </button>
            ))}
          </div>
          <span className="filter-count">{filteredItems.length} Projects</span>
        </div>
      </section>

      {/* Grid */}
      <section className="gallery-section">
        <div className="gallery-grid" aria-label="Project gallery">
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item, index) => (
              <motion.div
                key={item.id}
                className="gallery-item"
                onClick={() => setSelectedIndex(index)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setSelectedIndex(index);
                  }
                }}
                tabIndex={0}
                role="button"
                aria-label={`View ${item.title}`}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                layout
              >
                <div className="item-image">
                  <span className="placeholder" aria-hidden="true">
                    {item.category.charAt(0).toUpperCase()}
                  </span>
                </div>
                <div className="item-info">
                  <h4>{item.title}</h4>
                  <p>{item.categoryLabel}</p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {filteredItems.length === 0 && (
          <div className="no-results">
            <p>No items found for this category.</p>
            <button onClick={() => setActiveCategory('all')}>Show All</button>
          </div>
        )}
      </section>

      {/* Notice */}
      <div className="notice-section">
        <p>Project images coming soon. These are placeholder representations.</p>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedIndex !== null && (
          <motion.div
            className="lightbox"
            onClick={() => setSelectedIndex(null)}
            role="dialog"
            aria-modal="true"
            aria-label={`Viewing ${filteredItems[selectedIndex].title}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <button
              className="lightbox__close"
              onClick={(e) => { e.stopPropagation(); setSelectedIndex(null); }}
              aria-label="Close lightbox"
            >
              <span aria-hidden="true">×</span>
            </button>
            <button
              className="lightbox__nav lightbox__nav--prev"
              onClick={(e) => { e.stopPropagation(); handlePrev(); }}
              aria-label="Previous image"
            >
              <span aria-hidden="true">‹</span>
            </button>
            <button
              className="lightbox__nav lightbox__nav--next"
              onClick={(e) => { e.stopPropagation(); handleNext(); }}
              aria-label="Next image"
            >
              <span aria-hidden="true">›</span>
            </button>
            <motion.div
              className="lightbox__content"
              onClick={e => e.stopPropagation()}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.2 }}
            >
              <div className="lightbox__image">
                <span aria-hidden="true">
                  {filteredItems[selectedIndex].category.charAt(0).toUpperCase()}
                </span>
              </div>
              <div className="lightbox__info">
                <span className="lightbox__category">
                  {filteredItems[selectedIndex].categoryLabel}
                </span>
                <h3>{filteredItems[selectedIndex].title}</h3>
                <p>{filteredItems[selectedIndex].client}</p>
              </div>
            </motion.div>
            <div className="lightbox__counter">
              {selectedIndex + 1} / {filteredItems.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        .gallery-page {
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
        .gallery-hero {
          background: var(--surface-dark);
          padding: 80px var(--container-padding);
          text-align: center;
        }

        .gallery-hero__content {
          max-width: 600px;
          margin: 0 auto;
        }

        .gallery-hero h1 {
          font-size: clamp(48px, 10vw, 80px);
          line-height: var(--leading-hero);
          color: var(--text-light);
          margin-bottom: 16px;
        }

        .gallery-hero p {
          font-size: var(--text-h3);
          color: var(--text-light-secondary);
          margin: 0;
        }

        /* Filters */
        .filters-section {
          background: var(--surface-light);
          padding: 32px 0;
          border-bottom: 1px solid rgba(0, 0, 0, 0.05);
        }

        .filters-inner {
          max-width: var(--container-wide);
          margin: 0 auto;
          padding: 0 var(--container-padding);
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 16px;
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

        .filter-count {
          font-size: var(--text-small);
          color: var(--text-tertiary);
        }

        /* Grid */
        .gallery-section {
          background: var(--surface-light);
          padding: 48px 0 80px;
        }

        .gallery-grid {
          max-width: var(--container-wide);
          margin: 0 auto;
          padding: 0 var(--container-padding);
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 24px;
        }

        .gallery-item {
          background: var(--white);
          border-radius: var(--radius-md);
          overflow: hidden;
          cursor: pointer;
          transition: all var(--transition-fast);
        }

        .gallery-item:hover {
          box-shadow: var(--shadow-card);
          transform: translateY(-4px);
        }

        .gallery-item:focus-visible {
          outline: 2px solid var(--accent);
          outline-offset: 2px;
        }

        .item-image {
          height: 200px;
          background: var(--surface-dark);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .placeholder {
          font-family: var(--font-display);
          font-size: 48px;
          color: rgba(255, 255, 255, 0.2);
        }

        .item-info {
          padding: 20px;
        }

        .item-info h4 {
          font-family: var(--font-display);
          font-size: var(--text-body);
          color: var(--text-primary);
          margin-bottom: 4px;
          line-height: var(--leading-snug);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .item-info p {
          font-size: var(--text-small);
          color: var(--text-tertiary);
          margin: 0;
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

        /* Notice */
        .notice-section {
          max-width: var(--container-wide);
          margin: 0 auto;
          padding: 0 var(--container-padding) 64px;
          background: var(--surface-light);
        }

        .notice-section p {
          text-align: center;
          padding: 24px;
          background: var(--white);
          color: var(--text-tertiary);
          font-size: var(--text-small);
          border-radius: var(--radius-md);
        }

        /* Lightbox */
        .lightbox {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.95);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          padding: var(--container-padding);
        }

        .lightbox__close {
          position: absolute;
          top: 24px;
          right: 24px;
          width: 40px;
          height: 40px;
          background: rgba(255, 255, 255, 0.1);
          border: none;
          border-radius: 50%;
          color: var(--text-light);
          font-size: 24px;
          cursor: pointer;
          transition: background var(--transition-fast);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .lightbox__close:hover {
          background: rgba(255, 255, 255, 0.2);
        }

        .lightbox__nav {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          width: 48px;
          height: 48px;
          background: rgba(255, 255, 255, 0.1);
          border: none;
          border-radius: 50%;
          color: var(--text-light);
          font-size: 28px;
          cursor: pointer;
          transition: background var(--transition-fast);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .lightbox__nav:hover {
          background: rgba(255, 255, 255, 0.2);
        }

        .lightbox__nav--prev { left: 24px; }
        .lightbox__nav--next { right: 24px; }

        .lightbox__content {
          max-width: 700px;
          width: 100%;
          background: var(--white);
          border-radius: var(--radius-lg);
          overflow: hidden;
        }

        .lightbox__image {
          background: var(--surface-dark);
          height: 400px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .lightbox__image span {
          font-family: var(--font-display);
          font-size: 80px;
          color: rgba(255, 255, 255, 0.15);
        }

        .lightbox__info {
          padding: 32px;
          text-align: center;
        }

        .lightbox__category {
          display: inline-block;
          font-size: var(--text-micro);
          text-transform: uppercase;
          letter-spacing: var(--tracking-wide);
          color: var(--accent);
          margin-bottom: 12px;
        }

        .lightbox__info h3 {
          font-family: var(--font-display);
          font-size: var(--text-h2);
          color: var(--text-primary);
          margin-bottom: 8px;
          line-height: var(--leading-tight);
        }

        .lightbox__info p {
          color: var(--text-secondary);
          margin: 0;
        }

        .lightbox__counter {
          position: absolute;
          bottom: 24px;
          left: 50%;
          transform: translateX(-50%);
          font-size: var(--text-small);
          color: var(--text-light-tertiary);
        }

        @media (max-width: 1024px) {
          .gallery-grid {
            grid-template-columns: repeat(3, 1fr);
          }
        }

        @media (max-width: 768px) {
          .gallery-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 16px;
          }

          .item-image {
            height: 160px;
          }

          .lightbox__nav {
            width: 40px;
            height: 40px;
          }

          .lightbox__nav--prev { left: 16px; }
          .lightbox__nav--next { right: 16px; }

          .lightbox__image {
            height: 280px;
          }

          .lightbox__info {
            padding: 24px;
          }
        }

        @media (max-width: 480px) {
          .gallery-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
};

export default Gallery;
