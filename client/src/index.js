import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import AudioPlayer from './components/AudioPlayer';
import tracks from './tracks';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
    <AudioPlayer tracks={tracks}/>

  </React.StrictMode>
);


