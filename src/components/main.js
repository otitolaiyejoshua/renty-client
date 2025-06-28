import React from 'react';

const Main = React.forwardRef((props, ref) => {
  const email = "otitolaiyejoshua42@gmail.com";
  const subject = "Inquiry about services";
  const body = "Hello,\n\nI would like to know more about your services.\n\nBest regards,\n[Your Name]";
  const mailtoLink = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

  return (
    <div
      ref={ref}
      className="main-hero"
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '5% 8%',
        minHeight: '100vh',
        backgroundColor: '#f5f9fc'
      }}
    >
      {/* Left Section */}
      <div style={{ width: '100%', maxWidth: '600px', flex: 1 }}>
        <h1 style={{
          fontSize: '3.5rem',
          color: '#2e7dc0',
          fontWeight: '800',
          lineHeight: '1.2',
          marginBottom: '20px'
        }}>
          Find the Perfect Home
        </h1>
        <p style={{
          fontSize: '1.25rem',
          color: '#444',
          marginBottom: '35px',
          lineHeight: '1.6'
        }}>
          Discover affordable housing near your campus. Verified agents. Trusted listings. Reliable support.
        </p>
        <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
          <a href={mailtoLink} className="contact-btn" style={{
            backgroundColor: '#2e7dc0',
            color: '#fff',
            padding: '15px 25px',
            fontSize: '1rem',
            textDecoration: 'none',
            fontWeight: 'bold',
            borderRadius: '6px',
            boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
            transition: 'all 0.3s ease'
          }}>
            Contact Us
          </a>
          <a className="contact-btn" style={{
            border: '2px solid #2e7dc0',
            color: '#2e7dc0',
            padding: '15px 25px',
            fontSize: '1rem',
            textDecoration: 'none',
            fontWeight: 'bold',
            borderRadius: '6px',
            backgroundColor: '#fff',
            transition: 'all 0.3s ease'
          }}>
            Learn More
          </a>
        </div>
      </div>

      {/* Right Section */}
      <div style={{
        flex: 1,
        minWidth: '300px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '40px'
      }}>
        <img
          src="/images/illustration-house.svg"
          alt="Housing illustration"
          style={{
            width: '100%',
            maxWidth: '500px',
            height: 'auto',
            animation: 'float 6s ease-in-out infinite'
          }}
        />
      </div>
    </div>
  );
});

export default Main;
