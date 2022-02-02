const express = require('express'),
    bodyParser = require('body-parser'),
    userRouter = express.Router(),
    passport = require('passport'),
    authenticate = require('../authenticate');



// Importing controllers
var ctrlUsers = require('../controllers/users');
console.log('ctrlUsers', ctrlUsers);

userRouter.use(bodyParser.json());

/* GET users listing. */
userRouter
    .get('/', authenticate.verifyUser, authenticate.verifyAdmin, ctrlUsers.getUsers)
    .post('/signup', ctrlUsers.signUp)
    .post('/login', passport.authenticate('local'), ctrlUsers.logIn)
    .get('/logout', ctrlUsers.logOut);

module.exports = userRouter;
