import multer from 'multer';

import cloudinary from '../config/cloudinary.js';

const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 } // maximum 10MB
});

const streamUpload = (fileBuffer, folderName) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream({
      folder: folderName,
      resource_type: "auto"
    }, (error, result) => {
      if(result) resolve(result);
      else reject(error);
    });

    stream.end(fileBuffer);
  })
}

export { upload, streamUpload };