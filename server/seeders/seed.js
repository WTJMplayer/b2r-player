const db = require('../config/connection');
const { Profile, Track, Playlist } = require('../models');

db.once('open', async () => {
  try {
    await Profile.deleteMany({});

    await Track.deleteMany();
  
    const tracks = await Track.insertMany([
        {
            title: 'attacked by apes',
            artist: "black's beach",
            album: "album 1",
            audioSrc: 'http://164.90.135.34/public/audio/apes.ogg',
            image: 'http://164.90.135.34//public/images/bbcover.jpg',
            color: "#ff0000",
        },
        {
            title: 'acid drop',
            artist: "black's beach",
            album: "album 2",
            audioSrc: 'http://164.90.135.34//public/audio/acid.ogg',
            image: 'http://164.90.135.34//public/images/bbcover.jpg',
            color: "#00ff00",
        },
        {
            title: 'test',
            artist: "test",
            album: "album 3",
            audioSrc: 'http://164.90.135.34//public/audio/test.ogg',
            image: 'http://164.90.135.34//public/images/logo.png',
            color: "#ff00ff",        
        },
        {
            title: 'bruh',
            artist: "sound effects",
            album: "album 4",
            explicit: true,
            audioSrc: 'http://164.90.135.34//public/audio/bruh.ogg',
            image: 'http://164.90.135.34//public/images/logo.png',
            color: "#ff00ff",        
        },
    ]);

    console.log('tracks seeded');

    await Playlist.deleteMany();
  
    const playlists = await Playlist.insertMany([
        {
            name: 'playlist 1',
            createdDate: '5/19/22',
            tracks: [tracks[0]._id, tracks[1]._id]
        },
        {
            name: 'playlist 2',
            createdDate: '5/19/22',
            tracks: [tracks[1]._id, tracks[2]._id]
        },
        {
            name: 'playlist 3',
            createdDate: '5/19/22',
            tracks: [tracks[2]._id, tracks[3]._id, tracks[0]._id, tracks[1]._id]     
        },
    ]);
  
    console.log('playlists seeded');

    await Profile.deleteMany();
  
    const profiles = await Profile.insertMany([
        {
            name: 'Jim',
            email: 'jim@gmail.com',
            password: 'password1',
            tracks: [tracks[2]._id, tracks[0]._id, tracks[1]._id],
            playlists: [playlists[3], playlists[0]]
        },
        {
            name: 'Bobb',
            email: 'bob@gmail.com',
            password: 'password1',
            tracks: [tracks[3]._id],
            playlists: [playlists[1]]
        },
        {
            name: "trent",
            email: "trent@email.com",
            password: "password123",
            tracks: [],
            playlists: []
          },
          {
            name: "Jesse",
            email: "jesse@email.com",
            password: "password123",
            tracks: [],
            playlists: []
          },
          {
            name: "Will",
            email: "will@email.com",
            password: "password123",
            tracks: [],
            playlists: []
          },
          {
            name: "Mitchell",
            email: "mitchell@email.com",
            password: "password123",
            tracks: [],
            playlists: []
          }
    ]);

    console.log('profiles seeded');

  } catch (err) {
    console.error(err);
    process.exit(1);
  }

  console.log('all done!');
  process.exit(0);
});