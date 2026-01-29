import express from 'express';

import { protect, restrictTo } from '../middlewares/auth.middleware.js';
import { deleteMe, deleteUserById, getAllUsers, getMe, getUserById, updateMe, updateUserById } from '../controllers/user.controller.js';
import { upload } from '../middlewares/multer.middleware.js';

const router = express.Router();

router.use(protect);

router
  .route('/me')
  .get(getMe)
  .patch(upload.single('photo'), updateMe)
  .delete(deleteMe);

router
  .route('/')
  .get(restrictTo('admin'), getAllUsers);

router
  .route('/:id')
  .get(restrictTo('admin'), getUserById)
  .patch(restrictTo('admin'), updateUserById)
  .delete(restrictTo('admin'), deleteUserById);


export default router;