const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { storage: cloudinaryStorage } = require('../config/cloudinary');

// Ensure local directories exist for non-image files
const ensureDir = (dirPath) => {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
};

const zipsPath = path.join(__dirname, '../uploads/zips');
const reportsPath = path.join(__dirname, '../uploads/reports');
const localScreenshotsPath = path.join(__dirname, '../uploads/screenshots');

ensureDir(zipsPath);
ensureDir(reportsPath);
ensureDir(localScreenshotsPath);

// Local storage for ZIP and Report
const localDiskStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (file.fieldname === 'zip_file') cb(null, zipsPath);
    else if (file.fieldname === 'report_file') cb(null, reportsPath);
    else cb(null, localScreenshotsPath); // Fallback
  },
  filename: (req, file, cb) => {
    const studentId = req.user ? req.user.id : 'unknown';
    const ext = path.extname(file.originalname);
    cb(null, `${studentId}_${Date.now()}_${Math.floor(Math.random()*1000)}${ext}`);
  }
});

// Cloudinary storage is imported above

const uploadNewVersion = multer({
  storage: multer.diskStorage({}), // Placeholder, we'll use custom logic if needed or multiple instances
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|webp|zip|pdf/;
    const ext = path.extname(file.originalname).toLowerCase();
    if (allowedTypes.test(ext)) cb(null, true);
    else cb(new Error('Invalid file type'), false);
  }
});

// Since we need different storages for different fields, we'll use a more manual approach or multiple multer instances
// For simplicity in this MERN stack, I'll use a single multer with disk storage and then upload images to Cloudinary manually in the controller.
// This is more robust than trying to mix storages in one multer call.

const diskUpload = multer({
  storage: localDiskStorage,
  limits: { fileSize: 50 * 1024 * 1024 }
});

module.exports = {
  uploadNewVersion: diskUpload 
};
