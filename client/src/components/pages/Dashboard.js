import React from "react";
import '../../App.css';
import SongCards from "../SongCards";
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
                        Songs available
                    </Heading>
                </Center>
                <SongCards />
            </VStack>
        </Flex>   
    );
}

export default Dashboard;