import express from "express";
import { protect, restrictTo } from "../middlewares/auth.middleware.js";
import {
  getMySettings,
  updateMySettings,
  updateAccountInfo,
} from "../controllers/adminSettings.controller.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = express.Router();

// All routes require login and admin role
router.use(protect, restrictTo("admin"));

router.route("/").get(getMySettings).patch(updateMySettings);

router.patch("/account", upload.single("photo"), updateAccountInfo);

export default router;
