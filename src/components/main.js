import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faShieldHalved, faLocationDot, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

const Main = React.forwardRef((props, ref) => {
  return (
    <main ref={ref} className="main-hero" id="home">
      <div className="hero-orb hero-orb-one" />
      <div className="hero-orb hero-orb-two" />

      <div className="hero-content">
        <div className="eyebrow">
          <span className="eyebrow-dot" />
          Student housing, made simpler
        </div>

        <h1>Find a place that feels <span>like home.</span></h1>
        <p className="hero-copy">
          Discover student-friendly apartments and rooms near your campus. Compare options,
          connect with agents, and make your next move with confidence.
        </p>

        <div className="hero-actions">
          <Link to="/search" className="hero-primary">
            Find a home <FontAwesomeIcon icon={faArrowRight} />
          </Link>
          <a href="#how-it-works" className="hero-secondary">How Renty works</a>
        </div>

        <div className="hero-trust">
          <span><FontAwesomeIcon icon={faShieldHalved} /> Student-focused</span>
          <span><FontAwesomeIcon icon={faLocationDot} /> Near your campus</span>
          <span><FontAwesomeIcon icon={faMagnifyingGlass} /> Easy to search</span>
        </div>
      </div>

      <div className="hero-visual" aria-label="Renty property search preview">
        <div className="visual-glow" />
        <div className="property-showcase">
          <img src="/images/interiorimage.png" alt="Modern student apartment interior" />
          <div className="showcase-gradient" />
          <div className="showcase-topline">
            <span className="verified-pill"><FontAwesomeIcon icon={faShieldHalved} /> Trusted listing</span>
            <span className="showcase-heart">♡</span>
          </div>
          <div className="showcase-info">
            <span>Student-friendly apartment</span>
            <strong>Find your next home</strong>
            <small>Comfortable spaces close to campus</small>
          </div>
        </div>
        <div className="floating-card floating-card-one">
          <span className="floating-icon"><FontAwesomeIcon icon={faLocationDot} /></span>
          <div><small>Search smarter</small><strong>Near your campus</strong></div>
        </div>
        <div className="floating-card floating-card-two">
          <span className="floating-icon"><FontAwesomeIcon icon={faShieldHalved} /></span>
          <div><small>Built for students</small><strong>Simple & reliable</strong></div>
        </div>
      </div>

      <div className="hero-bottom-fade" />
    </main>
  );
});

export default Main;
