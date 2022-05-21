import React from "react";
import '../../App.css';
import SongCards from "../SongCards";
import ArtistCards from '../ArtistCards';
import {
    Heading,
    Center,
} from '@chakra-ui/react';


function Dashboard() {

// js code here
// Need to add auth code so it only shows when user is logged in

    return (
        <div>  
            <Center>
                <Heading>
                    Newest Song Uploads!
                </Heading>
            </Center>
            <SongCards />
            <Center>
                <Heading>
                    Artists
                </Heading>
            </Center>
            <ArtistCards />
        </div>    
    );
}

export default Dashboard;