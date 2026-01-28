import AppError from "../utils/appError.js";
import APIFeatures from "../utils/apiFeatures.js";
import Review from "../models/review.model.js";

export const createReview = async (req, res, next) => {
  try {
    const newReview = await Review.create({
      reviewdBy: req.body.reviewdBy,
      resource: req.body.resource,
      comment: req.body.comment,
      rating: req.body.rating
    });

    res.status(201).json({
      status: 'success',
      data: {
        review: newReview
      }
    });
    
  } catch (error) {
    return next(new AppError(error.message, 500));
  }
}

export const getAllReviews = async (req, res, next) => {
  try {
    const features = new APIFeatures(Review.find(), req.query).filter().sort().limitFields().paginate();
    const reviews = await features.query.populate('reviewedBy', 'name department').populate('resource', 'title type');

    res.status(200).json({
      status: 'success',
      results: reviews.length,
      data: { reviews }
    });
    
  } catch (error) {
    return next(new AppError(error.message, 500));
  }
};

export const getReviewById = async (req, res, next) => {
  try {
    const review = await Review.findById(req.params.id).populate('reviewedBy', 'name department').populate('resource', 'title type');

    if(!review){
      return next(new AppError('No review found with that ID', 404));
    }

    res.status(200).json({
      status: 'success',
      data: { review }
    })
    
  } catch (error) {
    return next(new AppError(error.message, 500));
  }
};

export const updateReviewById = async (req, res, next) => {
  try {
    const review = await Review.findByIdAndUpdate(req.params.id, req.body, { 
      new: true, runValidators: true
    });

    if(!review){
      return next(new AppError('No review found with that ID', 404));
    }

    res.status(200).json({
      status: 'success',
      data: { review }
    })
    
  } catch (error) {
    return next(new AppError(error.message, 500));
  }
};

export const deleteReviewById = async (req, res, next) => {
  try {
    const review = await Review.findByIdAndDelete(req.params.id);

    if(!review){
      return next(new AppError('No review found with that ID', 404));
    }

    res.status(204).json({
      status: 'success',
      data: null
    });
    
  } catch (error) {
    return next(new AppError(error.message, 500));
  }
};