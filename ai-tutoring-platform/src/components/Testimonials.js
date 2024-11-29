// src/components/Testimonials.js
import React from 'react';
import './Testimonials.css';

const Testimonials = () => {
  return (
    <section id="testimonials" className="testimonials-section">
      <h2>What Our Users Say</h2>
      <div className="testimonials">
        <blockquote>
          "Thanks to the AI-powered platform, my grades improved dramatically!" – Sarah M.
        </blockquote>
        <blockquote>
          "I’m so impressed with how my child has progressed." – John D.
        </blockquote>
      </div>
    </section>
  );
};

export default Testimonials;
