const db = require('../config/connection');
const { Playlist, Profile, Track } = require('../models');
import apes from '../public/audio/apes.ogg';
db.once('open', async () => {
    await Track.deleteMany();
  
    const tracks = await Track.insertMany([
        {
            title: 'attacked by apes',
            artist: "black's beach",
            album: "album 1",
            audioSrc: `https://t4.bcbits.com/stream/be412bdb497e7b39d22edffe3f02cfc8/mp3-128/2447719371?p=0&ts=1653265557&t=033f126bb6b789368eb2c72908452b7c044420da&token=1653265557_4b2c002e949b517e133eff1f62dd02117257c5f1`,
            image: '../../client/images/bbcover.jpg',
            color: "#ff0000",
        },
        {
            title: 'acid drop',
            artist: "black's beach",
            album: "album 2",
            audioSrc: '../../client/src/audio/acid.ogg',
            image: '../../client/images/bbcover.jpg',
            color: "#00ff00",
        },
        {
            title: 'test',
            artist: "test",
            album: "album 3",
            audioSrc: '../../client/src/audio/test.ogg',
            image: '../../client/images/logo192.png',
            color: "#ff00ff",        
        },
        {
            title: 'bruh',
            artist: "sound effects",
            album: "album 4",
            audioSrc: '../../client/src/audio/bruh.ogg',
            image: '../../client/images/logo192.png',
            color: "#ff00ff",        
        },
    ]);

    console.log('tracks seeded');

    await Playlist.deleteMany();
  
    const playlists = await Playlist.insertMany([
        {
            name: 'playlist 1',
            createdDate: '5/19/22',
            tracks: [tracks[0]._id, tracks[3]._id]
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
            name: 'Bob',
            email: 'bob@gmail.com',
            password: 'password1',
            tracks: [tracks[3]._id],
            playlists: [playlists[1]]
        }
    ]);

    console.log('profiles seeded');
  
    process.exit();
  });