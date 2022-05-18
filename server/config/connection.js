const mongoose = require('mongoose');
mongoose.connect(
  process.env.MONGODB_URI || 'mongodb://localhost/B2R-PLAYER',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
);
module.exports = mongoose.connection;