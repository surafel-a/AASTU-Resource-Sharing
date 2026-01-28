import AppError from "../utils/appError.js";
import APIFeatures from "../utils/apiFeatures.js";
import Resource from "../models/resource.model.js";

export const createResource = async (req, res, next) => {
  try {
    const newResource = await Resource.create({
      type: req.body.type,
      course: req.body.course,
      department: req.body.department,
      fileUrl: req.body.fileUrl,
      title: req.body.title,
      description: req.body.description,
      uploadedBy: req.body.uploadedBy, 
    });

    res.status(201).json({
      status: 'success',
      data: { 
        course: newResource 
      }
    });
    
  } catch (error) {
    return next(new AppError(error.message, 500));
  }
}

export const getAllResources = async (req, res, next) => {
  try {
    const features = new APIFeatures(Resource.find(), req.query).filter().sort().limitFields().paginate();
    const resources = await features.query.populate('uploadedBy', 'name department').populate('course', 'code name');

    res.status(200).json({
      status: 'success',
      results: resources.length,
      data: { resources }
    });

  } catch (error) {
    return next(new AppError(error.message, 500));
  }
}

export const getResourceById = async (req, res, next) => {
  try {
    const resource = await Resource.findById(req.params.id).populate('uploadedBy', 'name department')
      .populate('course', 'code name');

    if(!resource){
      return next(new AppError('No resource found with that ID', 404));
    }

    res.status(200).json({
      status: 'success',
      data: { resource }
    })
    
  } catch (error) {
    return next(new AppError(error.message, 500));
  }
}

export const updateResourceById = async (req, res, next) => {
  try {
    const resource = await Resource.findByIdAndUpdate(req.params.id, req.body, {
      new: true, runValidators: true
    });

    if(!resource){
      return next(new AppError('No resource found with that ID', 404));
    }    

    res.status(200).json({
      status: 'success',
      data: { resource }
    });
    
  } catch (error) {
    return next(new AppError(error.message, 500));
  }
}

export const deleteResourceById = async (req, res, next) => {
  try {
    const resource = await Resource.findByIdAndDelete(req.params.id);

    if(!resource){
      return next(new AppError('No resource found with that ID', 404));
    }

    res.status(204).json({
      status: 'success',
      data: null
    });
    
  } catch (error) {
    return next(new AppError(error.message, 500));
  }
}