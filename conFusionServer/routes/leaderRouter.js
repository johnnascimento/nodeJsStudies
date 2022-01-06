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
    .post(ctrlLeader.postLeaders)
    .put(ctrlLeader.putLeaders)
    .delete(ctrlLeader.deleteLeaders);

// leaders/:leaderId route
dishRouter.route('/:leaderId')
    .get(ctrlLeader.getLeader)
    .post(ctrlLeader.postLeader)
    .put(ctrlLeader.putLeader)
    .delete(ctrlLeader.deleteLeader)

module.exports = dishRouter;