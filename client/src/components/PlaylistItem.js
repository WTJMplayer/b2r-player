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

      <>
          
        {/* <Link to={`/playlists/${playlist.id}`}> */}
        <Button
          position="center"
          backgroundColor='white'
          >
           { playlist.name } 
        </Button>

      </>

      ))}

    </>
  );
}

export default PlaylistItem;