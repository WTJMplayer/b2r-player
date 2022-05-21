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
    image: String
    audioSrc: String
}

type Query {
    profiles: [Profile]
    me: Profile
    tracks: [Track]
}
type Auth {
    token: ID
    profile: Profile
}
type Mutation {
    addProfile(name: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    addTrack(title: String!, artist: String!, album: String!, image: String!, audioSrc: String!): Track
}
`;

module.exports = typeDefs;