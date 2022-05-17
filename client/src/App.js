import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import SignUp from './components/pages/SignUp';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import Home from './components/pages/Home';

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path='/' exact component={Home}/>
          <Route path='/sign-up' exact component={SignUp}/>
        </Routes>
      </Router>
      <Footer />
    </>
  );
}

export default App;
