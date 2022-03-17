const express = require('express'),
    bodyParser = require('body-parser'),
    authenticate = require('../authenticate'),
    uploadRouter = express.Router(),
    multer = require('multer'),
    cors = require('./cors'),

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
    .options(cors.corsWithoptions, cors.sendOkStatus)
    .get(cors.cors, authenticate.verifyUser, authenticate.verifyAdmin, ctrlUploadImage.getImage)
    .post(cors.corsWithoptions, authenticate.verifyUser, authenticate.verifyAdmin, upload.single('imageFile'), ctrlUploadImage.handleUploadedImage)
    .put(cors.corsWithoptions, authenticate.verifyUser, authenticate.verifyAdmin, ctrlUploadImage.putImage)
    .delete(cors.corsWithoptions, authenticate.verifyUser, authenticate.verifyAdmin, ctrlUploadImage.deleteImage);

module.exports = uploadRouter;
