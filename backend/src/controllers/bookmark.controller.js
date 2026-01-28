import AppError from '../utils/appError.js';
import APIFeatures from '../utils/apiFeatures.js';
import Bookmark from '../models/bookmark.model.js';

export const createBookmark = async (req, res, next) => {
  try {
    const newBookmark = await Bookmark.create({
      user: req.body.user,
      resource: req.body.resource
    });

    res.status(201).json({
      status: 'success',
      data: {
        bookmark: newBookmark
      }
    })
    
  } catch (error) {
    return next(new AppError(error.message, 500))
  }
}

export const getAllBookmarks = async (req, res, next) => {
  try {
    const features = new APIFeatures(Bookmark.find(), req.query).filter().sort().limitFields().paginate();
    const bookmarks = await features.query.populate('user', 'name department').populate('resource', 'title type');
    
    res.status(200).json({
      status: 'success',
      results: bookmarks.length,
      data: { bookmarks }
    });

  } catch (error) {
    return next(new AppError(error.message, 500))
  }
}

export const getBookmarkById = async (req, res, next) => {
  try {
    const bookmark = await Bookmark.findById(req.params.id);

    if(!bookmark){
      return next(new AppError('No bookmark found with that ID', 404));
    }

    res.status(200).json({
      status: 'success',
      data: { bookmark }
    });
    
  } catch (error) {
    return next(new AppError(error.message, 500))
  }
}

export const updateBookmarkById = async (req, res, next) => {
  try {
    const bookmark = await Bookmark.findByIdAndUpdate(req.params.id, req.body, {
      new: true, runValidators: true
    });

    if(!bookmark){
      return next(new AppError('No bookmark found with that ID', 404));
    }

    res.status(200).json({
      status: 'success',
      data: { bookmark }
    });
    
  } catch (error) {
    return next(new AppError(error.message, 500))
  }
}

export const deleteBookmarkById = async (req, res, next) => {
  try {
    const bookmark = await Bookmark.findByIdAndDelete(req.params.id);

    if(!bookmark){
      return next(new AppError('No bookmark found with that ID', 404));
    }

    res.status(204).json({
      status: 'success',
      data: null
    })
    
  } catch (error) {
    return next(new AppError(error.message, 500))
  }
}
