import React from "react";
import '../../App.css';
import SongCards from "../SongCards";
import PlaylistCards from '../PlaylistCards';

function Dashboard() {

// js code here
// Need to add auth code so it only shows when user is logged in

    return (
        <div>
            <SongCards />
            <PlaylistCards />
        </div>    
    );
}

export default Dashboard;