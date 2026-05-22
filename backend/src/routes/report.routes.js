import express from "express";

import { protect, restrictTo } from "../middlewares/auth.middleware.js";
import {
  createReport,
  getAllReports,
  getReportById,
  updateReportStatus,
  deleteReport,
  getReportStats,
} from "../controllers/report.controller.js";

const router = express.Router();

// ── Admin only ────────────────────────────────────────────────────────────────
// GET /api/v1/reports/stats   — dashboard overview numbers (must be before /:id)
router.get("/stats", protect, restrictTo("admin"), getReportStats);

// GET  /api/v1/reports        — all reports with filters
// POST /api/v1/reports        — user submits a report
router
  .route("/")
  .get(protect, restrictTo("admin"), getAllReports)
  .post(protect, createReport); // any logged-in user can report

// GET    /api/v1/reports/:id           — single report detail
// DELETE /api/v1/reports/:id           — admin delete
router
  .route("/:id")
  .get(protect, restrictTo("admin"), getReportById)
  .delete(protect, restrictTo("admin"), deleteReport);

// PATCH /api/v1/reports/:id/status    — admin updates status
router.patch("/:id/status", protect, restrictTo("admin"), updateReportStatus);

export default router;
