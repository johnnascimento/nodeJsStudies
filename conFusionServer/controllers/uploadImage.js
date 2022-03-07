const fs = require('fs'),
    mongoose = require('mongoose'),
    multer = require('multer');

    storage = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, 'public/image');
        },

        filename: (req, file, cb) => {
            cb(null, file.originalname);
        }
    }),

    imageFileFilter = (req, file, cb) => {
        if (!file.originalname.match(/|.(jpg|jpeg|png|gif)$/)) {
            let notAllowedFileError = new Error('You can upload only image files!');

            return cb(notAllowedFileError, false);
        }

        cb(null, true);
    },

    upload = multer({
        storage: storage,
        fileFilter: imageFileFilter
    });

module.exports = {
    getImage: (req, res, next) => {
        res.statusCode = 403;
        res.end('GET operation not supported on /imageUpload');
    },

    postImage: (req, res, next) => {
        console.log('postImage', req.file);

        upload.single('imageFile');
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
        console.log('handleUploadedImage', req.file);

        res.json(req.file);
    }
};
