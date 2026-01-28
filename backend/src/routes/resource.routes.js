import express from 'express';


import { protect } from '../middlewares/auth.middleware.js';
import { createResource, deleteResourceById, getAllResources, getResourceById, updateResourceById } from '../controllers/resource.controller.js';

const router = express.Router();

router
  .route('/')
  .get(getAllResources)
  .post(protect, createResource);


router
  .route('/:id')
  .get(getResourceById)
  .patch(updateResourceById)
  .delete(deleteResourceById);



export default router;