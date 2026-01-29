import express from 'express';

import { protect } from '../middlewares/auth.middleware.js';
import { createReview, deleteReviewById, getAllReviews, getReviewById, updateReviewById } from '../controllers/review.controller.js';

const router = express.Router();

router
  .route('/')
  .get(getAllReviews)
  .post(protect, createReview);

router
  .route('/:id')
  .get(getReviewById)
  .patch(protect, updateReviewById)
  .delete(protect, deleteReviewById);

export default router;