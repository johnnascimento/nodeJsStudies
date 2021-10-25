var express = require('express');
var router = express.Router();

// Importing controllers
var ctrlUsers = require('../controllers/users');
console.log('ctrlUsers', ctrlUsers);

/* GET users listing. */
router.get('/', ctrlUsers.logIn);

module.exports = router;
