const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const dotenv = require('dotenv');
dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// Since CloudinaryStorage is specialized for images, we'll use raw uploads for zips/pdfs
// but for the multer middleware, we'll just keep it simple and handle the upload in the controller
// to ensure we get the secure_url for all types.

module.exports = { cloudinary };
