const { rmSync } = require('fs'),
    mongoose = require('mongoose'),
    Leaders = require('../models/leaders');

module.exports = {
    getLeaders: (req, res, next) => {
        Leaders.find({})
        .then(
            (leader) => {
                console.log('hit Leaders get verb', leader);

                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(leader);
            },
            (err) => next(err)
        )
        .catch((err) => next(err));
    },

    postLeaders: (req, res, next) => {
        Leaders.create(req.body)
        .then(
            (leader) => {
                console.log('leader created: ', leader);

                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(leader);
            },
            (err) => next(err)
        )
        .catch((err) => next(err));
    },

    putLeaders: (req, res, next) => {
        res.statusCode = 403;
        res.end('PUT operation not supported on /Leaders');
    },

    deleteLeaders: (req, res, next) => {
        Leaders.remove({})
        .then(
            (resp) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(resp);
            },
            (err) => next(err)
        )
        .catch((err) => next(err));
    },

    getLeader: (req, res, next) => {
        Leaders.findById(req.params.leaderId)
        .then(
            (leader) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(leader);
            },
            (err) => next(err)
        )
        .catch((err) => next(err));
    },

    postLeader: (req, res, next) => {
        res.statusCode = 403; // Code for operation not supported
        res.end('POST operation not supported on /Leaders/' + req.params.leaderId);
    },

    putLeader: (req, res, next) => {
        Leaders.findByIdAndUpdate(
            req.params.leaderId,
            {
                $set: req.body
            },
            {
                new: true
            }
        )
        .then(
            (leader) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(leader);
            },
            (err) => next(err)
        )
        .catch((err) => next(err));
    },

    deleteLeader: (req, res, next) => {
        Leaders.findByIdAndRemove(req.params.leaderId)
        .then(
            (leader) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(leader);
            },
            (err) => next(err)
        )
        .catch((err) => next(err));
    }
};
