import imgSrc from "../images/logo192.png";
import bb from "../images/bbcover.jpg";
import apes from "./apes.ogg";
import acid from "./acid.ogg";
import bruh from "./bruh.ogg";
import test from "./test.ogg";
// import silence from "./1-hour-of-silence.ogg";

const tracks = [
  // {
  //   title: "",
  //   artist: "",
  //   audioSrc: silence,
  //   image: imgSrc,
  //   color: "#000000",
  // },

  {
    title: "attacked by apes",
    artist: "black's beach",
    audioSrc: apes,
    image: bb,
    color: "#ff0000",
  },
  {
    title: "acid drop",
    artist: "black's beach",
    audioSrc: acid,
    image: bb,
    color: "#00ff00",
  },

  {
    title: "test",
    artist: "test",
    audioSrc: test,
    image: imgSrc,
    color: "#ff00ff",
  },
  {
    title: "bruh",
    artist: "sound effects #2",
    audioSrc: bruh,
    image: imgSrc,
    color: "#0000ff",
  },
];
export default tracks;
