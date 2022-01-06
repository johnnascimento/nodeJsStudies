const express = require('express'),
    bodyParser = require('body-parser'),
    promoRouter = express.Router();

console.log('bodyParser', bodyParser.json);

// Controller
const ctrlPromotion = require('../controllers/promotion');
console.log('ctrlPromotion', ctrlPromotion);

promoRouter.use(bodyParser.json());

// promotions route
promoRouter.route('/')
    .get(
        (req, res, next) => {
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
            .catch((err) => next(err))
        }
    )
    .post(
        (req, res, next) => {
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
        }
    )
    .put(
        (req, res, next) => {
            res.statusCode = 403;
            res.end('PUT operation not supported on /promotions');
        }
    )
    .delete(
        (req, res, next) => {
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
        }
    );

// promotions/:promotionId route
promoRouter.route('/:promotionId')
    .get(
        (req, res, next) => {
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
        }
    )
    .post(
        (req, res, next) => {
            res.statusCode = 403; // Code for operation not supported
            res.end('POST operation not supported on /promotions/' + req.params.promotionId);
        }
    )
    .put(
        (req, res, next) => {
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
        }
    )
    .delete(
        (req, res, next) => {
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
    )

module.exports = promoRouter;