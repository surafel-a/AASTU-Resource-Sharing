import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema(
  {
    // Who this notification is for (always the admin for now)
    recipient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Notification must have a recipient"],
    },

    type: {
      type: String,
      enum: ["user", "resource", "system", "approval", "report"],
      required: [true, "Notification must have a type"],
    },

    title: {
      type: String,
      required: [true, "Notification must have a title"],
      trim: true,
    },

    message: {
      type: String,
      required: [true, "Notification must have a message"],
      trim: true,
    },

    // Optional link to the related document
    relatedModel: {
      type: String,
      enum: ["User", "Resource", "Report", "Course"],
      default: null,
    },
    relatedId: {
      type: mongoose.Schema.Types.ObjectId,
      default: null,
    },

    read: {
      type: Boolean,
      default: false,
    },

    readAt: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true },
);

// Index for fast queries: get all notifications for a user, newest first
notificationSchema.index({ recipient: 1, createdAt: -1 });
notificationSchema.index({ recipient: 1, read: 1 });

const Notification = mongoose.model("Notification", notificationSchema);

export default Notification;
