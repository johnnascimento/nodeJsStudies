const { rmSync } = require('fs');
const mongoose = require('mongoose');
const Dishes = require('../models/dishes');

module.exports = {
    getDishes: (req, res, next) => {
        Dishes.find({})
        .then(
            (dishes) => {
                console.log('hit dishes get verb', dishes)

                res.statusCode = 200;
                res.setHeader('content-type', 'application/json');
                res.json(dishes);
            },
            (err) => next(err)
        )
        .catch((err) => next(err));
    },

    postDishes: (req, res, next) => {
        Dishes.create(req.body)
        .then(
            (dish) => {
                console.log('Dish Created ', dish);

                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(dish);
            },
            (err) => next(err)
        )
        .catch((err) => next(err));
    },

    putDishes: (req, res, next) => {
        res.statusCode = 403;
        res.end('PUT operation not supported on /dishes');
    },

    deleteDishes: (req, res, next) => {
        Dishes.remove({})
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

    getDish: (req, res, next) => {
        Dishes.findById(req.params.dishId)
        .then((dish) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(dish);
        }, (err) => next(err))
        .catch((err) => next(err));
    },

    postDish: (req, res, next) => {
        res.statusCode = 403;
        res.end('POST operation not supported on /dishes/'+ req.params.dishId);
    },

    putDish: (req, res, next) => {
        Dishes.findByIdAndUpdate(req.params.dishId, {
            $set: req.body
        }, { new: true })
        .then((dish) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(dish);
        }, (err) => next(err))
        .catch((err) => next(err));
    },

    deleteDish: (req, res, next) => {
        Dishes.findByIdAndRemove(req.params.dishId)
        .then((response) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(response);
        }, (err) => next(err))
        .catch((err) => next(err));
    },

    // Comment entries
    getDishComments: (req, res, next) => {
        Dishes.findById(req.params.dishId)
        .then(
            (dish) => {
                if (dish != null) {
                    console.log('getDishComments, dish.comments', dish.comments);

                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.json(dish.comments);
                } else {
                    let commentErr = new Error('Dish ' + req.params.dishId + ' not found');
                    commentErr.statusCode = 404;
                    return next(commentErr);
                }
            }, (err) => next(err)
        )
        .catch((err) => next(err));
    },

    postDishComments: (req, res, next) => {
        Dishes.findById(req.params.dishId)
        .then(
            (dish) => {
                if (dish != null) {
                    dish.comments.push(req.body)
                    dish.save()
                    .then(
                        (updatedDish) => {
                            res.statusCode = 200;
                            res.setHeader('Content-Type', 'application/json');
                            res.json(updatedDish);
                        },
                        (err) => next(err)
                    )
                } else {
                    let commentErr = new Error('Dish ' + req.params.dishId + ' not found');
                    commentErr.statusCode = 404;
                    return next(commentErr);

                }
            },
            (err) => next(err)
        )
        .catch((err) => next(err));
    },

    putDishComments: (req, res, next) => {
        res.statusCode = 403;
        res.end('PUT operation not supported on /dishes/'
            + req.params.dishId + '/comments');
    },

    deleteDishComments: (req, res, next) => {
        console.log('deleteDishComments', req.params.dishId);
        Dishes.findById(req.params.dishId)
        .then(
            (dish) => {
                if (dish != null) {
                    for(let i = (dish.comments.length - 1); i >= 0; i--) {
                        dish.comments.id(dish.comments[i]._id).remove();
                    }

                    dish.save()
                    .then(
                        (updatedDish) => {
                            res.statusCode = 200;
                            res.setHeader('Content-Type', 'application/json');
                            res.json(updatedDish);
                        },
                        (err) => next(err)
                    )
                } else {
                    let commentErr = new Error('Dish ' + req.params.dishId + ' not found');
                    commentErr.statusCode = 404;
                    return next(commentErr)
                }
            },
            (err) => next(err)
        )
        .catch((err) => next(err))
    },

    getSingleComment: (req, res, next) => {
        Dishes.findById(req.params.dishId)
        .then(
            (dish) => {
                var commentErr = '';

                if (dish != null && dish.comments.id(req.params.commentId) != null) {
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.json(dish.comments.id(req.params.commentId));
                } else if (dish == null) {
                    commentErr = new Error('Dish ' + req.params.dishId + ' not found');
                    commentErr.statusCode = 404;
                    return next(commentErr);
                } else {
                    commentErr = new Error('Comment ' + req.params.commentId + ' not found');
                    commentErr.statusCode = 404;
                    return next(commentErr);
                }
            },
            (err) => next(err)
        )
        .catch((err) => next(err));
    },

    postSingleComment: (req, res, next) => {
        res.statusCode = 403;
        res.end('POST operation not supported on /dishes/'+ req.params.dishId + '/comments/' + req.params.commentId);
    },

    putSingleComment: (req, res, next) => {
        Dishes.findById(req.params.dishId)
        .then(
            (dish) => {
                var commentErr = '';

                if (dish != null && dish.comments.id(req.params.commentId) != null) {
                    if (req.body.rating) {
                        dish.comments.id(req.params.commentId).rating = req.body.rating;
                    }

                    if (req.body.comment) {
                        dish.comments.id(req.params.commentId).comment = req.body.comment;
                    }
                    dish.save()
                    .then(
                        (updatedDish) => {
                            res.statusCode = 200;
                            res.setHeader('Content-Type', 'application/json');
                            res.json(updatedDish);
                        },
                        (err) => next(err)
                    );
                } else if (dish == null) {
                    commentErr = new Error('Dish ' + req.params.dishId + ' not found');
                    commentErr.statusCode = 404;
                    return next(commentErr);
                } else {
                    commentErr = new Error('Comment ' + req.params.commentId + ' not found');
                    commentErr.statusCode = 404;
                    return next(commentErr);
                }
            }
        )
        .catch((err) => next(err));
    },

    deleteSingleComment: (req, res, next) => {
        Dishes.findById(req.params.dishId)
        .then(
            (dish) => {
                var commentErr = '';

                if (dish != null && dish.comments.id(req.params.commentId) != null) {
                    dish.comments.id(req.params.commentId).remove();
                    dish.save()
                    .then(
                        (updatedDish) => {
                            res.statusCode = 200;
                            res.setHeader('Content-Type', 'application/json');
                            res.json(updatedDish);
                        },
                        (err) => next(err)
                    )
                } else if (dish == null) {
                    commentErr = new Error('Dish ' + req.params.dishId + ' not found');
                    commentErr.statusCode = 404;
                    return next(commentErr);
                } else {
                    commentErr = new Error('Comment ' + req.params.commentId + ' not found');
                    commentErr.statusCode = 404;
                    return next(commentErr);
                }
            },
            (err) => next(err)
        )
        .catch((err) => next(err));
    }
};
