import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
    reviewedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Review must belong to a user"],
    },
    resource: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Resource",
      required: [true, "Review must belong to a resource"],
    },
    comment: {
      type: String,
      trim: true,
      maxlength: [500, "Review comment cannot exceed 500 characters"],
    },
    rating: {
      type: Number,
      min: [1, "Rating must be at least 1"],
      max: [5, "Rating cannot exceed 5"],
      default: null,
    },
    reaction: {
      type: String,
      enum: ["like", "dislike", null],
      default: null,
    },
  },
  { timestamps: true },
);

reviewSchema.index({ resource: 1, reviewedBy: 1 }, { unique: true });

reviewSchema.statics.getSummary = async function (resourceId) {
  const result = await this.aggregate([
    { $match: { resource: new mongoose.Types.ObjectId(resourceId) } },
    {
      $group: {
        _id: null,
        likes: {
          $sum: { $cond: [{ $eq: ["$reaction", "like"] }, 1, 0] },
        },
        dislikes: {
          $sum: { $cond: [{ $eq: ["$reaction", "dislike"] }, 1, 0] },
        },
        avgRating: { $avg: "$rating" },
        totalRatings: {
          $sum: { $cond: [{ $ne: ["$rating", null] }, 1, 0] },
        },
        totalReviews: { $sum: 1 },
      },
    },
  ]);

  return (
    result[0] || {
      likes: 0,
      dislikes: 0,
      avgRating: null,
      totalRatings: 0,
      totalReviews: 0,
    }
  );
};

const Review = mongoose.model("Review", reviewSchema);

export default Review;
