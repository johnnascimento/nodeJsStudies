const express = require('express'),
    bodyParser = require('body-parser'),
    promoRouter = express.Router(),
    authenticate = require('../authenticate'),
    cors = require('./cors');

console.log('bodyParser', bodyParser.json);

// Controller
const ctrlPromotion = require('../controllers/promotion');
console.log('ctrlPromotion', ctrlPromotion);

promoRouter.use(bodyParser.json());

// promotions route
promoRouter.route('/')
    .options(cors.corsWithOptions, cors.sendOkStatus)
    .get(cors.cors, ctrlPromotion.getPromotions)
    .post(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, ctrlPromotion.postPromotions)
    .put(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, ctrlPromotion.putPromotions)
    .delete(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, ctrlPromotion.deletePromotions);

// promotions/:promotionId route
promoRouter.route('/:promotionId')
    .options(cors.corsWithOptions, cors.sendOkStatus)
    .get(cors.cors, ctrlPromotion.getPromotion)
    .post(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, ctrlPromotion.postPromotion)
    .put(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, ctrlPromotion.putPromotion)
    .delete(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, ctrlPromotion.deletePromotion)

module.exports = promoRouter;