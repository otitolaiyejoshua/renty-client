import React from 'react';

const HowItWorks = () => {
  const steps = [
    {
      title: "1. Search Listings",
      description: "Browse verified property listings near your campus with ease.",
    },
    {
      title: "2. Contact Agents",
      description: "Reach out to trusted agents for property details and availability.",
    },
    {
      title: "3. Book & Move In",
      description: "Book your desired space and move in confidently.",
    },
  ];

  return (
    <section className="how-it-works" style={{ padding: '80px 20px', backgroundColor: '#f5f9fc' }}>
      <h2 className="how-title" style={{ color: '#2e7dc0', fontSize: '2.8rem', marginBottom: '40px', textAlign: 'center' }}>
        How It Works
      </h2>

      <div style={{
        display: 'flex',
        justifyContent: 'space-around',
        flexWrap: 'wrap',
        gap: '30px',
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        {steps.map((step, index) => (
          <div key={index} style={{
            backgroundColor: '#fff',
            borderRadius: '12px',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
            padding: '30px',
            flex: '1 1 300px',
            transition: 'transform 0.3s',
            textAlign: 'center'
          }}>
            <h3 style={{ color: '#2e7dc0', fontSize: '1.6rem', marginBottom: '15px' }}>{step.title}</h3>
            <p style={{ color: '#555', fontSize: '1rem' }}>{step.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HowItWorks;
