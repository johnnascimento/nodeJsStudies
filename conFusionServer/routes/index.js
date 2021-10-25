var express = require('express');
var router = express.Router();

// Importing controllers
var ctrlIndex = require('../controllers/index');
console.log('ctrlIndex', ctrlIndex);

/* GET home page. */
router.get('/', ctrlIndex.homepage);

module.exports = router;
