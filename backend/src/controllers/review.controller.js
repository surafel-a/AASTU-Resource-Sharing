import AppError from "../utils/appError.js";
import APIFeatures from "../utils/apiFeatures.js";
import Review from "../models/review.model.js";

// ─── CREATE REVIEW ────────────────────────────────────────────────────────────
// POST /api/v1/reviews
export const createReview = async (req, res, next) => {
  try {
    const { resource, comment, rating } = req.body;

    const newReview = await Review.create({
      reviewedBy: req.user._id,
      resource,
      comment,
      rating: rating || null,
    });

    res.status(201).json({
      status: "success",
      data: { review: newReview },
    });
  } catch (error) {
    // Duplicate key = user already reviewed this resource
    if (error.code === 11000) {
      return next(
        new AppError("You have already reviewed this resource.", 409),
      );
    }
    return next(new AppError(error.message, 500));
  }
};

// ─── GET ALL REVIEWS ──────────────────────────────────────────────────────────
// GET /api/v1/reviews
export const getAllReviews = async (req, res, next) => {
  try {
    const features = new APIFeatures(Review.find(), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();

    const reviews = await features.query
      .populate("reviewedBy", "name department photo")
      .populate("resource", "title type");

    res.status(200).json({
      status: "success",
      results: reviews.length,
      data: { reviews },
    });
  } catch (error) {
    return next(new AppError(error.message, 500));
  }
};

// ─── GET REVIEW BY ID ─────────────────────────────────────────────────────────
// GET /api/v1/reviews/:id
export const getReviewById = async (req, res, next) => {
  try {
    const review = await Review.findById(req.params.id)
      .populate("reviewedBy", "name department photo")
      .populate("resource", "title type");

    if (!review) {
      return next(new AppError("No review found with that ID", 404));
    }

    res.status(200).json({
      status: "success",
      data: { review },
    });
  } catch (error) {
    return next(new AppError(error.message, 500));
  }
};

// ─── UPDATE REVIEW BY ID ──────────────────────────────────────────────────────
// PATCH /api/v1/reviews/:id
export const updateReviewById = async (req, res, next) => {
  try {
    const review = await Review.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!review) {
      return next(new AppError("No review found with that ID", 404));
    }

    res.status(200).json({
      status: "success",
      data: { review },
    });
  } catch (error) {
    return next(new AppError(error.message, 500));
  }
};

// ─── DELETE REVIEW BY ID ──────────────────────────────────────────────────────
// DELETE /api/v1/reviews/:id
export const deleteReviewById = async (req, res, next) => {
  try {
    const review = await Review.findByIdAndDelete(req.params.id);

    if (!review) {
      return next(new AppError("No review found with that ID", 404));
    }

    res.status(204).json({
      status: "success",
      data: null,
    });
  } catch (error) {
    return next(new AppError(error.message, 500));
  }
};

// ─── TOGGLE REACTION (LIKE / DISLIKE) ────────────────────────────────────────
// POST /api/v1/reviews/:resourceId/react
// body: { reaction: "like" | "dislike" }
//
// Logic:
//   - If no review exists yet → create one with the reaction
//   - If same reaction → remove it (toggle off)
//   - If different reaction → switch to the new one
export const toggleReaction = async (req, res, next) => {
  try {
    const { resourceId } = req.params;
    const { reaction } = req.body;

    if (!["like", "dislike"].includes(reaction)) {
      return next(new AppError('Reaction must be "like" or "dislike"', 400));
    }

    let review = await Review.findOne({
      resource: resourceId,
      reviewedBy: req.user._id,
    });

    if (!review) {
      // First interaction — create review with this reaction
      review = await Review.create({
        resource: resourceId,
        reviewedBy: req.user._id,
        reaction,
      });
    } else if (review.reaction === reaction) {
      // Same reaction clicked again → toggle off
      review.reaction = null;
      await review.save();
    } else {
      // Different reaction → switch
      review.reaction = reaction;
      await review.save();
    }

    // Return updated summary so frontend can update counts instantly
    const summary = await Review.getSummary(resourceId);

    res.status(200).json({
      status: "success",
      data: {
        userReaction: review.reaction,
        summary,
      },
    });
  } catch (error) {
    return next(new AppError(error.message, 500));
  }
};

// ─── RATE A RESOURCE ──────────────────────────────────────────────────────────
// POST /api/v1/reviews/:resourceId/rate
// body: { rating: 1-5 }
export const rateResource = async (req, res, next) => {
  try {
    const { resourceId } = req.params;
    const { rating } = req.body;

    if (!rating || rating < 1 || rating > 5) {
      return next(new AppError("Rating must be between 1 and 5", 400));
    }

    const review = await Review.findOneAndUpdate(
      { resource: resourceId, reviewedBy: req.user._id },
      { rating },
      { new: true, upsert: true, runValidators: true },
    );

    const summary = await Review.getSummary(resourceId);

    res.status(200).json({
      status: "success",
      data: {
        userRating: review.rating,
        summary,
      },
    });
  } catch (error) {
    return next(new AppError(error.message, 500));
  }
};

// ─── GET RESOURCE REVIEW SUMMARY ─────────────────────────────────────────────
// GET /api/v1/reviews/:resourceId/summary
export const getResourceSummary = async (req, res, next) => {
  try {
    const { resourceId } = req.params;

    const summary = await Review.getSummary(resourceId);

    // Also fetch current user's review if logged in
    let userReview = null;
    if (req.user) {
      userReview = await Review.findOne({
        resource: resourceId,
        reviewedBy: req.user._id,
      });
    }

    res.status(200).json({
      status: "success",
      data: {
        summary,
        userReview: userReview
          ? {
              reaction: userReview.reaction,
              rating: userReview.rating,
              comment: userReview.comment,
            }
          : null,
      },
    });
  } catch (error) {
    return next(new AppError(error.message, 500));
  }
};
