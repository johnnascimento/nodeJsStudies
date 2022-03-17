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
    .options(cors.corsWithoptions, cors.sendOkStatus)
    .get(cors.cors, ctrlPromotion.getPromotions)
    .post(cors.corsWithoptions, authenticate.verifyUser, authenticate.verifyAdmin, ctrlPromotion.postPromotions)
    .put(cors.corsWithoptions, authenticate.verifyUser, authenticate.verifyAdmin, ctrlPromotion.putPromotions)
    .delete(cors.corsWithoptions, authenticate.verifyUser, authenticate.verifyAdmin, ctrlPromotion.deletePromotions);

// promotions/:promotionId route
promoRouter.route('/:promotionId')
    .options(cors.corsWithoptions, cors.sendOkStatus)
    .get(cors.cors, ctrlPromotion.getPromotion)
    .post(cors.corsWithoptions, authenticate.verifyUser, authenticate.verifyAdmin, ctrlPromotion.postPromotion)
    .put(cors.corsWithoptions, authenticate.verifyUser, authenticate.verifyAdmin, ctrlPromotion.putPromotion)
    .delete(cors.corsWithoptions, authenticate.verifyUser, authenticate.verifyAdmin, ctrlPromotion.deletePromotion)

module.exports = promoRouter;