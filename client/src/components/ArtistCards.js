import React from 'react';
import './ArtistCards.css';
import ArtistCardItem from './ArtistCardItem';
import { SimpleGrid } from '@chakra-ui/react'


// Fills in artist cards. Need to figure out how to set up artist
function ArtistCards() {
  return (
    <div className='cards'>
      <h1> Artists</h1>
      <div className='cards__container'>
        <div className='cards__wrapper'>
          <ul className='cards__items'>
            <SimpleGrid
              columns={3}
              spacing={4}
              >
                <ArtistCardItem
                src='images/fillerimage.jpg'
                text='Text describing artist 1'
                label='artist 1'
                path='/dashboard'
                />
                <ArtistCardItem
                src='images/fillerimage.jpg'
                text='Text describing Artist 2'
                label='Artist 2'
                path='/dashboard'
                />
                <ArtistCardItem
                src='images/fillerimage.jpg'
                text='Text describing Artist 3'
                label='Artist 3'
                path='/dashboard'
                />
                <ArtistCardItem
                src='images/fillerimage.jpg'
                text='Text describing Artist 4'
                label='Artist 4'
                path='/dashboard'
                />
                <ArtistCardItem
                src='images/fillerimage.jpg'
                text='Text describing Artist 5'
                label='Artist 5'
                path='/dashboard'
                />
                <ArtistCardItem
                src='images/fillerimage.jpg'
                text='Text describing Artist 5'
                label='Artist 5'
                path='/dashboard'
                />
            </SimpleGrid>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default ArtistCards;
