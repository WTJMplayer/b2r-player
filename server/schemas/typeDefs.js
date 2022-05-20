const { gql } = require('apollo-server-express');

const typeDefs = gql `
type Profile {
    _id: ID
    name: String
    email: String
    password: String
}
type Track {
    _id: ID
    title: String
    artist: String
    album: String
    imageSrc: String
    audioSrc: String
}
type Playlist {
    _id: ID
    name: String
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
    playlist: (_id: ID!): Playlist
}
type Auth {
    token: ID
    profile: Profile
}
type Mutation {
    addProfile(name: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
}
`;

module.exports = typeDefs;