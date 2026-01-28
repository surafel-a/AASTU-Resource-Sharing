import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
  reviewedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  resource: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Resource',
  },
  comment: {
    type: String,
    trim: true
  },
  rating: {
    type: Number,
    min: 1,
    default: 1
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Review = mongoose.model('Review', reviewSchema);

export default Review;