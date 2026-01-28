import express from 'express';
import { createBookmark, deleteBookmarkById, getAllBookmarks, getBookmarkById, updateBookmarkById } from '../controllers/bookmark.controller.js';

const router = express.Router();

router
  .route('/')
  .get(getAllBookmarks)
  .post(createBookmark);

router
  .route('/:id')
  .get(getBookmarkById)
  .patch(updateBookmarkById)
  .delete(deleteBookmarkById);

export default router;