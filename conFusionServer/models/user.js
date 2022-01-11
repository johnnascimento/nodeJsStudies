const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

const User = new Schema({
    username: {
        type: 'String',
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    admin: {
        type: Boolean,
        default: false
    }
});

var Users = new mongoose.model('User', User);

module.exports = Users;