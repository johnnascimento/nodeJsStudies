const mongoose = require('mongoose'),
    Dishes = require('../models/dishes');

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
        .then((resp) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(resp);
        }, (err) => next(err))
        .catch((err) => next(err));
    }
};
