import React from 'react';

const AboutUs = React.forwardRef((props, ref) => {
  return (
    <section ref={ref} className="about-us" style={{
      backgroundColor: '#f5f9fc',
      padding: '80px 20px',
      color: '#444',
      fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif'
    }}>
      <h2 style={{ color: '#2e7dc0', fontSize: '2.8rem', textAlign: 'center', marginBottom: '40px' }}>
        About Us
      </h2>

      <div style={{ maxWidth: '1000px', margin: '0 auto', lineHeight: '1.8' }}>
        <section style={{ marginBottom: '40px' }}>
          <h3 style={{ color: '#2e7dc0' }}>Who We Are</h3>
          <p>
            <strong>Renty</strong> is a trailblazing rental solutions platform purpose-built to connect university students with affordable, verified housing across federal institutions nationwide.
            We’re on a mission to eliminate the stress of student accommodation by making housing safe, accessible, and tailored to student needs.
          </p>
        </section>

        <section style={{ marginBottom: '40px' }}>
          <h3 style={{ color: '#2e7dc0' }}>Our Vision</h3>
          <p>
            To revolutionize the student housing experience in Nigeria by creating a trusted ecosystem where every student can find quality, affordable housing near their campus—quickly, securely, and confidently.
          </p>
        </section>

        <section style={{ marginBottom: '40px' }}>
          <h3 style={{ color: '#2e7dc0' }}>Our Mission</h3>
          <ul style={{ paddingLeft: '20px' }}>
            <li><strong>Accessibility:</strong> Bridge the gap between students and housing providers by curating listings in every university environment.</li>
            <li><strong>Affordability:</strong> Provide competitively priced options that reflect the realities of student budgets.</li>
            <li><strong>Security:</strong> Vet listings and landlords to ensure peace of mind for students and their families.</li>
            <li><strong>Convenience:</strong> Streamline the housing search process with intuitive tools, filters, and direct messaging features.</li>
          </ul>
        </section>

        <section style={{ marginBottom: '40px' }}>
          <h3 style={{ color: '#2e7dc0' }}>What We Offer</h3>
          <ul style={{ paddingLeft: '20px' }}>
            <li><strong>Verified Listings:</strong> Access a wide range of student-appropriate rentals, from apartments to shared and dorm-style accommodations.</li>
            <li><strong>Smart Search:</strong> Filter by price, proximity, amenities, and property type to find your perfect match with ease.</li>
            <li><strong>Secure Interactions:</strong> Communicate directly with property owners through a secure platform, ensuring transparency and authenticity.</li>
            <li><strong>Student Community:</strong> Join a thriving network of student users where experiences are shared, questions are answered, and guidance is exchanged.</li>
          </ul>
        </section>

        <section style={{ marginBottom: '40px' }}>
          <h3 style={{ color: '#2e7dc0' }}>Our Core Values</h3>
          <ul style={{ paddingLeft: '20px' }}>
            <li><strong>Integrity:</strong> We prioritize honesty, transparency, and trust in all our operations.</li>
            <li><strong>Innovation:</strong> We continuously evolve our platform to stay aligned with the modern student lifestyle.</li>
            <li><strong>Excellence:</strong> We hold ourselves to the highest standards—whether in platform performance, customer care, or user experience.</li>
          </ul>
        </section>

        <section>
          <h3 style={{ color: '#2e7dc0' }}>Our Story</h3>
          <p>
            Renty was born out of personal experience. Our founders—former students who struggled to secure suitable accommodation—recognized a systemic challenge and committed to solving it. What began as a vision has grown into a nationwide platform serving thousands of students across federal universities. Today, Renty stands as a symbol of convenience, safety, and empowerment in the student housing space.
          </p>
        </section>
      </div>
    </section>
  );
});

export default AboutUs;
