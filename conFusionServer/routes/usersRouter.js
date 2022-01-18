const express = require('express'),
    bodyParser = require('body-parser'),
    userRouter = express.Router(),
    passport = require('passport');


// Importing controllers
var ctrlUsers = require('../controllers/users');
console.log('ctrlUsers', ctrlUsers);

userRouter.use(bodyParser.json());

/* GET users listing. */
userRouter
    .get('/', ctrlUsers.logIn)
    .post('/signup', ctrlUsers.signUp)
    .post('/login', passport.authenticate('local'), ctrlUsers.logIn)
    .get('/logout', ctrlUsers.logOut);

module.exports = userRouter;
