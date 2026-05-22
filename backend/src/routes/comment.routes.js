import express from "express";

import { protect } from "../middlewares/auth.middleware.js";
import {
  getComments,
  getReplies,
  createComment,
  createReply,
  toggleCommentReaction,
  deleteComment,
} from "../controllers/comment.controller.js";

const router = express.Router();

// ── Resource comments ─────────────────────────────────────────────────────────
// GET  /api/v1/comments/:resourceId          — get all top-level comments
// POST /api/v1/comments/:resourceId          — post a comment (auth)
router.route("/:resourceId").get(getComments).post(protect, createComment);

// ── Replies ───────────────────────────────────────────────────────────────────
// GET  /api/v1/comments/:commentId/replies   — get replies for a comment
// POST /api/v1/comments/:commentId/replies   — post a reply (auth)
router.route("/:commentId/replies").get(getReplies).post(protect, createReply);

// ── React to a comment ────────────────────────────────────────────────────────
// POST /api/v1/comments/:commentId/react     — like/dislike a comment (auth)
router.post("/:commentId/react", protect, toggleCommentReaction);

// ── Delete a comment ──────────────────────────────────────────────────────────
// DELETE /api/v1/comments/:commentId         — soft delete (owner or admin)
router.delete("/:commentId", protect, deleteComment);

export default router;
