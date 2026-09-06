import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faShieldHalved, faBolt, faUsers } from '@fortawesome/free-solid-svg-icons';

const AboutUs = React.forwardRef((props, ref) => {
  const benefits = [
    { icon: faShieldHalved, title: 'Trust first', text: 'A student-focused experience designed around safer, clearer housing decisions.' },
    { icon: faBolt, title: 'Less stress', text: 'Search, compare and connect without jumping between endless listings and chats.' },
    { icon: faUsers, title: 'Built for community', text: 'A space where students can share experiences and learn from one another.' },
  ];

  return (
    <section ref={ref} className="about-us section-light" id="about-us">
      <div className="section-container about-grid">
        <div className="about-copy">
          <span className="section-eyebrow">Why Renty</span>
          <h2>Housing shouldn't be the hardest part of university.</h2>
          <p className="section-lead">
            Renty is built around a simple idea: finding student accommodation should be easier,
            clearer and more convenient. We bring useful listings and student-focused tools into one place.
          </p>
          <div className="check-list">
            <div><FontAwesomeIcon icon={faCheck} /> Explore accommodation around your campus</div>
            <div><FontAwesomeIcon icon={faCheck} /> Connect with property agents directly</div>
            <div><FontAwesomeIcon icon={faCheck} /> Keep your housing search in one place</div>
          </div>
        </div>

        <div className="about-panel">
          <div className="about-panel-image">
            <img src="/images/house.jpg" alt="Student housing" />
          </div>
          <div className="about-panel-content">
            <span>Our mission</span>
            <h3>Make finding student housing feel straightforward.</h3>
            <p>From the first search to connecting with an agent, every part of Renty is designed to reduce friction.</p>
          </div>
        </div>
      </div>

      <div className="section-container benefit-grid">
        {benefits.map((benefit) => (
          <article className="benefit-card" key={benefit.title}>
            <div className="benefit-icon"><FontAwesomeIcon icon={benefit.icon} /></div>
            <div><h3>{benefit.title}</h3><p>{benefit.text}</p></div>
          </article>
        ))}
      </div>
    </section>
  );
});

export default AboutUs;
