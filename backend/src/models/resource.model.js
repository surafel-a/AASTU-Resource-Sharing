import mongoose from "mongoose";

const resourceSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['doc', 'pdf', 'ppt', 'video', 'other'],
    required: [true, 'Please specify the resource type']
  },
  course: {
    type: String,
    required: [true, 'Please provide the course associated with the resource'],
    trim: true
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
    required: [true, 'Please provide a file URL for the resource'],
    trim: true
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
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Resource = mongoose.model('Resource', resourceSchema);

export default Resource;