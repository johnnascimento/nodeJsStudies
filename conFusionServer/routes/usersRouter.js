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

/* GET users listing. */
userRouter
    .options(cors.corsWithoptions, cors.sendOkStatus)
    .get('/', cors.corsWithoptions, authenticate.verifyUser, authenticate.verifyAdmin, ctrlUsers.getUsers)
    .post('/signup', cors.corsWithoptions, ctrlUsers.signUp)
    .post('/login', cors.corsWithoptions, passport.authenticate('local'), ctrlUsers.logIn)
    .get('/logout', cors.corsWithoptions, ctrlUsers.logOut);

module.exports = userRouter;
