
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

cloudinary.config({ 
    cloud_name: 'ddtq1ack5', 
    api_key: '845634458425448', 
    api_secret: 'ZTt9tU5JtlAhH5pwfYIU7dMYmzU' // Click 'View API Keys' above to copy your API secret
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'social-network',
    allowed_formats: ['jpg', 'png', 'webp',"gif"],
    transformation: { width: 1200, crop: "limit" }
  }
});

const upload = multer({
    dest: 'uploads/',
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }
});

const handleUploadErrors = (err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    return res.status(400).json({ error: 'File upload error', message: err.message });
  }
  next(err);
};

module.exports = { upload, handleUploadErrors };