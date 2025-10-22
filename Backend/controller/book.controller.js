const bookRepo = require("../repo/book.repo");

const getAllBooks = async (req, res) => {
  try {
    const { q, sort } = req.query;

    if (sort && !['price', '-price'].includes(sort)) {
      return res.status(400).json({ message: "Invalid sort" });
    }

    const books = await bookRepo.getBooksWithFilters({ q, sort });
    res.json(books);
  } catch (error) {
    console.error("GetAllBooks Error:", error.message);
    res.status(400).json({ message: "Invalid request" });
  }
};

const getBookById = async (req, res) => {
  try {
    const book = await bookRepo.getBookById(req.params.id);
    if (!book) return res.status(404).json({ message: "Not found" });
    res.json(book);
  } catch (error) {
    console.error("GetBookById Error:", error.message);
    res.status(400).json({ message: "Invalid request" });
  }
};

const createBook = async (req, res) => {
  try {
    const { title, bookCoverImage, description, genre, price, publishedYear } = req.body;

    if (!title || !bookCoverImage || price === undefined || price < 0) {
      return res.status(400).json({ message: "Invalid request" });
    }

    const book = await bookRepo.createBook({
      title,
      bookCoverImage,
      description,
      genre,
      price,
      publishedYear,
      createdBy: req.user._id
    });

    res.status(201).json(book);
  } catch (error) {
    console.error("CreateBook Error:", error.message);
    res.status(400).json({ message: "Invalid request" });
  }
};

const updateBook = async (req, res) => {
  try {
    const { id } = req.params;
    const book = await bookRepo.getBookById(id);

    if (!book) return res.status(404).json({ message: "Not found" });

    // Authorization
    if (book.createdBy._id.toString() !== req.user._id.toString() && req.user.role !== "admin") {
      return res.status(403).json({ message: "Forbidden" });
    }

    // 🧩 Ignore createdBy field if it’s sent
    const { createdBy, ...updateData } = req.body;

    // 🧠 Validate price separately
    if (updateData.price !== undefined && updateData.price < 0) {
      return res.status(400).json({ message: "Invalid price" });
    }

    const updatedBook = await bookRepo.updateBook(id, updateData);
    res.json(updatedBook);
  } catch (error) {
    console.error("UpdateBook Error:", error.message);
    res.status(400).json({ message: "Invalid request" });
  }
};

const deleteBook = async (req, res) => {
  try {
    const { id } = req.params;
    const book = await bookRepo.getBookById(id);

    if (!book) return res.status(404).json({ message: "Not found" });
    if (book.createdBy._id.toString() !== req.user._id.toString() && req.user.role !== "admin") {
      return res.status(403).json({ message: "Forbidden" });
    }

    await bookRepo.deleteBook(id);
    res.json({ message: "Book deleted successfully" });
  } catch (error) {
    console.error("DeleteBook Error:", error.message);
    res.status(400).json({ message: "Invalid request" });
  }
};

module.exports = {
  getAllBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook,
};
