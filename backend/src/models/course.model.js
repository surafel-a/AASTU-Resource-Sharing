import mongoose from "mongoose";

const courseSchema = new mongoose.Schema({
  code: {
    type: String,
    required: [true, 'Please provide the course code'],
    unique: true,
    trim: true
  },
  name: {
    type: String,
    required: [true, 'Please provide the course name'],
    trim: true
  },
  department: {
    type: String,
    required: [true, 'Please provide the department for the course'],
    trim: true
  },
  courseInstructor: {
    type: String,
    required: [true, 'Course must have an instructor']
  },
  year: {
    type: Number,
    required: [true, 'Please provide the year of study for the course'],
    min: 1,
    max: 6
  },
  semester: {
    type: Number,
    required: [true, 'Please provide the semester for the course'],
    enum: [1, 2]
  }
}, { timestamps: true });

const Course = mongoose.model('Course', courseSchema);

export default Course;