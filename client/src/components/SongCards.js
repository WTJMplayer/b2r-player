import React from 'react';
import './Cards.css';
import CardItems from './CardsItems';
import { 
  SimpleGrid, 
  Flex, 
  Box,
} from '@chakra-ui/react'
import { useQuery } from '@apollo/client';
import { QUERY_ALL_TRACKS } from './utils/queries';

// What fills in the song cards, need to figure out how to link to songs from database
const SongCards = () => {
  const { loading, data } = useQuery(QUERY_ALL_TRACKS);
  const tracks = data?.tracks || [];
  console.log(tracks)

  return (
    <>
  
      <div className='cards__container'  >
        <div className='cards__wrapper'>
          <ul className='cards__items'>
            <SimpleGrid
              columns={[2, null, 3]}
              spacing={4}

              >
              {/* <Box> */}
              {loading ? (
                <div>Loading...</div>
             ) : (
              <CardItems
                tracks= {tracks}
              />
          )}
              {/* </Box> */}


            </SimpleGrid>
          </ul>
        </div>
      </div>
    </>
  );
}

export default SongCards;
