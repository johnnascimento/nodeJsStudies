const { rmSync } = require('fs'),
    mongoose = require('mongoose'),
    User = require('../models/user'),
    passport = require('passport'),
    authenticate = require('../authenticate');

module.exports = {
    logIn: (req, res, next) => {
        console.log('Login process using passport authentication!', req.user);

        var token = authenticate.getToken({_id: req.user._id});
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json({
            success: true,
            token: token,
            status: 'You are logged in successfully',
        });
    },

    signUp: (req, res, next) => {
        console.log('signUp controller', req.username);
        console.log('signUp controller: req.body.username', req.body.username);
        console.log('signUp controller: req.body.password', req.body.password);

        User.register(
            new User({
                username: req.body.username
            }),
            req.body.password,
            (err, user) => {
                if(err) {
                    res.statusCode = 500;
                    res.setHeader('Content-Type', 'application/json');
                    res.json({err: err});
                }
                else {
                    if (req.body.firstname) user.firstname = req.body.firstname;
                    if (req.body.lastname) user.lastname = req.body.lastname;

                    user.save((userErr, user) => {
                        if (userErr) {
                            res.statusCode = 500;
                            res.setHeader('Content-Type', 'application/json');
                            res.json({err: userErr});

                            return;
                        }

                        passport.authenticate('local')(req, res, () => {
                            res.statusCode = 200;
                            res.setHeader('Content-Type', 'application/json');
                            res.json({success: true, status: 'Registration Successful!'});
                        });
                    });
                }
            }
        );
    },

    logOut: (req, res, next) => {
        if (req.session) {
            req.session.destroy();
            res.clearCookie('session-id');
            res.redirect('/');
        } else {
            var err = new Error('You are not logged in!');
            err.status = 403; // Forbidden operation
            next(err);
        }
    },

    getUsers: (req, res, next) => {
        console.log('getUsers', req);

        User.find({})
        .then(
            (users) => {
                console.log('users', users);

                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json({
                    message: 'Check out all the users registered at the moment in our DB',
                    users: users,
                    success: true
                });
            },
            (err) => next(err)
        )
        .catch((err) => next(err))
    }
};
