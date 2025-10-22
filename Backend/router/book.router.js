const express = require("express");
const router = express.Router();
const bookController = require("../controller/book.controller");
const { auth } = require("../Middleware/auth.midleware");

// Public routes
router.get("/", bookController.getAllBooks);
router.get("/:id", bookController.getBookById);

// Authenticated routes
router.post("/", auth, bookController.createBook);
router.put("/:id", auth, bookController.updateBook);
router.delete("/:id", auth, bookController.deleteBook);

module.exports = router;
