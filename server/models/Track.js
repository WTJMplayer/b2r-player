const mongoose = require('mongoose');

const { Schema } = mongoose;

const trackSchema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  artist: {
    type: String,
    required: true,
    trim: true
  },
  album: {
    type: String,
    required: true,
    trim: true
  },
  image: {
    type: String,
    default: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/1024px-No_image_available.svg.png'
  },
  audioSrc: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    default: '#ffffff'
  }
  
});

const Track = mongoose.model('Track', trackSchema);

module.exports = Track;