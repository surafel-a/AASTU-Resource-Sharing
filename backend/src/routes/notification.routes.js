import express from "express";
import { protect, restrictTo } from "../middlewares/auth.middleware.js";
import {
  getMyNotifications,
  markAsRead,
  markAllAsRead,
  deleteNotification,
  clearAllNotifications,
} from "../controllers/notification.controller.js";

const router = express.Router();

// All routes require login and admin role
router.use(protect, restrictTo("admin"));

router.route("/").get(getMyNotifications).delete(clearAllNotifications);

router.patch("/mark-all-read", markAllAsRead);

router.route("/:id").patch(markAsRead).delete(deleteNotification);

export default router;
