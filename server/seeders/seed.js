const db = require('../config/connection');
const { Profile } = require('../models');
const profileSeeds = require('./profileSeeds.json');


db.once('open', async () => {
  try {
    await Profile.deleteMany({});

    await Profile.create(profileSeeds);

  } catch (err) {
    console.error(err);
    process.exit(1);
  }

  console.log('all done!');
  process.exit(0);
});