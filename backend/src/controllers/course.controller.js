import AppError from "../utils/appError.js";
import APIFeatures from "../utils/apiFeatures.js";
import Course from "../models/course.model.js";

export const createCourse = async (req, res, next) => {
  try {
    const newCourse = await Course.create({
      code: req.body.code,
      name: req.body.name,
      department: req.body.department,
      courseInstructor: req.body.courseInstructor,
      year: req.body.year,
      semester: req.body.semester
    });

    res.status(201).json({
      status: 'success',
      data: { 
        course: newCourse 
      }
    });
    
  } catch (error) {
    return next(new AppError('Failed to create course', 500));
  }
}

export const getAllCourses = async (req, res, next) => {
  try {
    const features = new APIFeatures(Course.find(), req.query).filter().sort().limitFields().paginate();
    const courses = await features.query;

    res.status(200).json({
      status: 'success',
      results: courses.length,
      data: { courses }
    })
    
  } catch (error) {
    return next(new AppError('Failed to get courses', 500));
  }
}

export const getCourseById = async (req, res, next) => {
  try {
    const course = await Course.findById(req.params.id);

    if(!course){
      return next(new AppError('No course found with that ID', 404));
    }

    res.status(200).json({
      status: 'success',
      data: { course }
    });
    
  } catch (error) {
    return next(new AppError('Failed to get courses', 500));
  }
}

export const updateCourseById = async (req, res, next) => {
  try {
    const course = await Course.findByIdAndUpdate(req.params.id, req.body, { 
      new: true, runValidators: true
    });

    if(!course){
      return next(new AppError('No course found with that ID', 404));
    }

    res.status(200).json({
      status: 'success',
      data: { course }
    });
    
  } catch (error) {
    return next(new AppError('Failed to get courses', 500));
  }
}

export const deleteCourseById = async (req, res, next) => {
  try {
    const course = await Course.findByIdAndDelete(req.params.id);

    if(!course){
      return next(new AppError('No course found with that ID', 404));
    }

    res.status(204).json({
      status: 'succcess',
      data: null
    })
    
  } catch (error) {
    return next(new AppError('Failed to get courses', 500));
  }
}