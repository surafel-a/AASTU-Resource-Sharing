import express from 'express';

import { protect } from '../middlewares/auth.middleware.js';
import { createCourse, deleteCourseById, getAllCourses, getCourseById, updateCourseById } from '../controllers/course.controller.js';

const router = express.Router();

router
  .route('/')
  .get(getAllCourses)
  .post(protect, createCourse);

router
  .route('/:id')
  .get(getCourseById)
  .patch(protect, updateCourseById)
  .delete(protect, deleteCourseById);

export default router;