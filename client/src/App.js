import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignUp from './components/pages/SignUp';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import Home from './components/pages/Home';
import './App.css';

function App() {
  return (
    <div className='container'>
      <Router>
        <Navbar />
        <Routes>
          <Route path='/' exact component={Home}/>
          <Route path='/sign-up' exact component={SignUp}/>
        </Routes>
      </Router>
      <Footer />
    </div>
  );
}

export default App;
