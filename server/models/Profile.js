const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { Schema } = mongoose;

const profileSchema = new mongoose.Schema ({
    name: {
        type: String, 
        required: true,
        unique: false, 
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/.+@.+\..+/, 'Must match an email address!'],
    },
    password: {
        type: String,
        required: true,
        minlength: 8,
    },
    playlists: [
        {
          type: Schema.Types.ObjectId,
          ref: 'Playlist'
        }
      ],
    tracks: [
        {
          type: Schema.Types.ObjectId,
          ref: 'Track'
        }
      ]
});

//set up pre-save middleware to create password
profileSchema.pre('save', async function (next) {
    if (this.isNew || this.isModified('password')) {
        const saltRounds = 10;
        this.password = await bcrypt.hash(this.password, saltRounds);
    }

    next();
});

profileSchema.methods.isCorrectPassword = async function (password) {
    return bcrypt.compare(password, this.password);
};

const Profile = mongoose.model('Profile', profileSchema);

module.exports = Profile;