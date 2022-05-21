import React from 'react';
import './Cards.css';
import CardItems from './CardsItems';
import { 
  SimpleGrid, 
  Flex, 
  Box,
} from '@chakra-ui/react'
import AddToPlaylist from './AddToPlaylist'
import EditSongDetails from './EditSongDetails';

// What fills in the song cards, need to figure out how to link to songs from database
function SongCards() {
  const breakpoints = {
    sm: '30em',
    md: '48em',
    lg: '62em',
    xl: '80em',
    '2xl': '96em',
  }

  return (
    <>
      <Flex 
        align='center'
        justify='center'
        wrap='wrap'
        >
      <Box className='cards__container'  >
        <div className='cards__wrapper'>
          <ul className='cards__items'>
            <SimpleGrid
              columns={3}
              spacing={4}
              >
              <Box>
                <CardItems
                  src='images/fillerimage.jpg'
                  songname='Song name 1'
                  artist='Artist 1'
                  path='/dashboard'
                  />
                  <Flex justify='space-between'>
                    <AddToPlaylist />
                    <EditSongDetails 
                      songname='Song name 1'
                      artist='Artist 1'/> 
                  </Flex>
              </Box>

              <Box>
                <CardItems
                  src='images/fillerimage.jpg'
                  songname='Song name 2'
                  artist='Artist 2'
                  path='/dashboard'
                  />
                    <Flex justify='space-between'>
                      <AddToPlaylist />
                      <EditSongDetails 
                        songname='Song name 2'
                        artist='Artist 2'/> 
                    </Flex>
              </Box>

              <Box>
                <CardItems
                  src='images/fillerimage.jpg'
                  songname='Song name 3'
                  artist='Artist 3'
                  path='/dashboard'
                  />
                    <Flex justify='space-between'>
                      <AddToPlaylist />
                      <EditSongDetails 
                        songname='Song name 3'
                        artist='Artist 3'/> 
                    </Flex>
              </Box>

              <Box>
                <CardItems
                  src='images/fillerimage.jpg'
                  songname='Song name 4'
                  artist='Artist 4'
                  path='/dashboard'
                  />
                    <Flex justify='space-between'>
                      <AddToPlaylist />
                      <EditSongDetails 
                        songname='Song name 4'
                        artist='Artist 4'
                        /> 
                    </Flex>
              </Box>

            </SimpleGrid>
          </ul>
        </div>
      </Box>
      </Flex>
    </>
  );
}

export default SongCards;
