const { rmSync } = require('fs'),
    mongoose = require('mongoose'),
    Promotions = require('../models/promotions');

module.exports = {
    getPromotions: (req, res, next) => {
        Promotions.find({})
        .then(
            (promotions) => {
                console.log('hit promotions get verb', Promotions);

                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(promotions);
            },
            (err) => next(err)
        )
        .catch((err) => next(err));
    },

    postPromotions: (req, res, next) => {
        Promotions.create(req.body)
        .then(
            (promotion) => {
                console.log('Promotion created: ', promotion);

                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(promotion);
            },
            (err) => next(err)
        )
        .catch((err) => next(err));
    },

    putPromotions: (req, res, next) => {
        res.statusCode = 403;
        res.end('PUT operation not supported on /promotions');
    },

    deletePromotions: (req, res, next) => {
        Promotions.remove({})
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

    getPromotion: (req, res, next) => {
        Promotions.findById(req.params.promotionId)
        .then(
            (promotion) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(promotion);
            },
            (err) => next(err)
        )
        .catch((err) => next(err));
    },

    postPromotion: (req, res, next) => {
        res.statusCode = 403; // Code for operation not supported
        res.end('POST operation not supported on /promotions/' + req.params.promotionId);
    },

    putPromotion: (req, res, next) => {
        Promotions.findByIdAndUpdate(
            req.params.promotionId,
            {
                $set: req.body
            },
            {
                new: true
            }
        )
        .then(
            (promotion) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(promotion);
            },
            (err) => next(err)
        )
        .catch((err) => next(err));
    },

    deletePromotion: (req, res, next) => {
        Promotions.findByIdAndRemove(req.params.promotionId)
        .then(
            (promotion) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(promotion);
            },
            (err) => next(err)
        )
        .catch((err) => next(err));
    }
};
