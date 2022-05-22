import React from "react";
import '../../App.css';
import {
    Heading,
    SimpleGrid,
    Center,
    Flex,
} from '@chakra-ui/react';
import CardItems from "../CardsItems";

function Artist() {


    return (
        <div className="artist-container">
        <Center>
            <Heading m={3} color='white'> Artist</Heading>
        </Center>
        <Flex align='center' justify='center'>
            <SimpleGrid columns={[2, null, 3]} spacing={4}>
                <CardItems
                    src='/images/fillerimage.jpg'
                    songname='Song name 1'
                    path='/dashboard'
                />
                <CardItems
                    src='/images/fillerimage.jpg'
                    songname='Song name 2'
                    path='/dashboard'
                />
            </SimpleGrid>    
        </Flex>

        </div>
    );
}

export default Artist;