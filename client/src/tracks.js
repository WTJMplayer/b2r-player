import imgSrc from "./images/logo192.png";
import bb from "./images/bbcover.jpg";
import apes from './audio/apes.ogg'; 
import acid from './audio/acid.wav';

import test from './audio/test.ogg';
const tracks = [
  {
    title: 'attacked by apes',
    artist: "black's beach",
    audioSrc: apes,
    image: bb,
    color: "#ff0000",
  },
  {
    title: 'acid drop',
    artist: "black's beach",
    audioSrc: acid,
    image: bb,
    color: "#00ff00",

  },

  {
    title: 'test',
    artist: "test",
    audioSrc: test,
    image: imgSrc,
    color: "#ff00ff",
  }
];
export default tracks;
