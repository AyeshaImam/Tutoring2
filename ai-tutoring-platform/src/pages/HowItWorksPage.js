// src/pages/HowItWorksPage.js
import React from 'react';
import './HowItWorksPage.css';

const HowItWorksPage = () => {
  const steps = [
    {
      number: '01',
      title: 'Create Your Account',
      description: 'Sign up in minutes and tell us about your learning goals and preferences.',
      icon: '👤'
    },
    {
      number: '02',
      title: 'AI Assessment',
      description: 'Our advanced AI evaluates your current knowledge level and learning style.',
      icon: '🤖'
    },
    {
      number: '03',
      title: 'Personalized Learning Path',
      description: 'Receive a customized curriculum tailored to your needs and goals.',
      icon: '🎯'
    },
    {
      number: '04',
      title: 'Start Learning',
      description: 'Access interactive lessons, quizzes, and real-time progress tracking.',
      icon: '📚'
    },
    {
      number: '05',
      title: 'Expert Support',
      description: 'Get help from our AI tutors and human experts whenever you need it.',
      icon: '🤝'
    },
    {
      number: '06',
      title: 'Track Progress',
      description: 'Monitor your advancement with detailed analytics and achievements.',
      icon: '📊'
    }
  ];

  return (
    <div className="how-it-works-page">
      <div className="hiw-header">
        <h1>How It Works</h1>
        <p className="hiw-subtitle">Your journey to success starts here</p>
      </div>

      <div className="steps-container">
        {steps.map((step, index) => (
          <div className="step-card" key={index}>
            <div className="step-number">{step.number}</div>
            <div className="step-icon">{step.icon}</div>
            <div className="step-content">
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="hiw-cta">
        <h2>Ready to Begin Your Learning Journey?</h2>
        <button className="start-button">Get Started Now</button>
      </div>
    </div>
  );
};

export default HowItWorksPage;
