  import React, { useState, useEffect } from "react";
  import { useNavigate, useParams } from "react-router-dom";
  import { getBook, updateBook } from "../api";
  import {
    Box,
    Container,
    TextField,
    Typography,
    Button,
    Alert,
  } from "@mui/material";

  const EditBookPage = () => {
    const [formData, setFormData] = useState({
      title: "",
      bookCoverImage: "",
      description: "",
      genre: "",
      price: "",
      publishedYear: "",
      createdBy: "",
    });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const { id } = useParams();

    // Fetch book data
    useEffect(() => {
      const fetchBook = async () => {
        try {
          const res = await getBook(id);
          const book = res.data;

          setFormData({
            title: book.title || "",
            bookCoverImage: book.bookCoverImage || "",
            description: book.description || "",
            genre: book.genre || "",
            price: book.price || "",
            publishedYear: book.publishedYear || "",
            createdBy: book.createdBy?._id || book.createdBy || "",
          });
        } catch (err) {
          setError("Book not found");
        } finally {
          setLoading(false);
        }
      };
      fetchBook();
    }, [id]);

    // Handle input
    const handleChange = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Handle submit
    const handleSubmit = async (e) => {
      e.preventDefault();
      setError("");

      const cleanData = {
        title: formData.title.trim(),
        bookCoverImage: formData.bookCoverImage.trim(),
        description: formData.description.trim(),
        genre: formData.genre.trim(),
        price: Number(formData.price),
        publishedYear: Number(formData.publishedYear) || undefined,
        createdBy: formData.createdBy, // ✅ keep same id
      };

      console.log("📤 Sending data to backend:", cleanData);

      try {
        await updateBook(id, cleanData);
        navigate(`/books/${id}`);
      } catch (err) {
        console.error("❌ Update error:", err.response?.data);
        setError(err.response?.data?.message || "Failed to update book");
      }
    };

    if (loading) return <Typography>Loading...</Typography>;

    return (
      <Container maxWidth="sm">
        <Box mt={4}>
          <Typography variant="h4" gutterBottom>
            Edit Book
          </Typography>

          {error && <Alert severity="error">{error}</Alert>}

          <form onSubmit={handleSubmit}>
            <TextField
              label="Title"
              name="title"
              fullWidth
              margin="normal"
              value={formData.title}
              onChange={handleChange}
              required
            />
            <TextField
              label="Book Cover Image"
              name="bookCoverImage"
              fullWidth
              margin="normal"
              value={formData.bookCoverImage}
              onChange={handleChange}
              required
            />
            <TextField
              label="Description"
              name="description"
              fullWidth
              margin="normal"
              multiline
              rows={4}
              value={formData.description}
              onChange={handleChange}
            />
            <TextField
              label="Genre"
              name="genre"
              fullWidth
              margin="normal"
              value={formData.genre}
              onChange={handleChange}
            />
            <TextField
              label="Price"
              name="price"
              type="number"
              fullWidth
              margin="normal"
              value={formData.price}
              onChange={handleChange}
              inputProps={{ min: 0, step: 0.01 }}
              required
            />
            <TextField
              label="Published Year"
              name="publishedYear"
              type="number"
              fullWidth
              margin="normal"
              value={formData.publishedYear}
              onChange={handleChange}
            />
            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{ mt: 2, bgcolor: "#1976d2" }}
            >
              Update Book
            </Button>
          </form>
        </Box>
      </Container>
    );
  };

  export default EditBookPage;
