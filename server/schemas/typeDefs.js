const { gql } = require('apollo-server-express');

const typeDefs = gql `
scalar Upload

type File {
    filename: String!
    mimetype: String!
    encoding: String!
}


type Profile {
    _id: ID!
    name: String
    email: String
    password: String
    tracks: [Track]
    playlists: [Playlist]
}
type Track {
    _id: ID
    title: String!
    artist: String!
    album: String!
    explicit: Boolean!
    image: String
    audioSrc: String!
    color: String
}
type Playlist {
    _id: ID
    name: String!
    author: [Profile]
    createdDate: String
    tracks: [Track]
}

type Query {
    profiles: [Profile]
    me: Profile
    tracks: [Track]
    playlists: [Playlist]
    track(_id: ID!): Track
    playlist(_id: ID!, author: ID!): Playlist
    profile(_ID: ID!): Profile
}
type Auth {
    token: ID
    profile: Profile
}
type Mutation {
    singleUpload(file: Upload!): File!
    addProfile(name: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    addTrack(title: String!, artist: String!, album: String!, explicit: Boolean!, image: String!, audioSrc: String!, color: String): Track
    addPlaylist(name: String!, author: ID!): Playlist
    addPlaylistToProfile(_id: ID!, playlistId: ID!): Profile
    addTrackToProfile(_id: ID!, trackId: ID!): Profile
    addToPlaylist(_id: ID!, trackId: ID!): Playlist
    removeFromPlaylist(_id: ID!, trackId: ID!): Playlist
    deleteTrack(_id:ID!): Track
    deletePlaylist(_id:ID!): Playlist
}
`;

module.exports = typeDefs;