const express = require('express'),
    bodyParser = require('body-parser'),
    authenticate = require('../authenticate'),
    uploadRouter = express.Router(),
    multer = require('multer'),

    storage = multer.diskStorage({
        destination: (req, file, cb) => {
            console.log('destination', file);

            cb(null, 'public/images');
        },

        filename: (req, file, cb) => {
            console.log('filename', file);

            cb(null, file.originalname);
        }
    }),

    imageFileFilter = (req, file, cb) => {
        console.log('imageFileFilter', file);

        if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
            let notAllowedFileError = new Error('You can upload only image files!');

            return cb(notAllowedFileError, false);
        }

        cb(null, true);
    },

    upload = multer({
        storage: storage,
        fileFilter: imageFileFilter
    });

// Importing controllers
var ctrlUploadImage = require('../controllers/uploadImage');
console.log('ctrlUploadImage', ctrlUploadImage);

uploadRouter.use(bodyParser.json());

/* GET Upload listing. */
uploadRouter.route('/')
    .get(authenticate.verifyUser, authenticate.verifyAdmin, ctrlUploadImage.getImage)
    .post(authenticate.verifyUser, authenticate.verifyAdmin, upload.single('imageFile'), ctrlUploadImage.handleUploadedImage)
    .put(authenticate.verifyUser, authenticate.verifyAdmin, ctrlUploadImage.putImage)
    .delete(authenticate.verifyUser, authenticate.verifyAdmin, ctrlUploadImage.deleteImage);

module.exports = uploadRouter;
