import React from 'react';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './components/pages/Home';
import SignUp from './components/pages/SignUp';
import Footer from './components/Footer';
import HeroSection from './components/HeroSection';


function App() {
  return (
    <>
      <Router>
        <Navbar />
        <HeroSection />
        <Routes>
          <Route path='/' exact component={Home}/>
          <Route path='/sign-up' exact component={SignUp}/>
        </Routes>
        <Footer />
      </Router>
    </>
  );
}

export default App;
