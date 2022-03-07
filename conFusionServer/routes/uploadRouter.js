const express = require('express'),
    bodyParser = require('body-parser'),
    authenticate = require('../authenticate'),
    uploadRouter = express.Router();

// Importing controllers
var ctrlUploadImage = require('../controllers/uploadImage');
console.log('ctrlUploadImage', ctrlUploadImage);

uploadRouter.use(bodyParser.json());

/* GET Upload listing. */
uploadRouter.route('/')
    .get(authenticate.verifyUser, authenticate.verifyAdmin, ctrlUploadImage.getImage)
    .post(authenticate.verifyUser, authenticate.verifyAdmin, ctrlUploadImage.postImage, ctrlUploadImage.handleUploadedImage)
    .put(authenticate.verifyUser, authenticate.verifyAdmin, ctrlUploadImage.putImage)
    .delete(authenticate.verifyUser, authenticate.verifyAdmin, ctrlUploadImage.deleteImage);

module.exports = uploadRouter;
