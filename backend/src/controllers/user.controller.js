import AppError from "../utils/appError.js";
import APIFeatures from "../utils/apiFeatures.js";
import User from "../models/user.model.js";

/* ============================ ADMIN CONTROLLERS ============================ */ 
export const getAllUsers = async (req, res, next) => {
  try {
    const features = new APIFeatures(User.find(), req.query).filter().sort().limitFields().paginate();
    const users = await features.query;

    res.status(200).json({
      status: 'success',
      results: users.length,
      data: { users }
    });

  } catch (error) {
    return next(new AppError('Failed to get users', 500));
  }
};

export const getUserById = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);

    if(!user){
      return next(new AppError('No user found with that ID', 404));
    }

    res.status(200).json({
      status: 'success',
      data: { user }
    })

  } catch (error) {
    return next(new AppError('Failed to get user', 500));
  }
}

export const updateUserById = async (req, res, next) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });

    if(!user){
      return next(new AppError('No user found with that ID', 404));
    }

    res.status(200).json({
      status: 'success',
      data: { user }
    })
    
  } catch (error) {
    return next(new AppError('Failed to update user', 500));
  }
}

export const deleteUserById = async (req, res, next) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);

    if(!user){
      return next(new AppError('No user found with that ID', 404));
    }

    res.status(204).json({
      status: 'success',
      data: null
    })
    
  } catch (error) {
    return next(new AppError('Failed to delete user', 500));
  }
}

/* ============================ USER CONTROLLERS ============================ */ 
export const getMe = async (req, res, next) => {
  try {
    const user = await req.user;
    console.log(user);

    res.status(200).json({
      status: 'success',
      data: { user }
    })

  } catch (error) {
    return next(new AppError('Failed to get user profile', 500));
  }
}

export const updateMe = async (req, res, next) => {
  try {
    const forbiddenFields = ['role', 'password', 'passwordConfirm', 'universityId'];
    forbiddenFields.forEach(field => delete req.body[field]);

    const user = await User.findByIdAndUpdate(req.user.id, req.body, { 
      new: true, runValidators: true 
    });
    
    res.status(200).json({
      status: 'success',
      data: { user }
    })
    
    
  } catch (error) {
    console.log(error);
    return next(new AppError('Failed to update user profile', 500));
  }
}

export const deleteMe = async (req, res, next) => {
  try {
    await User.findByIdAndDelete(req.user.id);

    res.status(204).json({
      status: 'success',
      data: null
    })

  } catch (error) {
    return next(new AppError('Failed to delete user profile', 500));
  }
}