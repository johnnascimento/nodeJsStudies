const {
    rmSync
} = require('fs'),
    mongoose = require('mongoose'),
    User = require('../models/user');

module.exports = {
    logIn: (req, res, next) => {
        var reqSession = req.session;
        var reqSessionUser = req.session.user;
        var reqHeaders = req.headers;

        console.log(reqHeaders);
        console.log('reqSession', reqSession);

        if (!reqSessionUser) {
            var authHeader = req.headers.authorization;

            if (!authHeader) {
                var err = new Error('You are not authenticated!');

                res.setHeader('WWW-authenticate', 'Basic');
                err.status = 401;

                return next(err);
            }

            var authHeaderToken = authHeader.split(' ')[1];
            var auth = new Buffer.from(authHeaderToken, 'base64').toString().split(':');

            var username = auth[0];
            var password = auth[1];

            User.findOne({
                username: username
            })
            .then(
                (user) => {
                    if (user === null) {
                        var err = new Error('User ' + username + ' does not exists!');

                        err.status = 403;

                        next(err);
                    } else if (user.password !== password) {
                        var err = new Error('Your password is incorrect!');

                        err.status = 403;

                        next(err);
                    } else if (user.username === username && user.password === password) {
                        req.session.user = 'authenticated';
                        res.statusCode = 200;
                        res.setHeader('Content-Type', 'text/plain');
                        res.end('You are authenticated!');
                    }
                },
                (err) => next(err)
            )
            .catch((err) => next(err))
        } else {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'text/plain');
            res.end('You are already authenticated!');
        }
    },

    signUp: (req, res, next) => {
        User.findOne({
                username: req.body.username
            })
            .then(
                (user) => {
                    if (user != null) {
                        var err = new Error('User ' + req.body.username + ' already exists!');

                        err.status = 403; // Forbidden operation
                        next(err);
                    } else {
                        return User.create({
                            username: req.body.username,
                            password: req.body.password
                        });
                    }
                },
                (err) => next(err)
            )
            .then(
                (user) => {
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.json({
                        status: 'Registration Successfull!',
                        user: user
                    });
                },
                (err) => next(err)
            )
            .catch((err) => next(err));
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
