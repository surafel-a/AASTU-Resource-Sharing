import mongoose from "mongoose";

const commentSchema = new mongoose.Schema(
  {
    // The resource this comment belongs to
    resource: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Resource",
      required: [true, "Comment must belong to a resource"],
    },

    // The user who wrote this comment
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Comment must have an author"],
    },

    content: {
      type: String,
      required: [true, "Comment content cannot be empty"],
      trim: true,
      maxlength: [1000, "Comment cannot exceed 1000 characters"],
    },

    // If this comment is a reply, it points to the parent comment
    // null means it's a top-level comment
    parentComment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment",
      default: null,
    },

    // Array of user IDs who liked this comment
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],

    // Array of user IDs who disliked this comment
    dislikes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],

    // Soft delete — admin can remove content without wiping it from DB
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

// Virtual: count of replies (populated separately when needed)
commentSchema.virtual("replyCount", {
  ref: "Comment",
  localField: "_id",
  foreignField: "parentComment",
  count: true,
});

// Index for fast lookup of all top-level comments on a resource
commentSchema.index({ resource: 1, parentComment: 1, createdAt: -1 });

const Comment = mongoose.model("Comment", commentSchema);

export default Comment;
