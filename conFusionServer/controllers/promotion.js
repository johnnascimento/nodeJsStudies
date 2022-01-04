const { rmSync } = require('fs');
const mongoose = require('mongoose');
const Promotions = require('../models/promotions');

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
        res.end('PUT operation not supported on /promotions');
    },

    deletePromotions: (req, res, next) => {
        res.end('Deleting all promotions');
    },

    getPromotion: (req, res, next) => {
        res.end('Will send details of the promotion: ' + req.params.promotionId + ' to you!');
    },

    postPromotion: (req, res, next) => {
        res.statusCode = 403; // Code for operation not supported
        res.end('POST operation not supported on /promotions/' + req.params.promotionId);
    },

    putPromotion: (req, res, next) => {
        res.write('Updating the promotion: ' + req.params.promotionId + '\n');
        res.end('Will update the promotion: ' + req.body.name + ' with details: ' + req.body.description);
    },

    deletePromotion: (req, res, next) => {
        res.end('Will delete the promotion: ' + req.params.promotionId);
    }
};
