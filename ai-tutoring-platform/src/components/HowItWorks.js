// src/components/HowItWorks.js
import React from 'react';
import './HowItWorks.css'; // Ensure this path is correct

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="how-it-works-section">
      <h2>How It Works</h2>
      <ol>
        <li>Sign Up: Create your account in just a few minutes.</li>
        <li>Personal Assessment: Our AI conducts an initial assessment to understand your learning needs.</li>
        <li>Get Personalized Lessons: Receive customized lessons tailored to your pace and preferences.</li>
        <li>Live Support: Book sessions with our expert tutors for additional guidance whenever you need it.</li>
      </ol>
    </section>
  );
};

export default HowItWorks;
