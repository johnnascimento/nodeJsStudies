const mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    passportLocalMongoose = require('passport-local-mongoose');

const User = new Schema({
    admin: {
        type: Boolean,
        default: false
    }
});

User.plugin(passportLocalMongoose);

var Users = new mongoose.model('User', User);

module.exports = Users;