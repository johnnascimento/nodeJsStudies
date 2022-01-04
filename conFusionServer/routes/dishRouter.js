const express = require('express'),
    bodyParser = require('body-parser'),
    dishRouter = express.Router();

console.log('bodyParser', bodyParser.json);

// Controller
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

// /dishes/:dishId/comments
dishRouter.route('/:dishId/comments')
    .get(ctrlDish.getDishComments)
    .post(ctrlDish.postDishComments)
    .put(ctrlDish.putDishComments)
    .delete(ctrlDish.deleteDishComments)

// dishes/:dishId/comments/:commentId
dishRouter.route('/:dishId/comments/:commentId')
    .get(ctrlDish.getSingleComment)
    .post(ctrlDish.postSingleComment)
    .put(ctrlDish.putSingleComment)
    .delete(ctrlDish.deleteSingleComment)
module.exports = dishRouter;