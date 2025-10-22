const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  bookCoverImage: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: false
  },
  genre: {
    type: String,
    required: false
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  publishedYear: {
    type: Number,
    required: false
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, { 
  versionKey: false,
  timestamps: true
});

const bookModel = mongoose.model("Book", bookSchema);
module.exports = bookModel;
