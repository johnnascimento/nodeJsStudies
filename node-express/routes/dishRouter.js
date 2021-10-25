const express = require('express'),
    bodyParser = require('body-parser'),
    dishRouter = express.Router();

console.log('bodyParser', bodyParser.json);

dishRouter.use(bodyParser.json());
dishRouter.route('/')
    .all((req, res, next) => {
        console.log('/dishes was hit');

        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        next();
    })

    .get((req, res, next) => {
        console.log('hit dishes get verb')
        res.end('Will send all the dishes to you');
    })

    .post((req, res, next) => {
        res.end('Will add the dish: ' + req.body.name + ' with details: ' + req.body.description);
    })

    .put((req, res, next) => {
        res.end('PUT operation not supported on /dishes');
    })

    .delete((req, res, next) => {
        res.end('Deleting all dishes');
    });

dishRouter.route('/:dishId')
    .get((req, res, next) => {
        res.end('Will send etails of the dish: ' + req.params.dishId + ' to you!');
    })

    .post((req, res, next) => {
        res.statusCode = 403; // Code for operation not supported
        res.end('POST operation not supported on /dishes/' + req.params.dishId);
    })

    .put((req, res, next) => {
        res.write('Updating the dish: ' + req.params.dishId + '\n');
        res.end('Will update the dish: ' + req.body.name + ' with details: ' + req.body.description);
    })

    .delete((req, res, next) => {
        res.end('Will delete the dish: ' + req.params.dishId);
    })

module.exports = dishRouter;