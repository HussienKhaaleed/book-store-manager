import React, { useState, useEffect, useContext } from 'react';
import { Container, Typography, Box, Button, Card, Alert } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import { getBook, deleteBook } from '../api';
import { AuthContext } from '../context/AuthContext';

const BookDetailsPage = () => {
  const [book, setBook] = useState(null);
  const [error, setError] = useState('');
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    fetchBook();
  }, [id]);

  const fetchBook = async () => {
    try {
      const res = await getBook(id);
      setBook(res.data);
    } catch (err) {
      setError('Book not found');
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this book?')) {
      try {
        await deleteBook(id);
        navigate('/');
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to delete book');
      }
    }
  };

  // ONLY ADMIN can edit/delete
  const isAdmin = user && user.role === 'admin';

  // Debug
  console.log('User:', user);
  console.log('User Role:', user?.role);
  console.log('Is Admin:', isAdmin);

  if (error) {
    return (
      <Box sx={{ minHeight: '100vh', backgroundColor: '#f5f5f5', py: 4 }}>
        <Container>
          <Alert severity="error">{error}</Alert>
          <Button variant="contained" onClick={() => navigate('/')} sx={{ mt: 2 }}>
            BACK TO BOOKS
          </Button>
        </Container>
      </Box>
    );
  }

  if (!book) {
    return (
      <Box sx={{ 
        minHeight: '100vh',
        backgroundColor: '#f5f5f5',
        py: 4,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <Typography variant="h5">Loading...</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: '#f5f5f5', py: 4 }}>
      <Container maxWidth="lg">
        <Card sx={{ overflow: 'hidden', boxShadow: 3 }}>
          <Box sx={{ 
            display: 'flex', 
            flexDirection: { xs: 'column', md: 'row' },
            minHeight: '600px'
          }}>
            {/* Left Side - Book Cover */}
            <Box sx={{ 
              flex: '0 0 400px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#2c2c2c',
              p: 4
            }}>
              <img 
                src={book.bookCoverImage || 'https://via.placeholder.com/300x450?text=No+Cover'}
                alt={book.title}
                style={{
                  maxWidth: '100%',
                  maxHeight: '500px',
                  objectFit: 'contain',
                  borderRadius: '8px',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.5)'
                }}
              />
            </Box>

            {/* Right Side - Book Details */}
            <Box sx={{ flex: 1, p: 4 }}>
              <Typography variant="h3" gutterBottom fontWeight="bold" color="primary">
                {book.title}
              </Typography>

              <Typography variant="h6" color="text.secondary" gutterBottom sx={{ mb: 3 }}>
                by {book.author || 'Unknown Author'}
              </Typography>

              <Typography variant="body1" paragraph sx={{ color: 'text.secondary', lineHeight: 1.8, my: 3 }}>
                {book.description || 'No description available for this book.'}
              </Typography>

              <Box sx={{ mb: 3 }}>
                <Typography variant="body1" color="text.secondary" gutterBottom>
                  <strong>Genre:</strong> {book.genre || 'Not specified'}
                </Typography>
                {book.publishedYear && (
                  <Typography variant="body1" color="text.secondary">
                    <strong>Published Year:</strong> {book.publishedYear}
                  </Typography>
                )}
              </Box>

              <Typography variant="h4" fontWeight="bold" color="primary" sx={{ mb: 3 }}>
                ${Number(book.price).toFixed(2)}
              </Typography>

              <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
                <Button 
                  variant="outlined"
                  onClick={() => navigate('/')}
                  fullWidth
                >
                  BACK TO BOOKS
                </Button>
              </Box>

              {/* Show Edit/Delete ONLY if user is ADMIN */}
              {isAdmin && (
                <Box sx={{ display: 'flex', gap: 2 }}>
                  <Button 
                    variant="contained"
                    onClick={() => navigate(`/edit-book/${id}`)}
                    fullWidth
                  >
                    EDIT
                  </Button>
                  <Button 
                    variant="contained"
                    color="error"
                    onClick={handleDelete}
                    fullWidth
                  >
                    DELETE
                  </Button>
                </Box>
              )}

              {user && !isAdmin && (
                <Typography variant="caption" color="text.secondary" sx={{ mt: 2, display: 'block' }}>
                  Only administrators can edit or delete books.
                </Typography>
              )}
            </Box>
          </Box>
        </Card>
      </Container>
    </Box>
  );
};

export default BookDetailsPage;