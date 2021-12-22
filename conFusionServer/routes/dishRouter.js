const express = require('express'),
    bodyParser = require('body-parser'),
    dishRouter = express.Router();

dishRouter.use(bodyParser.json());

// Controllers
const ctrlDish = require('../controllers/dish');
console.log('ctrlDish', ctrlDish);

dishRouter.use(bodyParser.json());

// /dishes route
dishRouter.route('/')
    .get(ctrlDish.getDishes)
    .post(ctrlDish.postDishes)
    .put(ctrlDish.putDishes)
    .delete(ctrlDish.deleteDishes);

// /dishes/:dishId route
dishRouter.route('/:dishId')
    .get(ctrlDish.getDish)
    .post(ctrlDish.postDish)
    .put(ctrlDish.putDish)
    .delete(ctrlDish.deleteDish)

module.exports = dishRouter;