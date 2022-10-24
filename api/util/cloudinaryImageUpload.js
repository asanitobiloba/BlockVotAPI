const cloudinary = require('cloudinary');
const multer = require("multer");
const cloudinaryStorage = require("multer-storage-cloudinary");
const cloud = require("../config/cloudinaryConfig")

cloudinary.config({
    cloud_name: cloud.cloud_name,
    api_key: cloud.api_key,
    api_secret: cloud.api_secret

});

const storage = cloudinaryStorage({
    cloudinary: cloudinary,
    folder: 'image',
    allowedFormats: ['jpg', 'png'],
});

const parser = multer({
    storage: storage
});


module.exports = parser;