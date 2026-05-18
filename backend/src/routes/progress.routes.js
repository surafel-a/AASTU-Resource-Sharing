import express from "express";

import { protect } from "../middlewares/auth.middleware.js";

import {
  saveProgress,
  getAllProgress,
  getSingleProgress,
  deleteProgressByResource,
} from "../controllers/progress.controller.js";

const router = express.Router();

router.route("/").post(protect, saveProgress).get(protect, getAllProgress);

router
  .route("/:resourceId")
  .get(protect, getSingleProgress)
  .delete(protect, deleteProgressByResource);

export default router;
