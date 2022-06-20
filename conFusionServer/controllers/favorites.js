const { rmSync } = require('fs'),
    mongoose = require('mongoose'),
    Favorites = require('../models/favorites'),
    Dishes = require('../models/dishes'),
    User = require('../models/user');

module.exports = {
    getFavorites: (req, res, next) => {
        Favorites.find({})
        .populate('user')
        .populate('dishes')
        .then(
            (favorites) => {
                console.log('getFavortes', favorites);

                if (favorites) {
                    console.log('IF getFavortes', favorites);

                    let userFavoriteDishes = favorites.filter(favorite => favorite.user._id.toString() === req.user._id.toString())[0];
                    console.log('IF userFavoriteDishes', userFavoriteDishes);

                    if (!userFavoriteDishes) {
                        let err = new Error('You have no favorites!');
                        err.status = 404;

                        return next(err);
                    }

                    res.statusCode = 200;
                    res.setHeader('content-type', 'application/json');
                    res.json(userFavoriteDishes);
                } else {
                    var err = new Error('There are no favorites');
                    err.status = 404;

                    return next(err);
                }
            },
            (err) => next(err)
        )
        .catch((err) => next(err));
    },

    postFavorites: (req, res, next) => {
        Favorites.find({})
        .populate('user')
        .populate('dishes')
        .then(
            (favoriteDishes) => {
                console.log('favoriteDishes', favoriteDishes);

                let currUser;

                if (favoriteDishes) {
                    currUser = favoriteDishes.filter(favorite => favorite.user._id.toString() === req.user._id.toString())[0];
                }

                if (!currUser) {
                    currUser = new Favorites({
                        user: req.user._id
                    });
                }

                for(let currBodyDish of req.body) {
                    console.log('i of req.body', currBodyDish);

                    if (currUser.dishes.find((currUserDish) => {
                        if(currUserDish._id){
                            return currUserDish._id.toString() === currBodyDish._id.toString();
                        }
                    })) {
                        continue;
                    }

                    currUser.dishes.push(currBodyDish._id);
                }

                currUser.save()
                .then(
                    (userFavs) => {
                        res.statusCode = 201;
                        res.setHeader("Content-Type", "application/json");
                        res.json(userFavs);
                        console.log("Favorites Created");
                    }
                )
                .catch((err) => next(err));
            }
        )
        .catch((err) => next(err));
    },

    putFavorites: (req, res, next) => {
        res.statusCode = 403;
        res.end('PUT operation not supported on /favorites');
    },

    deleteFavorites: (req, res, next) => {
        Favorites.find({})
        .populate('user')
        .populate('dishes')
        .then(
            (favorites) => {
                let favToRemove;

                if (favorites) {
                    favToRemove = favorites.filter(favorite => favorite.user._id.toString() === req.user._id.toString())[0];
                }

                if (favToRemove) {
                    favToRemove.remove()
                    .then(
                        (favoritesUpdated) => {
                            console.log('favoritesUpdated', favoritesUpdated);

                            res.statusCode = 200;
                            res.setHeader('Content-Type', 'application/json');
                            res.json(favoritesUpdated);
                        },
                        (err) => next(err)
                    )
                    .catch((err) => next(err));
                } else {
                    let err = new Error('You do not have any favorites');
                    err.status = 404;

                    return next(err);
                }
            },
            (err) => next(err)
        )
        .catch((err) => next(err));
    },

    getFavorite: (req, res, next) => {
        console.log('req.params.dishId', req.params.dishId);
        console.log('req.params.userId', req.params.userId);

        Favorites
            .findOne({ user: req.params.dishId })
            .populate('dishes')
            .populate('user')
            .then(
                (favorites) => {
                    if (favorites) {
                        const favs = favorites.filter(fav => fav.user._id.toString() === req.user.id.toString())[0];
                        const dish = favs.dishes.filter(dish => dish.id === req.params.dishId)[0];

                        if(dish) {
                            res.statusCode = 200;
                            res.setHeader("Content-Type", "application/json");
                            res.json(dish);
                        } else {
                            var err = new Error('You do not have dish ' + req.params.dishId);
                            err.status = 404;
                            return next(err);
                        }
                    } else {
                        var err = new Error('You do not have any favorites');
                        err.status = 404;

                        return next(err);
                    }
                },
                (err) => next(err)
            )
            .catch((err) => next(err));
    },

    postFavorite: (req, res, next) => {
        Favorites.find({})
            .populate('user')
            .populate('dishes')
            .then((favorites) => {
                var user;

                if(favorites)
                    user = favorites.filter(fav => fav.user._id.toString() === req.user.id.toString())[0];

                if(!user)
                    user = new Favorites({user: req.user.id});

                if(!user.dishes.find((d_id) => {
                    if(d_id._id)
                        return d_id._id.toString() === req.params.dishId.toString();
                }))
                    user.dishes.push(req.params.dishId);

                user.save()
                    .then((userFavs) => {
                        res.statusCode = 201;
                        res.setHeader("Content-Type", "application/json");
                        res.json(userFavs);
                        console.log("Favorites Created");
                    }, (err) => next(err))
                    .catch((err) => next(err));

            })
            .catch((err) => next(err));
    },

    putFavorite: (req, res, next) => {
        res.statusCode = 403;
        res.end('PUT operation not supported on /favorites/' + req.params.dishId);
    },

    deleteFavorite: (req, res, next) => {
        Favorites.find({})
            .populate('user')
            .populate('dishes')
            .then((favorites) => {
                var user;
                if(favorites)
                    user = favorites.filter(fav => fav.user._id.toString() === req.user.id.toString())[0];

                if(user){
                    user.dishes = user.dishes.filter((dishid) => dishid._id.toString() !== req.params.dishId);
                    user.save()
                        .then((result) => {
                            res.statusCode = 200;
                            res.setHeader("Content-Type", "application/json");
                            res.json(result);
                        }, (err) => next(err));
                } else {
                    var err = new Error('You do not have any favorites');
                    err.status = 404;

                    return next(err);
                }
            }, (err) => next(err))
            .catch((err) => next(err));
    }
};
