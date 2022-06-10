const { rmSync } = require('fs'),
    mongoose = require('mongoose'),
    Favorites = require('../models/favorites');

module.exports = {
    getFavorites: (req, res, next) => {
        Favorites.find({})
        .populate('user')
        .populate('dishes.dish')
        .then(
            (dishes) => {
                console.log('getFavortes', dishes);
                res.statusCode = 200;
                res.setHeader('content-type', 'application/json');
                res.json(dishes);
            },
            (err) => next(err)
        )
        .catch((err) => next(err));
    },

    postDishes: (req, res, next) => {
        Favorites.create(req.body)
        .then(
            (dish) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(dish);
            },
            (err) => next(err)
        )
        .catch((err) => next(err));
    },

    putFavorites: (req, res, next) => {
        res.statusCode = 403;
        res.end('PUT operation not supported on /dishes');
    },

    deleteFavorites: (req, res, next) => {
        Favorites.remove({})
        .then(
            (resp) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(resp);
            },
            (err) => next(err)
        )
        .catch((err) => next(err));
    },

    postFavorite: (req, res, next) => {
        res.statusCode = 403;
        res.end('POST operation not supported on /dishes/'+ req.params.dishId);
    },

    putFavorite: (req, res, next) => {
        Favorites.findByIdAndUpdate(
            req.params.dishId,
            {
                $set: req.body
            },
            {
                new: true
            }
        )
        .then((dish) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(dish);
        }, (err) => next(err))
        .catch((err) => next(err));
    },

    deleteFavorite: (req, res, next) => {
        Favorites.findByIdAndRemove(req.params.dishId)
        .then((response) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(response);
        }, (err) => next(err))
        .catch((err) => next(err));
    },

    // Comment entries
    getDishComments: (req, res, next) => {
        Favorites.findById(req.params.dishId)
        .populate('coments.author')
        .then(
            (dish) => {
                if (dish != null) {
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.json(dish.comments);
                } else {
                    let commentErr = new Error('Dish ' + req.params.dishId + ' not found');
                    commentErr.status = 404;
                    return next(commentErr);
                }
            }, (err) => next(err)
        )
        .catch((err) => next(err));
    }
};
