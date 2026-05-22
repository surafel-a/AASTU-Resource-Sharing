import mongoose from "mongoose";

const reportSchema = new mongoose.Schema(
  {
    // Who filed the report
    reportedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null, // null = anonymous
    },

    // What kind of content is being reported
    targetType: {
      type: String,
      enum: ["Resource", "Comment", "User"],
      required: [true, "Please specify what you are reporting"],
    },

    // The ID of the resource, comment, or user being reported
    targetId: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, "Report must reference a target"],
      refPath: "targetType", // dynamic ref — resolves to Resource, Comment, or User
    },

    // Why the content is being reported
    reason: {
      type: String,
      enum: [
        "Incorrect Category",
        "Harassment",
        "Spamming",
        "Plagiarism",
        "Inappropriate Content",
        "Misinformation",
        "Other",
      ],
      required: [true, "Please provide a reason for the report"],
    },

    // Extra detail the reporter can add (optional)
    description: {
      type: String,
      trim: true,
      maxlength: [500, "Description cannot exceed 500 characters"],
      default: "",
    },

    // Admin workflow status
    status: {
      type: String,
      enum: ["New", "Under Review", "Resolved", "Dismissed"],
      default: "New",
    },

    // Admin who handled this report
    resolvedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },

    // Admin note when resolving
    resolutionNote: {
      type: String,
      trim: true,
      default: "",
    },

    resolvedAt: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true },
);

// Index for fast admin queries — filter by status, targetType, date
reportSchema.index({ status: 1, targetType: 1, createdAt: -1 });

// Prevent a user from reporting the same content twice
reportSchema.index(
  { reportedBy: 1, targetType: 1, targetId: 1 },
  { unique: true },
);

const Report = mongoose.model("Report", reportSchema);

export default Report;
