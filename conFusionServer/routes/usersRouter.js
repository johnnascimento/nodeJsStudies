const express = require('express'),
    bodyParser = require('body-parser'),
    userRouter = express.Router(),
    passport = require('passport'),
    authenticate = require('../authenticate'),
    cors = require('./cors');

// Importing controllers
var ctrlUsers = require('../controllers/users');
console.log('ctrlUsers', ctrlUsers);

userRouter.use(bodyParser.json());

console.log('OI');

/* GET users listing. */
userRouter
    .options(cors.corsWithOptions, cors.sendOkStatus)
    .get('/', cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, ctrlUsers.getUsers)
    .post('/signup', cors.corsWithOptions, ctrlUsers.signUp)
    .post('/login', cors.corsWithOptions, passport.authenticate('local'), ctrlUsers.logIn)
    .get('/logout', cors.corsWithOptions, ctrlUsers.logOut);

module.exports = userRouter;
