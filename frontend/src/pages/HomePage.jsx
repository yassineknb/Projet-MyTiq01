import React from 'react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import HeroSection from '../components/home/HeroSection';
import StatsSection from '../components/home/StatsSection';
import EventsSection from '../components/home/EventsSection';
import FeaturesSection from '../components/home/FeaturesSection';
import NewsletterSection from '../components/home/NewsletterSection';

const HomePage = () => {
  return (
    <>
      <Navbar />
      <HeroSection />
      <StatsSection />
      <EventsSection />
      <FeaturesSection />
      <NewsletterSection />
      <Footer />
    </>
  );
};

export default HomePage;