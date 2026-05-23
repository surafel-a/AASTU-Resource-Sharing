import AppError from "../utils/appError.js";
import Notification from "../models/notification.model.js";

// ─── GET all notifications for the logged-in admin ───────────────────────────
export const getMyNotifications = async (req, res, next) => {
  try {
    const filter = { recipient: req.user._id };

    // Allow ?read=false to get only unread
    if (req.query.read !== undefined) {
      filter.read = req.query.read === "true";
    }

    // Allow ?type=system etc.
    if (req.query.type) {
      filter.type = req.query.type;
    }

    const notifications = await Notification.find(filter)
      .sort({ createdAt: -1 })
      .limit(100);

    const unreadCount = await Notification.countDocuments({
      recipient: req.user._id,
      read: false,
    });

    res.status(200).json({
      status: "success",
      results: notifications.length,
      unreadCount,
      data: { notifications },
    });
  } catch (error) {
    return next(new AppError("Failed to fetch notifications", 500));
  }
};

// ─── MARK one notification as read ───────────────────────────────────────────
export const markAsRead = async (req, res, next) => {
  try {
    const notification = await Notification.findOneAndUpdate(
      { _id: req.params.id, recipient: req.user._id },
      { read: true, readAt: new Date() },
      { new: true },
    );

    if (!notification) {
      return next(new AppError("Notification not found", 404));
    }

    res.status(200).json({
      status: "success",
      data: { notification },
    });
  } catch (error) {
    return next(new AppError("Failed to mark notification as read", 500));
  }
};

// ─── MARK ALL notifications as read ──────────────────────────────────────────
export const markAllAsRead = async (req, res, next) => {
  try {
    await Notification.updateMany(
      { recipient: req.user._id, read: false },
      { read: true, readAt: new Date() },
    );

    res.status(200).json({
      status: "success",
      message: "All notifications marked as read",
    });
  } catch (error) {
    return next(new AppError("Failed to mark all as read", 500));
  }
};

// ─── DELETE one notification ──────────────────────────────────────────────────
export const deleteNotification = async (req, res, next) => {
  try {
    const notification = await Notification.findOneAndDelete({
      _id: req.params.id,
      recipient: req.user._id,
    });

    if (!notification) {
      return next(new AppError("Notification not found", 404));
    }

    res.status(204).json({ status: "success", data: null });
  } catch (error) {
    return next(new AppError("Failed to delete notification", 500));
  }
};

// ─── DELETE ALL notifications for this admin ──────────────────────────────────
export const clearAllNotifications = async (req, res, next) => {
  try {
    await Notification.deleteMany({ recipient: req.user._id });

    res.status(204).json({ status: "success", data: null });
  } catch (error) {
    return next(new AppError("Failed to clear notifications", 500));
  }
};

// ─── INTERNAL HELPER: create a notification (called from other controllers) ──
// Usage: await createNotification({ recipient, type, title, message, relatedModel, relatedId })
export const createNotification = async ({
  recipient,
  type,
  title,
  message,
  relatedModel = null,
  relatedId = null,
}) => {
  try {
    await Notification.create({
      recipient,
      type,
      title,
      message,
      relatedModel,
      relatedId,
    });
  } catch (error) {
    // Don't throw — notifications failing should never break the main action
    console.error("Failed to create notification:", error.message);
  }
};
