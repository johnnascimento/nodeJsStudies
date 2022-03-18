const express = require('express'),
    bodyParser = require('body-parser'),
    dishRouter = express.Router(),
    authenticate = require('../authenticate'),
    cors = require('./cors');

console.log('bodyParser', bodyParser.json);

// Controller
const ctrlDish = require('../controllers/dish');
console.log('ctrlDish', ctrlDish);

dishRouter.use(bodyParser.json());

// /dishes route
dishRouter.route('/')
    .options(cors.corsWithOptions, cors.sendOkStatus)
    .get(cors.cors, ctrlDish.getDishes)
    .post(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, ctrlDish.postDishes)
    .put(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, ctrlDish.putDishes)
    .delete(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, ctrlDish.deleteDishes);

// /dishes/:dishId route
dishRouter.route('/:dishId')
    .options(cors.corsWithOptions, cors.sendOkStatus)
    .get(cors.cors, ctrlDish.getDish)
    .post(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, ctrlDish.postDish)
    .put(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, ctrlDish.putDish)
    .delete(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, ctrlDish.deleteDish)

// /dishes/:dishId/comments
dishRouter.route('/:dishId/comments')
    .options(cors.corsWithOptions, cors.sendOkStatus)
    .get(cors.cors, ctrlDish.getDishComments)
    .post(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, ctrlDish.postDishComments)
    .put(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, ctrlDish.putDishComments)
    .delete(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, ctrlDish.deleteDishComments)

// dishes/:dishId/comments/:commentId
dishRouter.route('/:dishId/comments/:commentId')
    .options(cors.corsWithOptions, cors.sendOkStatus)
    .get(cors.cors, ctrlDish.getSingleComment)
    .post(cors.corsWithOptions, authenticate.verifyUser, ctrlDish.postSingleComment)
    .put(cors.corsWithOptions, authenticate.verifyUser, ctrlDish.putSingleComment)
    .delete(cors.corsWithOptions, authenticate.verifyUser, ctrlDish.deleteSingleComment)
module.exports = dishRouter;