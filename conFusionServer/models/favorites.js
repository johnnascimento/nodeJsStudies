const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const favoriteSchema = new Schema(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        },

        dishes: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Dish'
            }
        ]
    },
    {
        timespans: true
    }
);

var Favorites = mongoose.model('Favorites', favoriteSchema);

module.exports = Favorites;