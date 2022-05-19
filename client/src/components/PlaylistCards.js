import React from 'react';
import './PlaylistCards.css';
import PlaylistCardItem from './PlaylistCardItem';
import Carousel from 'nuka-carousel';


// Fills in playlist cards. Need to figure out how to set up playlist
function PlaylistCards() {
  return (
    <div className='cards'>
      <h1> Playlists</h1>
      <div className='cards__container'>
        <div className='cards__wrapper'>
          <ul className='cards__items'>
            <Carousel
            slidesToShow={3}
            swiping={true}>
                <PlaylistCardItem
                src='images/fillerimage.jpg'
                text='Text describing playlist 1'
                label='Playlist 1'
                path='/dashboard'
                />
                <PlaylistCardItem
                src='images/fillerimage.jpg'
                text='Text describing playlist 2'
                label='Playlist 2'
                path='/dashboard'
                />
                <PlaylistCardItem
                src='images/fillerimage.jpg'
                text='Text describing playlist 3'
                label='Playlist 3'
                path='/dashboard'
                />
                <PlaylistCardItem
                src='images/fillerimage.jpg'
                text='Text describing playlist 4'
                label='Playlist 4'
                path='/dashboard'
                />
                <PlaylistCardItem
                src='images/fillerimage.jpg'
                text='Text describing playlist 5'
                label='Playlist 5'
                path='/dashboard'
                />
                <PlaylistCardItem
                src='images/fillerimage.jpg'
                text='Text describing playlist 5'
                label='Playlist 5'
                path='/dashboard'
                />
            </Carousel>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default PlaylistCards;
