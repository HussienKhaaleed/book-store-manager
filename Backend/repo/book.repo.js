const bookModel = require("../models/book.model");

const getBooksWithFilters = async ({ q, sort }) => {
  let query = {};

  if (q) {
    query = {
      $or: [
        { title: { $regex: q, $options: 'i' } },
        { description: { $regex: q, $options: 'i' } }
      ]
    };
  }

  let booksQuery = bookModel.find(query).populate('createdBy', 'username name');

  if (sort === 'price') {
    booksQuery = booksQuery.sort({ price: 1 });
  } else if (sort === '-price') {
    booksQuery = booksQuery.sort({ price: -1 });
  }

  return await booksQuery;
};

const getBookById = async (id) => {
  return await bookModel.findById(id).populate('createdBy', 'username name');
};

const createBook = async (book) => {
  return await bookModel.create(book);
};

// ✅ FIXED updateBook — filters out non-schema fields
const updateBook = async (id, bookData) => {
  const { _id, id: clientId, createdBy, createdAt, updatedAt, ...rest } = bookData;

  // only allow fields defined in schema
  const allowedFields = [
    "title",
    "bookCoverImage",
    "description",
    "genre",
    "price",
    "publishedYear"
  ];

  const cleanData = {};
  for (const key of allowedFields) {
    if (rest[key] !== undefined) cleanData[key] = rest[key];
  }

  return await bookModel.findByIdAndUpdate(
    id,
    cleanData,
    { new: true, runValidators: true }
  ).populate('createdBy', 'username name');
};

const deleteBook = async (id) => {
  return await bookModel.findByIdAndDelete(id);
};

module.exports = {
  getBooksWithFilters,
  getBookById,
  createBook,
  updateBook,
  deleteBook
};
