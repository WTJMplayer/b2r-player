import React from 'react';
import '../../App.css';
import HeroSection from '../HeroSection';
import Footer from '../Footer';
import Login from '../Login';

function Home() {
  return (
    <>
      <HeroSection />
      <Login />
      <Footer />
    </>
  );
}

export default Home;