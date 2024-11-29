// src/pages/Home.js
import React from 'react';
import HeroSection from '../components/HeroSection';
import WhyUs from '../components/WhyUs';
import CoursesOffered from '../components/CoursesOffered';
import Testimonials from '../components/Testimonials';
import './Home.css';

const Home = () => {
  return (
    <div className="home">
      <HeroSection />
      <CoursesOffered />
      <WhyUs />
      <Testimonials />
    </div>
  );
};

export default Home;
