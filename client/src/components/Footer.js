import React from "react";
import { useQuery } from "@apollo/client";
import "./Footer.css";
import { QUERY_ALL_TRACKS } from "./utils/queries";
// import { Link } from 'react-router-dom';
import AudioPlayer from "./AudioPlayer";
// import tracks from '../audio/tracks';

function Footer({ safeMode }) {
  const { loading, data } = useQuery(QUERY_ALL_TRACKS, {
    fetchPolicy: "cache-and-network",
  });
  
  const tracks = data?.tracks.map((track) => ({ ...track })) || []


  return (
    <div className="footer-container">
      {loading ? <div>Loading...</div> : <AudioPlayer tracks={tracks} safeMode={safeMode} />}
    </div>
  );
}

export default Footer;
