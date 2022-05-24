import React from "react";
import '../../App.css';
import SongCards from "../SongCards";
import ArtistCards from '../ArtistCards';
import {
    Heading,
    Center,
    Flex,
    VStack,
} from '@chakra-ui/react';


function Dashboard() {

// js code here
// Need to add auth code so it only shows when user is logged in

    return (
        <Flex className="dashboard-container" justify="center" align="center">  
            <VStack pb='20vh' pt='5vh'>
                <Center>
                    <Heading color='white'>
                        Newest Song Uploads!
                    </Heading>
                </Center>
                <SongCards />
            </VStack>
        </Flex>   
    );
}

export default Dashboard;