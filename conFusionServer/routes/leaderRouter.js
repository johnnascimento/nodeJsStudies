const express = require('express'),
    bodyParser = require('body-parser'),
    dishRouter = express.Router(),
    authenticate = require('../authenticate');

console.log('bodyParser', bodyParser.json);

// Controller
const ctrlLeader = require('../controllers/leader');
console.log('ctrlLeader', ctrlLeader);

dishRouter.use(bodyParser.json());

// leaders route
dishRouter.route('/')
    .get(ctrlLeader.getLeaders)
    .post(authenticate.verifyUser, authenticate.verifyAdmin, ctrlLeader.postLeaders)
    .put(authenticate.verifyUser, authenticate.verifyAdmin, ctrlLeader.putLeaders)
    .delete(authenticate.verifyUser, authenticate.verifyAdmin, ctrlLeader.deleteLeaders);

// leaders/:leaderId route
dishRouter.route('/:leaderId')
    .get(ctrlLeader.getLeader)
    .post(authenticate.verifyUser, authenticate.verifyAdmin, ctrlLeader.postLeader)
    .put(authenticate.verifyUser, authenticate.verifyAdmin, ctrlLeader.putLeader)
    .delete(authenticate.verifyUser, authenticate.verifyAdmin, ctrlLeader.deleteLeader)

module.exports = dishRouter;