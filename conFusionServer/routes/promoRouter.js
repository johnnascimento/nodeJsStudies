const express = require('express'),
    bodyParser = require('body-parser'),
    promoRouter = express.Router(),
    authenticate = require('../authenticate');

console.log('bodyParser', bodyParser.json);

// Controller
const ctrlPromotion = require('../controllers/promotion');
console.log('ctrlPromotion', ctrlPromotion);

promoRouter.use(bodyParser.json());

// promotions route
promoRouter.route('/')
    .get(ctrlPromotion.getPromotions)
    .post(authenticate.verifyUser, ctrlPromotion.postPromotions)
    .put(authenticate.verifyUser, ctrlPromotion.putPromotions)
    .delete(authenticate.verifyUser, ctrlPromotion.deletePromotions);

// promotions/:promotionId route
promoRouter.route('/:promotionId')
    .get(ctrlPromotion.getPromotion)
    .post(authenticate.verifyUser, ctrlPromotion.postPromotion)
    .put(authenticate.verifyUser, ctrlPromotion.putPromotion)
    .delete(authenticate.verifyUser, ctrlPromotion.deletePromotion)

module.exports = promoRouter;