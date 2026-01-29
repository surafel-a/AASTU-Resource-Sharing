import express from 'express';

import { upload } from '../middlewares/multer.middleware.js';
import { protect } from '../middlewares/auth.middleware.js';
import { createResource, deleteResourceById, getAllResources, getResourceById, updateResourceById } from '../controllers/resource.controller.js';

const router = express.Router();

router
  .route('/')
  .get(getAllResources)
  .post(protect, upload.single('file'), createResource);


router
  .route('/:id')
  .get(getResourceById)
  .patch(protect, upload.single('file'), updateResourceById)
  .delete(protect, deleteResourceById);



export default router;