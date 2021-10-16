const express = require('express'),
    dishRouter = express.Router();

dishRouter.use(express.json());

dishRouter.route('/')
    .all((req, res, next) => {
        console.log('/dishes was hit');

        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
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

module.exports = dishRouter;