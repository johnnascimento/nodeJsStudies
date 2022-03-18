const express = require('express');
const cors = require('cors');
const app = express();

const whitelist = [
    'http://localhost:3000',
    'https://localhost:3000',
    'http://localhost:3443',
    'https://localhost:3443'
];

var corsOptionsDelegate = function (req, callback) {
    var corsOptions;
    if (whitelist.indexOf(req.header('Origin')) !== -1) {
      corsOptions = { origin: true } // reflect (enable) the requested origin in the CORS response
    } else {
      corsOptions = { origin: false } // disable CORS for this request
    }
    callback(null, corsOptions) // callback expects two parameters: error and options
  }

var sendOkStatus = (req, res) => {
    console.log('Status 200', 200);

    res.sendStatus(200);
};

exports.cors = cors();
exports.corsWithOptions = cors(corsOptionsDelegate);
module.exports.sendOkStatus = sendOkStatus;



