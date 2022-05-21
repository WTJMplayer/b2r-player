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
        <>
        <Center>
            <Heading m={3}> Artist</Heading>
        </Center>
        <Flex align='center' justify='center'>
            <SimpleGrid columns={2} spacing={5}>
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

        </>
    );
}

export default Artist;