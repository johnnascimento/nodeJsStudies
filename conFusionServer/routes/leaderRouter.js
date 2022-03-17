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
    .options(cors.corsWithoptions, cors.sendOkStatus)
    .get(cors.cors, ctrlLeader.getLeaders)
    .post(cors.corsWithoptions, authenticate.verifyUser, authenticate.verifyAdmin, ctrlLeader.postLeaders)
    .put(cors.corsWithoptions, authenticate.verifyUser, authenticate.verifyAdmin, ctrlLeader.putLeaders)
    .delete(cors.corsWithoptions, authenticate.verifyUser, authenticate.verifyAdmin, ctrlLeader.deleteLeaders);

// leaders/:leaderId route
dishRouter.route('/:leaderId')
    .options(cors.corsWithoptions, cors.sendOkStatus)
    .get(cors.cors, ctrlLeader.getLeader)
    .post(cors.corsWithoptions, authenticate.verifyUser, authenticate.verifyAdmin, ctrlLeader.postLeader)
    .put(cors.corsWithoptions, authenticate.verifyUser, authenticate.verifyAdmin, ctrlLeader.putLeader)
    .delete(cors.corsWithoptions, authenticate.verifyUser, authenticate.verifyAdmin, ctrlLeader.deleteLeader)

module.exports = dishRouter;