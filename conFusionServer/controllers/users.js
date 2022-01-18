const { rmSync } = require('fs'),
    mongoose = require('mongoose'),
    User = require('../models/user'),
    passport = require('passport');

module.exports = {
    logIn: (req, res, next) => {
        console.log('Login process using passport authentication!');

        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json({
            success: true,
            status: 'You are logged in successfully',
        });
    },

    signUp: (req, res, next) => {
        User.register(
            new User(
                {
                    username: req.body.username
                }
            ),
            req.body.password,
            (err, user) => {
                if (err) {
                    res.statusCode = 500;
                    res.setHeader('Content-Type', 'application/json');
                    res.json({ error: err })
                } else {
                    passport.authenticate('local')(req, res, () => {
                        res.statusCode = 200;
                        res.setHeader('Content-Type', 'application/json');
                        res.json({
                            success: true,
                            status: 'Registration Successfull!',
                        });
                    })
                }
            }
        )
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
    }
};
