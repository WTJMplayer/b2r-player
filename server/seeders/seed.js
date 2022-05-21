const db = require('../config/connection');
const { Profile, Track } = require('../models');
const profileSeeds = require('./profileSeeds.json');
const trackSeeds = require('./trackSeeds.json');

db.once('open', async () => {
  try {
    await Profile.deleteMany({});

    await Profile.create(profileSeeds);
    
    await Track.deleteMany({});
    await Track.create(trackSeeds);

  } catch (err) {
    console.error(err);
    process.exit(1);
  }

  console.log('all done!');
  process.exit(0);
});