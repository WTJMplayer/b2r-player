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

      <Flex 
        align='center' 
        justify='center'
        wrap='wrap'
        >
          
        {/* <Link to={`/playlists/${playlist.id}`}> */}
        <Box
          maxW="sm"
          borderWidth="2px"
          rounded="lg"
          shadow="lg"
          position="relative"
          backgroundColor='white'
          >

            <Box>
            <Center>
                <Button fontSize='lg' m={2}> { playlist.name } </Button>
            </Center>
            </Box>

        </Box>

      </Flex>

      ))}

    </>
  );
}

export default PlaylistItem;