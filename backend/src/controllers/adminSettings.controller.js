import AppError from "../utils/appError.js";
import AdminSettings from "../models/adminSettings.model.js";

import User from "../models/user.model.js";
import { streamUpload } from "../middlewares/multer.middleware.js";
import cloudinary from "../config/cloudinary.js";

// ─── GET settings (or create defaults on first visit) ────────────────────────
export const getMySettings = async (req, res, next) => {
  try {
    // findOneAndUpdate with upsert = create defaults if none exist yet
    let settings = await AdminSettings.findOneAndUpdate(
      { admin: req.user._id },
      { $setOnInsert: { admin: req.user._id } },
      { new: true, upsert: true, runValidators: true },
    );

    res.status(200).json({
      status: "success",
      data: { settings },
    });
  } catch (error) {
    return next(new AppError("Failed to fetch settings", 500));
  }
};

// ─── UPDATE settings (preferences + notifications + security toggles) ─────────
export const updateMySettings = async (req, res, next) => {
  try {
    // Only allow these top-level keys to be updated
    const allowed = ["preferences", "notifications", "security"];
    const updates = {};
    allowed.forEach((key) => {
      if (req.body[key] !== undefined) updates[key] = req.body[key];
    });

    const settings = await AdminSettings.findOneAndUpdate(
      { admin: req.user._id },
      { $set: updates },
      { new: true, upsert: true, runValidators: true },
    );

    res.status(200).json({
      status: "success",
      data: { settings },
    });
  } catch (error) {
    return next(new AppError("Failed to update settings", 500));
  }
};

// ─── UPDATE account info (name + phone) — also updates the User document ──────
export const updateAccountInfo = async (req, res, next) => {
  try {
    const { name, phoneNumber } = req.body;

    // Forbidden fields
    if (req.body.role || req.body.password || req.body.email) {
      return next(
        new AppError("You cannot update role, password, or email here.", 400),
      );
    }

    const updateFields = {};
    if (name) updateFields.name = name;
    if (phoneNumber) updateFields.phoneNumber = phoneNumber;

    // Handle photo upload
    if (req.file) {
      const currentUser = await User.findById(req.user._id);
      if (currentUser?.photoId) {
        await cloudinary.uploader.destroy(currentUser.photoId);
      }
      const result = await streamUpload(req.file.buffer, "AASTU_Profiles");
      updateFields.photo = result.secure_url;
      updateFields.photoId = result.public_id;
    }

    const user = await User.findByIdAndUpdate(req.user._id, updateFields, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      status: "success",
      data: { user },
    });
  } catch (error) {
    return next(new AppError("Failed to update account info", 500));
  }
};
