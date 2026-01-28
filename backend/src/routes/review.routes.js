import express from 'express';
import { createReview, deleteReviewById, getAllReviews, getReviewById, updateReviewById } from '../controllers/review.controller.js';

const router = express.Router();

router
  .route('/')
  .get(getAllReviews)
  .post(createReview);

router
  .route('/:id')
  .get(getReviewById)
  .patch(updateReviewById)
  .delete(deleteReviewById);

export default router;