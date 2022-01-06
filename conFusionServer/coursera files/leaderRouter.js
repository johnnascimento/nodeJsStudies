const express = require('express'),
    bodyParser = require('body-parser'),
    dishRouter = express.Router();

console.log('bodyParser', bodyParser.json);

// Controller
const ctrlLeader = require('../controllers/leader');
console.log('ctrlLeader', ctrlLeader);

dishRouter.use(bodyParser.json());

// leaders route
dishRouter.route('/')
    .get(
        (req, res, next) => {
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
        }
    )
    .post(
        (req, res, next) => {
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
        }
    )
    .put(
        (req, res, next) => {
            res.statusCode = 403;
            res.end('PUT operation not supported on /Leaders');
        }
    )
    .delete(
        (req, res, next) => {
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
        }
    );

// leaders/:leaderId route
dishRouter.route('/:leaderId')
    .get(
        (req, res, next) => {
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
        }
    )
    .post(
        (req, res, next) => {
            res.statusCode = 403; // Code for operation not supported
            res.end('POST operation not supported on /Leaders/' + req.params.leaderId);
        }
    )
    .put(
        (req, res, next) => {
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
        }
    )
    .delete(
        (req, res, next) => {
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
    )

module.exports = dishRouter;