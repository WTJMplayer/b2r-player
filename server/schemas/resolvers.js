const { AuthenticationError } = require('apollo-server-express');
const { Profile, Track, Playlist } = require('../models');
const { signToken } = require('../utils/auth');
const { convertAudio } = require('../utils/convertAudio');

const resolvers = {
    Query: {
        profiles: async () => {
            return await Profile.find();
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
    },
    Mutation: {
        addTrack: async (parent, args, context) => {
            const track = await Track.create(args);
                return track;
            if (context.user) {
                throw new AuthenticationError('You need to be logged in!');    
            }
            
        },
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
    },
};

module.exports = resolvers;