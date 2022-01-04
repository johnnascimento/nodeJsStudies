const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var leaderSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true
        },
        image: {
            type: String,
            required: true
        },
        designation: {
            type: String,
            required: true,
            default: ''
        },
        abbr: {
            type: String,
            required: true,
            default: ''
        },
        featured: {
            type: Boolean,
            default: false
        },
        description: {
            type: String,
            required: true
        }
    }
);

var Leaders = mongoose.model('leaderSchema', leaderSchema);

module.exports = Leaders;