const express = require('express'),
    bodyParser = require('body-parser'),
    dishRouter = express.Router();

console.log('bodyParser', bodyParser.json);

dishRouter.use(bodyParser.json());
dishRouter.route('/')
    .all((req, res, next) => {
        console.log('/leaders was hit');

        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        next();
    })

    .get((req, res, next) => {
        console.log('hit leaders get verb')
        res.end('Will send all the leaders to you');
    })

    .post((req, res, next) => {
        res.end('Will add the leader: ' + req.body.name + ' with details: ' + req.body.description);
    })

    .put((req, res, next) => {
        res.end('PUT operation not supported on /leaders');
    })

    .delete((req, res, next) => {
        res.end('Deleting all leaders');
    });

dishRouter.route('/:leaderId')
    .get((req, res, next) => {
        res.end('Will send etails of the leader: ' + req.params.leaderId + ' to you!');
    })

    .post((req, res, next) => {
        res.statusCode = 403; // Code for operation not supported
        res.end('POST operation not supported on /leaders/' + req.params.leaderId);
    })

    .put((req, res, next) => {
        res.write('Updating the leader: ' + req.params.leaderId + '\n');
        res.end('Will update the leader: ' + req.body.name + ' with details: ' + req.body.description);
    })

    .delete((req, res, next) => {
        res.end('Will delete the leader: ' + req.params.leaderId);
    })

module.exports = dishRouter;