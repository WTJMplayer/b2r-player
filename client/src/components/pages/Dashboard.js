import React from "react";
import '../../App.css';
import SongCards from "../SongCards";
import ArtistCards from '../ArtistCards';
import DashboardDrawer from "../DashboardDrawer";
import SongDrawer from '../SongDrawer';

function Dashboard() {

// js code here
// Need to add auth code so it only shows when user is logged in

    return (
        <div>
            <DashboardDrawer />
            <br />
            <br />
            <SongDrawer />
            <SongCards />
            <ArtistCards />
        </div>    
    );
}

export default Dashboard;