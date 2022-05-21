const { AuthenticationError } = require('apollo-server-express');
const { Profile, Playlist, Track } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        profiles: async () => {
            return await Profile.find().populate('playlists').populate('tracks').populate('tracks');
        },
        me: async (parent, args, context) => {
            if (context.user) {
                return await Profile.findOne(context.user._id);
            }
            throw new AuthenticationError('You need to be logged in!');
        },
        tracks: async () => {
            return await Track.find();
        },
        track: async (parent, { _id }) => {
            return await Track.findById(_id);
        },
        playlists: async () => {
            return await Playlist.find().populate('tracks').populate('author');
        },
        playlist: async (parent, { _id }) => {
            return await Playlist.findById(_id).populate('tracks').populate('author');
        },
        profile: async (parent, { _id }) => {
            return await Profile.findById(_id).populate('playlists').populate('tracks');
        },
    },
    Mutation: {
        addProfile: async (parent, {name, email, password}) => {
            const profile = await Profile.create({ name, email, password});
            const token = signToken(profile);

            return {token, profile};
        },
        login: async (parent, {email, password}) => {
            const profile = await Profile.findOne({email});

            if (!profile) {
                throw new AuthenticationError('Email or Password are incorrect');
            }

            const correctPw = await profile.isCorrectPassword(password);

            if (!correctPw) {
                throw new AuthenticationError('Email or Password are incorrect');
            }

            const token = signToken(profile);
            return {token, profile};
        },
        addTrack: async (parent, { title, artist, album, imageSrc, audioSrc }) => {
            return await Track.create({ title, artist, album, imageSrc, audioSrc });
        },
        addPlaylist: async (parent, { name, author, createdDate}) => {
            return await Track.create({ name, author, createdDate});
        },
    },
};

module.exports = resolvers;