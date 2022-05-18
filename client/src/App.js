import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignUp from './components/pages/SignUp';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import Home from './components/pages/Home';
import './App.css';
import AudioUpload from './components/AudioUpload';

function App() {
  return (
    <div className='container'>
      <Router>
        <Navbar />
        <Routes>
          <Route path='/' element={< Home />}/>
          <Route path='/sign-up' element={< SignUp />}/>
        </Routes>
      </Router>
      <AudioUpload />
      <Footer />
    </div>
  );
}

export default App;
