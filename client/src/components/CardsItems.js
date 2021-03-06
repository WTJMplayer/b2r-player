import React from 'react';
import AddToPlaylist from './AddToPlaylist'
import EditSongDetails from './EditSongDetails';
import { Link } from 'react-router-dom';
import DeleteButton from './DeleteButton';
import {
  Box,
  Flex,
  Text,
  Image,
  Center,
} from '@chakra-ui/react';
import { makeProcessedFieldsMerger } from '@apollo/client/cache/inmemory/helpers';

// Set up for card format, will use designated props
const CardItems=({tracks}) => {

  return (
    <>
    {tracks && tracks?.map((track) => ( 

      <Flex 
        align='center' 
        justify='center'
        wrap='wrap'
        >
          
        {/* <Link to={`/tracks/${track.id}`}> */}
        <Box
          maxW="sm"
          borderWidth="2px"
          rounded="lg"
          shadow="lg"
          position="relative"
          backgroundColor='white'
          >

            <Image
            roundedTop="lg"
            src={ track.image } 
            alt={`Picture of ${track.title}`}
            fallbackSrc= '\public\images\fillerimage.jpg'
            boxSize='300px'
            />

            <Box>
            <Center>
                <Text fontSize='lg' m={2}> { track.artist } </Text>
            </Center>
            <Center>
                <Text fontSize='lg' m={2}> { track.title } </Text>
            </Center>
            <Flex justify='space-between'>
                  <AddToPlaylist/>
                  <EditSongDetails 
                    trackId={track._id}/> 
                  <DeleteButton 
                    value={track._id}
                    trackId={track._id}
                    /> 
                </Flex>
            </Box>

        </Box>
        {/* </Link> */}
      </Flex>

      ))}

    </>
  );
}

export default CardItems;
