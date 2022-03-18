const express = require('express'),
    bodyParser = require('body-parser'),
    dishRouter = express.Router(),
    authenticate = require('../authenticate'),
    cors = require('./cors');

console.log('bodyParser', bodyParser.json);

// Controller
const ctrlLeader = require('../controllers/leader');
console.log('ctrlLeader', ctrlLeader);

dishRouter.use(bodyParser.json());

// leaders route
dishRouter.route('/')
    .options(cors.corsWithOptions, cors.sendOkStatus)
    .get(cors.cors, ctrlLeader.getLeaders)
    .post(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, ctrlLeader.postLeaders)
    .put(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, ctrlLeader.putLeaders)
    .delete(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, ctrlLeader.deleteLeaders);

// leaders/:leaderId route
dishRouter.route('/:leaderId')
    .options(cors.corsWithOptions, cors.sendOkStatus)
    .get(cors.cors, ctrlLeader.getLeader)
    .post(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, ctrlLeader.postLeader)
    .put(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, ctrlLeader.putLeader)
    .delete(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, ctrlLeader.deleteLeader)

module.exports = dishRouter;