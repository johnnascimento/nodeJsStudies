const express = require('express'),
    bodyParser = require('body-parser'),
    dishRouter = express.Router(),
    authenticate = require('../authenticate');

console.log('bodyParser', bodyParser.json);

// Controller
const ctrlDish = require('../controllers/dish');
console.log('ctrlDish', ctrlDish);

dishRouter.use(bodyParser.json());

// /dishes route
dishRouter.route('/')
    .get(ctrlDish.getDishes)
    .post(authenticate.verifyUser, authenticate.verifyAdmin, ctrlDish.postDishes)
    .put(authenticate.verifyUser, authenticate.verifyAdmin, ctrlDish.putDishes)
    .delete(authenticate.verifyUser, authenticate.verifyAdmin, ctrlDish.deleteDishes);

// /dishes/:dishId route
dishRouter.route('/:dishId')
    .get(ctrlDish.getDish)
    .post(authenticate.verifyUser, authenticate.verifyAdmin, ctrlDish.postDish)
    .put(authenticate.verifyUser, authenticate.verifyAdmin, ctrlDish.putDish)
    .delete(authenticate.verifyUser, authenticate.verifyAdmin, ctrlDish.deleteDish)

// /dishes/:dishId/comments
dishRouter.route('/:dishId/comments')
    .get(ctrlDish.getDishComments)
    .post(authenticate.verifyUser, authenticate.verifyAdmin, ctrlDish.postDishComments)
    .put(authenticate.verifyUser, authenticate.verifyAdmin, ctrlDish.putDishComments)
    .delete(authenticate.verifyUser, authenticate.verifyAdmin, ctrlDish.deleteDishComments)

// dishes/:dishId/comments/:commentId
dishRouter.route('/:dishId/comments/:commentId')
    .get(ctrlDish.getSingleComment)
    .post(authenticate.verifyUser, ctrlDish.postSingleComment)
    .put(authenticate.verifyUser, ctrlDish.putSingleComment)
    .delete(authenticate.verifyUser, ctrlDish.deleteSingleComment)
module.exports = dishRouter;