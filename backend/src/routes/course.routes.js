import express from 'express';
import { createCourse, deleteCourseById, getAllCourses, getCourseById, updateCourseById } from '../controllers/course.controller.js';

const router = express.Router();

router
  .route('/')
  .get(getAllCourses)
  .post(createCourse);

router
  .route('/:id')
  .get(getCourseById)
  .patch(updateCourseById)
  .delete(deleteCourseById);

export default router;