const { AuthenticationError } = require('apollo-server-express');
const { Profile } = require('../models');
const { signToken } = require('../utils/auth');

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
    },
};

module.exports = resolvers;