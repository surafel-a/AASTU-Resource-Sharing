import mongoose from "mongoose";

const adminSettingsSchema = new mongoose.Schema(
  {
    // One settings document per admin user
    admin: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },

    // Account info (mirrors User fields that admin can update from Settings page)
    account: {
      name: { type: String, default: "" },
      phoneNumber: { type: String, default: "" },
    },

    // Security
    security: {
      twoFactorEnabled: { type: Boolean, default: false },
    },

    // System preferences
    preferences: {
      darkMode: { type: Boolean, default: false },
      language: {
        type: String,
        enum: ["English (US)", "Amharic", "Afaan Oromoo", "Tigrinya"],
        default: "English (US)",
      },
      timezone: {
        type: String,
        enum: ["UTC +3 (EAT)", "UTC +0 (GMT)", "UTC +1 (CET)", "UTC +2 (CAT)"],
        default: "UTC +3 (EAT)",
      },
    },

    // Notification preferences
    notifications: {
      emailNotifications: { type: Boolean, default: true },
      pushNotifications: { type: Boolean, default: true },
      resourceApprovalAlerts: { type: Boolean, default: true },
      uploadProgressAlerts: { type: Boolean, default: false },
    },
  },
  { timestamps: true },
);

const AdminSettings = mongoose.model("AdminSettings", adminSettingsSchema);

export default AdminSettings;
