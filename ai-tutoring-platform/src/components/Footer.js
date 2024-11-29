// src/components/Footer.js
import React from 'react';
import '../styles/Footer.css'; // This path must match your directory structure

function Footer() {
  return (
    <footer className="footer">
      <p>© 2024 AI Tutoring Platform. All rights reserved.</p>
      <div className="footer-links">
        <a href="#about">About Us</a>
        <a href="#contact">Contact</a>
        <a href="#privacy">Privacy Policy</a>
      </div>
    </footer>
  );
}

export default Footer;
