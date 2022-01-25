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
    .post(authenticate.verifyUser, ctrlDish.postDishes)
    .put(authenticate.verifyUser, ctrlDish.putDishes)
    .delete(authenticate.verifyUser, ctrlDish.deleteDishes);

// /dishes/:dishId route
dishRouter.route('/:dishId')
    .get(ctrlDish.getDish)
    .post(authenticate.verifyUser, ctrlDish.postDish)
    .put(authenticate.verifyUser, ctrlDish.putDish)
    .delete(authenticate.verifyUser, ctrlDish.deleteDish)

// /dishes/:dishId/comments
dishRouter.route('/:dishId/comments')
    .get(ctrlDish.getDishComments)
    .post(authenticate.verifyUser, ctrlDish.postDishComments)
    .put(authenticate.verifyUser, ctrlDish.putDishComments)
    .delete(authenticate.verifyUser, ctrlDish.deleteDishComments)

// dishes/:dishId/comments/:commentId
dishRouter.route('/:dishId/comments/:commentId')
    .get(ctrlDish.getSingleComment)
    .post(authenticate.verifyUser, ctrlDish.postSingleComment)
    .put(authenticate.verifyUser, ctrlDish.putSingleComment)
    .delete(authenticate.verifyUser, ctrlDish.deleteSingleComment)
module.exports = dishRouter;