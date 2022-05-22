import React from "react";
import { useQuery } from "@apollo/client";
import "./Footer.css";
import { QUERY_ALL_TRACKS } from "./utils/queries";
// import { Link } from 'react-router-dom';
import AudioPlayer from "./AudioPlayer";
// import tracks from '../audio/tracks';

function Footer() {
  const { loading, data } = useQuery(QUERY_ALL_TRACKS, {
    fetchPolicy: "cache-and-network",
    
  });
  let tracks =
    data?.tracks.map((track) => ({ ...track })) || []

  return (
    <div className="footer-container">
      {loading ? <div>Loading...</div> : <AudioPlayer tracks={tracks} />}
    </div>
  );
}

export default Footer;
