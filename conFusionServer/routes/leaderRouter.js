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
    .get(ctrlLeader.getLeaders)
    .post(authenticate.verifyUser, ctrlLeader.postLeaders)
    .put(authenticate.verifyUser, ctrlLeader.putLeaders)
    .delete(authenticate.verifyUser, ctrlLeader.deleteLeaders);

// leaders/:leaderId route
dishRouter.route('/:leaderId')
    .get(ctrlLeader.getLeader)
    .post(authenticate.verifyUser, ctrlLeader.postLeader)
    .put(authenticate.verifyUser, ctrlLeader.putLeader)
    .delete(authenticate.verifyUser, ctrlLeader.deleteLeader)

module.exports = dishRouter;