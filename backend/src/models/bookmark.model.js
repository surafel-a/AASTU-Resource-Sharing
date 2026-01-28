import mongoose from "mongoose";

const bookmarkSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Bookmark must be associated with a user']
  },
  resource: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Resource',
    required: [true, 'Bookmark must be associated with a resource']
  }
});

const Bookmark = mongoose.model('Bookmark', bookmarkSchema);

export default Bookmark;