import React from 'react';
import './Cards.css';
import CardItems from './CardsItems';
import { SimpleGrid } from '@chakra-ui/react'


// Fills in artist cards. Need to figure out how to set up artist
function ArtistCards() {
  return (
    <div>
      <div className='cards__container'>
        <div className='cards__wrapper'>
          <ul className='cards__items'>
            <SimpleGrid
              columns={3}
              spacing={4}
              >
                <CardItems
                src='images/fillerimage.jpg'
                text='Text describing artist 1'
                artist='Artist 1'
                path='/artist'
                />
                <CardItems
                src='images/fillerimage.jpg'
                text='Text describing Artist 2'
                artist='Artist 2'
                path='/artist'
                />
                <CardItems
                src='images/fillerimage.jpg'
                text='Text describing Artist 3'
                artist='Artist 3'
                path='/artist'
                />
                <CardItems
                src='images/fillerimage.jpg'
                text='Text describing Artist 4'
                artist='Artist 4'
                path='/artist'
                />
                <CardItems
                src='images/fillerimage.jpg'
                text='Text describing Artist 5'
                artist='Artist 5'
                path='/artist'
                />

            </SimpleGrid>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default ArtistCards;
