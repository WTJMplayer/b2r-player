import React from 'react';

import {
  Box,
  Flex,
  Text,
  Center,
  Button
} from '@chakra-ui/react';
import { makeProcessedFieldsMerger } from '@apollo/client/cache/inmemory/helpers';


const PlaylistItem=({playlists}) => {
  // const btnRef = React.useRef()
  return (
    <>
    {playlists && playlists?.map((playlist) => ( 

      <Flex >
          
        {/* <Link to={`/playlists/${playlist.id}`}> */}
        <Button
          maxW="sm"
          borderWidth="2px"
          rounded="lg"
          shadow="lg"
          position="relative"
          backgroundColor='white'
          >

           { playlist.name } 


        </Button>

      </Flex>

      ))}

    </>
  );
}

export default PlaylistItem;