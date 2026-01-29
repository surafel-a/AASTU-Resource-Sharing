import express from 'express';

import { protect } from '../middlewares/auth.middleware.js';
import { createBookmark, deleteBookmarkById, getAllBookmarks, getBookmarkById, updateBookmarkById } from '../controllers/bookmark.controller.js';

const router = express.Router();

router
  .route('/')
  .get(getAllBookmarks)
  .post(protect, createBookmark);

router
  .route('/:id')
  .get(getBookmarkById)
  .patch(protect, updateBookmarkById)
  .delete(protect, deleteBookmarkById);

export default router;