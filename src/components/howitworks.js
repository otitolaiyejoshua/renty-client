import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faComments, faKey } from '@fortawesome/free-solid-svg-icons';

const HowItWorks = () => {
  const steps = [
    { number: '01', icon: faMagnifyingGlass, title: 'Search', description: 'Browse housing options around your university and narrow them down to what fits you.' },
    { number: '02', icon: faComments, title: 'Connect', description: 'Reach out to an agent, ask questions and get the details you need before deciding.' },
    { number: '03', icon: faKey, title: 'Move forward', description: 'Choose the place that works for you and take the next step with confidence.' },
  ];

  return (
    <section className="how-it-works" id="how-it-works">
      <div className="section-container">
        <div className="section-title centered">
          <span className="section-eyebrow">Simple by design</span>
          <h2>Find your next place in three steps.</h2>
          <p>Renty keeps the housing search focused, practical and easy to understand.</p>
        </div>

        <div className="steps-grid">
          {steps.map((step) => (
            <article className="step-card" key={step.number}>
              <div className="step-top"><span>{step.number}</span><div className="step-icon"><FontAwesomeIcon icon={step.icon} /></div></div>
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
