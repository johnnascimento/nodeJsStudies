const express = require('express'),
    bodyParser = require('body-parser'),
    favoritesRouter = express.Router(),
    authenticate = require('../authenticate'),
    cors = require('./cors');

console.log('bodyParser favorites', bodyParser.json);

// Controller
const ctrlFavorites = require('../controllers/favorites');
console.log('ctrlFavorites', ctrlFavorites);

favoritesRouter.use(bodyParser.json());

// /dishes route
favoritesRouter.route('/')
    .options(cors.corsWithOptions, cors.sendOkStatus)
    .get(cors.cors, ctrlFavorites.getFavorites)
    .put(cors.cors, ctrlFavorites.putFavorites)
    .post(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, ctrlFavorites.postDishes)
    .delete(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, ctrlFavorites.deleteFavorites);

// /dishes/:dishId route
favoritesRouter.route('/:dishId')
    .options(cors.corsWithOptions, cors.sendOkStatus)
    .post(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, ctrlFavorites.postFavorite)
    .put(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, ctrlFavorites.putFavorite)
    .delete(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, ctrlFavorites.deleteFavorite)

module.exports = favoritesRouter;