// src/components/HeroSection.js
import React from 'react';
import './HeroSection.css';

const HeroSection = () => {
  return (
    <section className="hero">
      <h2>Welcome to the AI-Powered Tutoring Platform!</h2>
      <p>This platform provides personalized learning experiences tailored to your needs.</p>
      <button className="cta-button">Get Started</button>
    </section>
  );
};

export default HeroSection;
