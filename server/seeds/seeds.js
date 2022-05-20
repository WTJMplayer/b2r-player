const db = require('../config/connection');
const { Playlist, Profile, Track } = require('../models');

db.once('open', async () => {
    await Track.deleteMany();
  
    const tracks = await Track.insertMany([
        {
            title: 'attacked by apes',
            artist: "black's beach",
            audioSrc: '../../client/src/audio/apes.ogg',
            imageSrc: '../../client/images/bbcover.jpg',
            color: "#ff0000",
        },
        {
            title: 'acid drop',
            artist: "black's beach",
            audioSrc: '../../client/src/audio/acid.ogg',
            imageSrc: '../../client/images/bbcover.jpg',
            color: "#00ff00",
        },
        {
            title: 'test',
            artist: "test",
            audioSrc: '../../client/src/audio/test.ogg',
            imageSrc: '../../client/images/logo192.jpg',
            color: "#ff00ff",        
        },
        {
            title: 'bruh',
            artist: "sound effects",
            audioSrc: '../../client/src/audio/bruh.ogg',
            imageSrc: '../../client/images/logo192.jpg',
            color: "#ff00ff",        
        },
    ]);
  
    console.log('tracks seeded');
  
    await Profile.deleteMany();
  
    const profiles = await Profile.insertMany([
        {
            name: 'Jim',
            email: 'jim@gmail.com',
            password: 'password1',
        },
        {
            name: 'Bob',
            email: 'bob@gmail.com',
            password: 'password1',
        }
    ]);

    console.log('profiles seeded');

    await Playlist.deleteMany();
  
    const playlists = await Playlist.insertMany([
        {
            name: 'playlist 1',
            author: profiles[0]._id,
            createdDate: '5/19/22',
            tracks: [tracks[0]._id, tracks[3]._id]
        },
        {
            name: 'playlist 2',
            author: profiles[0]._id,
            createdDate: '5/19/22',
            tracks: [tracks[1]._id, tracks[2]._id]
        },
        {
            name: 'playlist 3',
            author: profiles[1]._id,
            createdDate: '5/19/22',
            tracks: [tracks[2]._id, tracks[3]._id, tracks[0]._id, tracks[1]._id]     
        },
    ]);
  
    console.log('playlists seeded');
  
    process.exit();
  });