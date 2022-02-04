const { rmSync } = require('fs'),
    mongoose = require('mongoose'),
    Dishes = require('../models/dishes');

module.exports = {
    getDishes: (req, res, next) => {
        Dishes.find({})
        .populate('comments.author')
        .then(
            (dishes) => {
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
        .populate('comments.author')
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

    postDish: (req, res, next) => {
        res.statusCode = 403;
        res.end('POST operation not supported on /dishes/'+ req.params.dishId);
    },

    putDish: (req, res, next) => {
        Dishes.findByIdAndUpdate(
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
    },

    postDishComments: (req, res, next) => {
        Dishes.findById(req.params.dishId)
        .then(
            (dish) => {
                if (dish != null) {
                    req.body.author = req.user._id;
                    dish.comments.push(req.body)
                    dish.save()
                    .then(
                        (savedDish) => {
                            Dishes.findById(savedDish._id)
                            .populate('comments.author')
                            .then(
                                (updatedDish) => {
                                    res.statusCode = 200;
                                    res.setHeader('Content-Type', 'application/json');
                                    res.json(updatedDish);
                                }
                            )
                        },
                        (err) => next(err)
                    )
                } else {
                    let commentErr = new Error('Dish ' + req.params.dishId + ' not found');
                    commentErr.status = 404;
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
                    commentErr.status = 404;
                    return next(commentErr)
                }
            },
            (err) => next(err)
        )
        .catch((err) => next(err))
    },

    getSingleComment: (req, res, next) => {
        Dishes.findById(req.params.dishId)
        .populate('comments.author')
        .then(
            (dish) => {
                var commentErr = '';

                if (dish != null && dish.comments.id(req.params.commentId) != null) {
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.json(dish.comments.id(req.params.commentId));
                } else if (dish == null) {
                    commentErr = new Error('Dish ' + req.params.dishId + ' not found');
                    commentErr.status = 404;
                    return next(commentErr);
                } else {
                    commentErr = new Error('Comment ' + req.params.commentId + ' not found');
                    commentErr.status = 404;
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
                console.log('putSingleComment:dish', dish);
                console.log('putSingleComment:req.user', req.user);
                console.log('putSingleComment:dish.comments.id(req.params.commentId).author', dish.comments.id(req.params.commentId).author);
                console.log('putSingleComment:req.user._id', req.user._id);
                console.log('putSingleComment:dish.comments.id(req.params.commentId).author.equals(req.user._id)', dish.comments.id(req.params.commentId).author.equals(req.user._id));

                if (dish != null && dish.comments.id(req.params.commentId) != null) {
                    if(dish.comments.id(req.params.commentId).author.equals(req.user._id)) {
                        if (req.body.rating) {
                            dish.comments.id(req.params.commentId).rating = req.body.rating;
                        }

                        if (req.body.comment) {
                            dish.comments.id(req.params.commentId).comment = req.body.comment;
                        }

                        dish.save()
                        .then(
                            (savedDish) => {
                                Dishes.findById(savedDish._id)
                                .populate('comments.author')
                                .then(
                                    (updatedDish) => {
                                        res.statusCode = 200;
                                        res.setHeader('Content-Type', 'application/json');
                                        res.json(updatedDish);
                                    }
                                )
                            },
                            (err) => next(err)
                        );
                    } else {
                        commentErr = new Error('You don\'t have permission to change the comment with id: ' + req.params.commentId);
                        commentErr.status = 401;
                        return next(commentErr);
                    }
                } else if (dish == null) {
                    commentErr = new Error('Dish ' + req.params.dishId + ' not found');
                    commentErr.status = 404;
                    return next(commentErr);
                } else {
                    commentErr = new Error('Comment ' + req.params.commentId + ' not found');
                    commentErr.status = 404;
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
                        (savedDish) => {
                            Dishes.findById(savedDish._id)
                            .populate('comments.author')
                            .then(
                                (updatedDish) => {
                                    res.statusCode = 200;
                                    res.setHeader('Content-Type', 'application/json');
                                    res.json(updatedDish);
                                }
                            )
                        },
                        (err) => next(err)
                    )
                } else if (dish == null) {
                    commentErr = new Error('Dish ' + req.params.dishId + ' not found');
                    commentErr.status = 404;
                    return next(commentErr);
                } else {
                    commentErr = new Error('Comment ' + req.params.commentId + ' not found');
                    commentErr.status = 404;
                    return next(commentErr);
                }
            },
            (err) => next(err)
        )
        .catch((err) => next(err));
    }
};
