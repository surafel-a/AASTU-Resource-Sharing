import express from "express";

import { protect, restrictTo } from "../middlewares/auth.middleware.js";
import {
  createReview,
  getAllReviews,
  getReviewById,
  updateReviewById,
  deleteReviewById,
  toggleReaction,
  rateResource,
  getResourceSummary,
} from "../controllers/review.controller.js";

const router = express.Router();

// ── Admin / general ───────────────────────────────────────────────────────────
router.route("/").get(getAllReviews).post(protect, createReview);

router
  .route("/:id")
  .get(getReviewById)
  .patch(protect, updateReviewById)
  .delete(protect, deleteReviewById);

// ── Per-resource actions ──────────────────────────────────────────────────────
// GET  /api/v1/reviews/:resourceId/summary  — public stats + current user's review
// POST /api/v1/reviews/:resourceId/react    — like or dislike (auth required)
// POST /api/v1/reviews/:resourceId/rate     — star rating (auth required)

router.get("/:resourceId/summary", protect, getResourceSummary);
router.post("/:resourceId/react", protect, toggleReaction);
router.post("/:resourceId/rate", protect, rateResource);

export default router;
