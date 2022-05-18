import React from 'react';
import './SongCards.css';
import SongCardItem from './SongCardItem';


// What fills in the song cards, need to figure out how to link to songs from database
function SongCards() {
  return (
    <div className='cards'>
      <h1> Newest Song Uploads </h1>
      <div className='cards__container'>
        <div className='cards__wrapper'>
          <ul className='cards__items'>
            <SongCardItem
              src='images/fillerimage.jpg'
              text='Song name 1'
              label='Artist 1'
              path='/dashboard'
            />
            <SongCardItem
              src='images/fillerimage.jpg'
              text='Song name 2'
              label='Artist 2'
              path='/dashboard'
            />
            <SongCardItem
              src='images/fillerimage.jpg'
              text='song name 3'
              label='Artist 3'
              path='/dashboard'
            />
          </ul>
        </div>
      </div>
    </div>
  );
}

export default SongCards;
