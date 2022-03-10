const fs = require('fs'),
    mongoose = require('mongoose');

module.exports = {
    getImage: (req, res, next) => {
        res.statusCode = 403;
        res.end('GET operation not supported on /imageUpload');
    },

    putImage: (req, res, next) => {
        res.statusCode = 403;
        res.end('PUT operation not supported on /imageUpload');
    },

    deleteImage: (req, res, next) => {
        res.statusCode = 403;
        res.end('DELETE operation not supported on /imageUpload');
    },

    handleUploadedImage: (req, res) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');

        console.log('handleUploadedImage', res.statusCode);
        console.log('handleUploadedImage', res.getHeader('Content-Type'));

        console.log('***********************************');
        console.log('***********************************');
        console.log('***********************************');
        console.log('handleUploadedImage', req.file);
        console.log('***********************************');
        console.log('***********************************');
        console.log('***********************************');

        res.json(req.file);
    }
};
