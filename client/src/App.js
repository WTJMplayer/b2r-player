import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import Home from './components/pages/Home';
import './App.css';
import Dashboard from './components/pages/Dashboard';
import Artist from './components/pages/Artist';

function App() {
  
  return (
    
    <div className='container'>
      <Router>
        <Navbar />
        <Routes>
          <Route path='/' element={< Home />}/>
          <Route path='/dashboard' element={< Dashboard />}/>
          <Route path='/artist' element={< Artist />} />
        </Routes>
      </Router>
      <Footer />
    </div>
  );
}

export default App;
