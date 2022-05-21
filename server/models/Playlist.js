const mongoose = require('mongoose');

const { Schema } = mongoose;

const playlistSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  author: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Profile'
    },
  ],
  createdDate: {
    type: Date,
    default: Date.now
  },
  tracks: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Track'
    }
  ]
});

const Playlist = mongoose.model('Playlist', playlistSchema);

module.exports = Playlist;