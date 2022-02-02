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
    .post(authenticate.verifyUser, authenticate.verifyAdmin, ctrlPromotion.postPromotions)
    .put(authenticate.verifyUser, authenticate.verifyAdmin, ctrlPromotion.putPromotions)
    .delete(authenticate.verifyUser, authenticate.verifyAdmin, ctrlPromotion.deletePromotions);

// promotions/:promotionId route
promoRouter.route('/:promotionId')
    .get(ctrlPromotion.getPromotion)
    .post(authenticate.verifyUser, authenticate.verifyAdmin, ctrlPromotion.postPromotion)
    .put(authenticate.verifyUser, authenticate.verifyAdmin, ctrlPromotion.putPromotion)
    .delete(authenticate.verifyUser, authenticate.verifyAdmin, ctrlPromotion.deletePromotion)

module.exports = promoRouter;