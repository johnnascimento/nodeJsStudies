const { rmSync } = require('fs'),
    mongoose = require('mongoose'),
    Favorites = require('../models/favorites'),
    Dishes = require('../models/dishes'),
    User = require('../models/user');

module.exports = {
    getFavorites: (req, res, next) => {
        Favorites.find({})
        .populate('dishes')
        .populate('user')
        .then(
            (favorites) => {
                console.log('getFavortes', favorites);

                res.statusCode = 200;
                res.setHeader('content-type', 'application/json');
                res.json(favorites);
            },
            (err) => next(err)
        )
        .catch((err) => next(err));
    },

    postFavorites: (req, res, next) => {
        res.statusCode = 403;
        res.end('POST operation not supported on /postFavorites');
    },

    putFavorites: (req, res, next) => {
        res.statusCode = 403;
        res.end('PUT operation not supported on /favorites');
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
        console.log('req.user._id', req.user._id);
        console.log('req.params.dishId', req.params.dishId);


        User
            .findById(req.user._id)
            .then(
                (selectedUser) => {
                    console.log('selectedUser', selectedUser);

                    Favorites.create({
                        user: selectedUser,
                        dishes: []
                    })
                    .then(
                        (favoriteDish) => {
                            console.log('then:favoriteDish', favoriteDish);
                            console.log('selectedUser', selectedUser);

                            Dishes
                                .findById(req.params.dishId)
                                .populate('comments.author')
                                .then(
                                    (selectedDish) => {
                                        console.log('selectedDish', selectedDish);
                                        console.log('then:favoriteDish', favoriteDish);

                                        favoriteDish.dishes.push(selectedDish);
                                        favoriteDish
                                            .save()
                                            .then(
                                                (savedFavDish) => {
                                                    res.statusCode = 200;
                                                    res.setHeader('Content-Type', 'application/json');
                                                    res.json(savedFavDish);
                                                },
                                                (err) => next(err)
                                            )
                                    },
                                    (err) => next(err)
                                )
                                .catch((err) => next(err));
                        },
                        (err) => next(err)
                    )
                    .catch((err) => next(err));
                }
            );
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
