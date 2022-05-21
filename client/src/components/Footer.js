import React from 'react';
import './Footer.css';
// import { Link } from 'react-router-dom';
import  AudioPlayer  from './AudioPlayer';
import tracks from '../audio/tracks';

function Footer() {
  return (
    <div className='footer-container'>
        <AudioPlayer tracks={tracks} />
    </div>
  );
}

export default Footer;