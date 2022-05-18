const mongoose = require('mongoose');

const { Schema } = mongoose;

const trackSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  artist: {
    type: String,
  },
  album: {
    type: String,
  },
  imageSrc: {
    type: String,
  },
  audioSrc: {
    type: String,
  }
});

const Track = mongoose.model('Track', trackSchema);

module.exports = Track;