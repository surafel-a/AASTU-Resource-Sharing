import mongoose from "mongoose";

const resourceSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['doc', 'pdf', 'ppt', 'video', 'other'],
    required: [true, 'Please specify the resource type']
  },
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course',
    required: [true, 'Resource must be associated with a course']
  },
  department: {
    type: String,
    required: [true, 'Please provide the department associated with the resource'],
    trim: true
  },
  title: {
    type: String,
    required: [true, 'Please provide a title for the resource'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Please provide a description for the resource'],
    trim: true
  },
  fileUrl: {
    type: String,
    required: [true, 'Please provide a file']
  },
  uploadedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Resource must be associated with a user']
  },
  visibility: {
    type: String,
    enum: ['public', 'department', 'course'],
    default: 'public'
  },
  downloads: {
    type: Number,
    default: 0
  }
}, { timestamps: true });

const Resource = mongoose.model('Resource', resourceSchema);

export default Resource;