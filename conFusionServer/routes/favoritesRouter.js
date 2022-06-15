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
    .get(cors.cors, authenticate.verifyUser, ctrlFavorites.getFavorites)
    .post(cors.corsWithOptions, authenticate.verifyUser, ctrlFavorites.postFavorites)
    .put(cors.cors, ctrlFavorites.putFavorites)
    .delete(cors.corsWithOptions, authenticate.verifyUser, ctrlFavorites.deleteFavorites);

// /dishes/:dishId route
favoritesRouter.route('/:dishId')
    .options(cors.corsWithOptions, cors.sendOkStatus)
    .post(cors.cors, ctrlFavorites.postFavorite)
    .put(cors.corsWithOptions, authenticate.verifyUser, ctrlFavorites.putFavorite)
    .delete(cors.corsWithOptions, authenticate.verifyUser, ctrlFavorites.deleteFavorite)

module.exports = favoritesRouter;