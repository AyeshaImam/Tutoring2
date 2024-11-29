import React from 'react';
import './WhyUs.css';

const WhyUs = () => {
  const benefits = [
    {
      title: "AI-Powered Learning",
      description: "Our advanced AI technology adapts to your learning style, providing personalized education paths.",
      icon: "🤖"
    },
    {
      title: "Expert Instructors",
      description: "Learn from qualified professionals with years of teaching and industry experience.",
      icon: "👨‍🏫"
    },
    {
      title: "Flexible Learning",
      description: "Study at your own pace with 24/7 access to course materials and support.",
      icon: "⏰"
    },
    {
      title: "Interactive Content",
      description: "Engage with dynamic content including quizzes, projects, and real-world applications.",
      icon: "💡"
    },
    {
      title: "Progress Tracking",
      description: "Monitor your learning journey with detailed analytics and progress reports.",
      icon: "📊"
    },
    {
      title: "Community Support",
      description: "Join a vibrant community of learners and collaborate on projects.",
      icon: "🤝"
    }
  ];

  return (
    <section className="why-us">
      <div className="why-us-container">
        <h2>Why Choose Our Platform?</h2>
        <p className="subtitle">Discover what makes our learning experience unique</p>
        
        <div className="benefits-grid">
          {benefits.map((benefit, index) => (
            <div key={index} className="benefit-card">
              <div className="benefit-icon">{benefit.icon}</div>
              <h3>{benefit.title}</h3>
              <p>{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyUs; 