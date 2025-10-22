import React, { useState } from 'react';
import { Container, TextField, Button, Typography, Box, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { createBook } from '../api';

const CreateBookPage = () => {
  const [formData, setFormData] = useState({
    title: '',
    bookCoverImage: '',
    description: '',
    genre: '',
    price: '',
    publishedYear: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await createBook(formData);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create book');
    }
  };

  return (
    <Container maxWidth="sm">
      <Box mt={4}>
        <Typography variant="h4" gutterBottom>Create New Book</Typography>
        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            margin="normal"
            required
          />
          <TextField
            fullWidth
            label="Book Cover Image URL"
            name="bookCoverImage"
            value={formData.bookCoverImage}
            onChange={handleChange}
            margin="normal"
            required
          />
          <TextField
            fullWidth
            label="Description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            margin="normal"
            multiline
            rows={4}
          />
          <TextField
            fullWidth
            label="Genre"
            name="genre"
            value={formData.genre}
            onChange={handleChange}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Price"
            name="price"
            type="number"
            value={formData.price}
            onChange={handleChange}
            margin="normal"
            required
            inputProps={{ min: 0, step: 0.01 }}
          />
          <TextField
            fullWidth
            label="Published Year"
            name="publishedYear"
            type="number"
            value={formData.publishedYear}
            onChange={handleChange}
            margin="normal"
          />
          <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
            Create Book
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default CreateBookPage;