import React from 'react';
import './Footer.css';
// import { Link } from 'react-router-dom';
import  AudioPlayer  from './AudioPlayer';
import tracks from '../audio/tracks';

function Footer() {
  return (
    <div className='footer-container'>
      <div className='footer-content'>
        <AudioPlayer tracks={tracks} />
        </div>
    </div>
  );
}

export default Footer;