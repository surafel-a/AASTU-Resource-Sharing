import express from 'express';

import { protect, restrictTo } from '../middlewares/auth.middleware.js';
import { deleteMe, deleteUserById, getAllUsers, getMe, getUserById, updateMe, updateUserById } from '../controllers/user.controller.js';

const router = express.Router();

router
  .route('/me')
  .get(protect, getMe)
  .patch(protect, updateMe)
  .delete(protect, deleteMe);

router
  .route('/')
  .get(protect, restrictTo('admin'), getAllUsers);

router
  .route('/:id')
  .get(protect, restrictTo('admin'), getUserById)
  .patch(protect, restrictTo('admin'), updateUserById)
  .delete(protect, restrictTo('admin'), deleteUserById);


export default router;