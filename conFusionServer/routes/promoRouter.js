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
    .get(ctrlPromotion.getPromotions)
    .post(ctrlPromotion.postPromotions)
    .put(ctrlPromotion.putPromotions)
    .delete(ctrlPromotion.deletePromotions);

promoRouter.route('/:promoId')
    .get(ctrlPromotion.getPromotion)
    .post(ctrlPromotion.postPromotion)
    .put(ctrlPromotion.putPromotion)
    .delete(ctrlPromotion.deletePromotion)

module.exports = promoRouter;