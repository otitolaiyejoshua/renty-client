import React from 'react';
const AboutUs = React.forwardRef((props, ref) => {
  return (
    <section ref={ref} className="about-us">
      <h2>About Us</h2>
      <p><strong>Who We Are</strong></p>
      <p>
        <strong>Uniconnect</strong> is a pioneering rental services platform dedicated to bridging the gap between students and affordable housing across all federal universities in the country. Our mission is to provide students with secure, accessible, and budget-friendly rental options, ensuring they can focus on their studies and university life without the stress of housing issues.
      </p>
      <p><strong>Our Vision</strong></p>
      <p>
        To be the leading rental services platform that redefines student housing, creating a community where every student can find a safe, affordable, and convenient place to live near their university.
      </p>
      <p><strong>Our Mission</strong></p>
      <ul>
        <li><strong>Accessibility:</strong> Ensure that every student has access to quality housing options near their university.</li>
        <li><strong>Affordability:</strong> Provide rental options that fit the budgets of students and their families.</li>
        <li><strong>Security:</strong> Offer secure and vetted listings to give students and parents peace of mind.</li>
        <li><strong>Convenience:</strong> Simplify the process of finding, connecting with, and securing housing through a user-friendly platform.</li>
      </ul>
      <p><strong>What We Do</strong></p>
      <p>
        At Uniconnect, we understand the unique challenges that students face when looking for housing. Our platform offers:
      </p>
      <ul>
        <li><strong>Comprehensive Listings:</strong> A wide range of rental properties from verified landlords, including apartments, shared houses, and dormitory-style accommodations.</li>
        <li><strong>Advanced Search:</strong> Filter properties based on location, price, amenities, and more to find the perfect fit.</li>
        <li><strong>Secure Connections:</strong> Directly connect with landlords through our platform, ensuring a safe and transparent communication process.</li>
        <li><strong>Community Support:</strong> Access to a vibrant community forum where students can share experiences, ask questions, and support each other.</li>
      </ul>
      <p><strong>Our Values</strong></p>
      <ul>
        <li><strong>Integrity:</strong> We maintain the highest standards of honesty and transparency in all our dealings.</li>
        <li><strong>Innovation:</strong> Continuously improve our platform to meet the evolving needs of students.</li>
        <li><strong>Community:</strong> Foster a sense of belonging and support among our users.</li>
        <li><strong>Excellence:</strong> Strive for excellence in every aspect of our service, from customer support to platform functionality.</li>
      </ul>
      <p><strong>Our Story</strong></p>
      <p>
        Founded by a group of university graduates who faced housing challenges during their studies, Uniconnect was created to provide a better solution for future generations. We began with a vision to make student housing stress-free and have since grown to serve students in all federal universities across the country.
      </p>
    </section>
  );
});

export default AboutUs;
