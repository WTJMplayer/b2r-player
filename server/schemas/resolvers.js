const { AuthenticationError } = require("apollo-server-express");
const { Profile, Track, Playlist } = require("../models");
const { signToken } = require("../utils/auth");
const { convertAudio } = require("../utils/convertAudio");
const fs = require("fs");
const path = require("path");
const { GraphQLUpload } = require("graphql-upload");
const { on } = require("events");
const { finished } = require("stream/promises");

const resolvers = {
  Query: {
    profiles: async () => {
      return await Profile.find()
        .populate("playlists")
        .populate("tracks")
        .populate("tracks");
    },
    me: async (parent, args, context) => {
      if (context.user) {
        return await Profile.findOne(context.user._id);
      }
      throw new AuthenticationError("You need to be logged in!");
    },
    tracks: async () => {
      return Track.find({});
    },
    track: async (parent, { _id }) => {
      return await Track.findById(_id);
    },
    playlists: async () => {
      return await Playlist.find().populate("tracks").populate("author");
    },
    playlist: async (parent, { _id }) => {
      return await Playlist.findById(_id).populate("tracks").populate("author");
    },
    profile: async (parent, { _id }) => {
      return await Profile.findById(_id)
        .populate("playlists")
        .populate("tracks");
    },
  },

  Upload: GraphQLUpload,

  Mutation: {
    singleUpload: async (parent, { file }) => {
      const { createReadStream, filename, mimetype, encoding } = await file;
      const stream = createReadStream();
      const out = fs.createWriteStream("/tmp/" + filename);
      stream.pipe(out);
      await finished(out);
      return { filename, mimetype, encoding };
    },

    addProfile: async (parent, { name, email, password }) => {
      const profile = await Profile.create({ name, email, password });
      const token = signToken(profile);

      return { token, profile };
    },
    login: async (parent, { email, password }) => {
      const profile = await Profile.findOne({ email });

      if (!profile) {
        throw new AuthenticationError(`No user found for email: ${email}`);
      }

      const correctPw = await profile.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError(
          `Incorrect password for email: ${email} ${password}`
        );
      }

      const token = signToken(profile);
      return { token, profile };
    },
    addTrack: async (
      parent,
      { title, artist, album, explicit, image, audioSrc, color }
    ) => {
      return await Track.create({
        title,
        artist,
        album,
        explicit,
        image,
        audioSrc,
        color,
      });
    },
    addPlaylist: async (parent, { name, author }) => {
      return await Playlist.create({ name, author });
    },
    addToPlaylist: async (parent, { _id, trackId }) => {
      return await Playlist.findByIdAndUpdate(
        _id,
        { $push: { tracks: trackId } },
        { new: true }
      );
    },
    addPlaylistToProfile: async (parent, { _id, playlistId }) => {
      return await Playlist.findByIdAndUpdate(
        _id,
        { $push: { playlists: playlistId } },
        { new: true }
      );
    },
    addTrackToProfile: async (parent, { _id, trackId }) => {
      return await Playlist.findByIdAndUpdate(
        _id,
        { $push: { tracks: trackId } },
        { new: true }
      );
    },
    removeFromPlaylist: async (parent, { _id, trackId }) => {
      return await Playlist.findByIdAndUpdate(
        _id,
        { $pull: { tracks: trackId } },
        { new: true }
      );
    },
    deleteTrack: async (parent, _id) => {
      return await Track.deleteOne(_id);
    },
    deletePlaylist: async (parent, _id) => {
      return await Playlist.deleteOne(_id);
    },
  },
};

module.exports = resolvers;
