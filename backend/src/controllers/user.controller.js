import AppError from "../utils/appError.js";
import APIFeatures from "../utils/apiFeatures.js";
import User from "../models/user.model.js";
import Resource from "../models/resource.model.js";

import { streamUpload } from "../middlewares/multer.middleware.js";
import cloudinary from "../config/cloudinary.js";

/* ============================ ADMIN CONTROLLERS ============================ */
export const getAllUsers = async (req, res, next) => {
  try {
    const features = new APIFeatures(User.find(), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();
    const users = await features.query;

    res.status(200).json({
      status: "success",
      results: users.length,
      data: { users },
    });
  } catch (error) {
    return next(new AppError("Failed to get users", 500));
  }
};

export const getUserById = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return next(new AppError("No user found with that ID", 404));
    }

    res.status(200).json({
      status: "success",
      data: { user },
    });
  } catch (error) {
    return next(new AppError("Failed to get user", 500));
  }
};

export const updateUserById = async (req, res, next) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!user) {
      return next(new AppError("No user found with that ID", 404));
    }

    res.status(200).json({
      status: "success",
      data: { user },
    });
  } catch (error) {
    return next(new AppError("Failed to update user", 500));
  }
};

export const deleteUserById = async (req, res, next) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);

    if (!user) {
      return next(new AppError("No user found with that ID", 404));
    }

    res.status(204).json({
      status: "success",
      data: null,
    });
  } catch (error) {
    return next(new AppError("Failed to delete user", 500));
  }
};

// NEW: Real stats for the Admin Profile page
export const getAdminStats = async (req, res, next) => {
  try {
    const adminId = req.user._id;

    const [totalApprovals, totalUploads, totalUsers] = await Promise.all([
      // Resources that this admin approved (status = approved, we count all approved resources)
      Resource.countDocuments({ status: "approved" }),
      // Resources uploaded by this admin
      Resource.countDocuments({ uploadedBy: adminId }),
      // Total registered users
      User.countDocuments({ role: "student" }),
    ]);

    res.status(200).json({
      status: "success",
      data: {
        totalApprovals,
        totalUploads,
        totalUsers,
        lastLogin: req.user.updatedAt, // approximate — updatedAt changes on login
      },
    });
  } catch (error) {
    return next(new AppError("Failed to fetch admin stats", 500));
  }
};

/* ============================ USER CONTROLLERS ============================ */
export const getMe = async (req, res, next) => {
  try {
    const user = await req.user;

    res.status(200).json({
      status: "success",
      data: { user },
    });
  } catch (error) {
    return next(new AppError("Failed to get user profile", 500));
  }
};

export const updateMe = async (req, res, next) => {
  try {
    const forbiddenFields = [
      "role",
      "password",
      "passwordConfirm",
      "universityId",
    ];
    forbiddenFields.forEach((field) => delete req.body[field]);

    if (req.file) {
      const currentUser = await User.findById(req.user._id);

      if (currentUser?.photoId) {
        await cloudinary.uploader.destroy(currentUser.photoId);
      }

      const result = await streamUpload(req.file.buffer, "AASTU_Profiles");

      req.body.photo = result.secure_url;
      req.body.photoId = result.public_id;
    }

    const user = await User.findByIdAndUpdate(req.user.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      status: "success",
      data: { user },
    });
  } catch (error) {
    console.log(error);
    return next(new AppError("Failed to update user profile", 500));
  }
};

export const deleteMe = async (req, res, next) => {
  try {
    await User.findByIdAndDelete(req.user.id);

    res.status(204).json({
      status: "success",
      data: null,
    });
  } catch (error) {
    return next(new AppError("Failed to delete user profile", 500));
  }
};
