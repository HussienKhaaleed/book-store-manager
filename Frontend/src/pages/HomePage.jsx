import React, { useState, useEffect } from 'react';
import {
  Container,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Box,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { getBooks } from '../api';

const HomePage = () => {
  const [books, setBooks] = useState([]);
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchBooks();
  }, [search, sort]);

  const fetchBooks = async () => {
    try {
      const params = {};
      if (search) params.q = search;
      if (sort) params.sort = sort;
      const res = await getBooks(params);
      setBooks(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        backgroundColor: '#f5f5f5',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center', // centers vertically
        alignItems: 'center', // centers horizontally
        py: 5,
      }}
    >
      <Container maxWidth="lg">
        <Typography
          variant="h3"
          gutterBottom
          fontWeight="bold"
          sx={{ mb: 1, textAlign: 'center', color: '#333' }}
        >
          Explore Our Book Collection
        </Typography>
        <Typography
          variant="subtitle1"
          sx={{ textAlign: 'center', mb: 4, color: '#666' }}
        >
          Find your next favorite read — browse by title, genre, or price
        </Typography>

        {/* Search + Sort */}
        <Box
          sx={{
            mb: 4,
            display: 'flex',
            gap: 2,
            flexWrap: 'wrap',
            justifyContent: 'center',
          }}
        >
          <TextField
            label="Search by title or description"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            sx={{ width: 300, backgroundColor: 'white' }}
            size="small"
          />
          <FormControl sx={{ width: 200, backgroundColor: 'white' }} size="small">
            <InputLabel>Sort by Price</InputLabel>
            <Select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              label="Sort by Price"
            >
              <MenuItem value="">Default</MenuItem>
              <MenuItem value="price">Price: Low to High</MenuItem>
              <MenuItem value="-price">Price: High to Low</MenuItem>
            </Select>
          </FormControl>
        </Box>

        {/* Books Grid */}
        {books.length === 0 ? (
          <Typography
            variant="h6"
            sx={{ textAlign: 'center', mt: 4, color: '#666' }}
          >
            No books found
          </Typography>
        ) : (
          <Grid
            container
            spacing={3}
            justifyContent="center"
            alignItems="center"
          >
            {books.map((book) => (
              <Grid
                item
                xs={12}
                sm={6}
                md={4}
                lg={3}
                key={book._id}
                sx={{ display: 'flex', justifyContent: 'center' }}
              >
                <Card
                  sx={{
                    width: '100%',
                    maxWidth: 280,
                    backgroundColor: 'white',
                    borderRadius: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    cursor: 'pointer',
                    transition: 'transform 0.3s, box-shadow 0.3s',
                    '&:hover': {
                      transform: 'translateY(-6px)',
                      boxShadow: 6,
                    },
                  }}
                  onClick={() => navigate(`/books/${book._id}`)}
                >
                  <CardMedia
                    component="img"
                    height="320"
                    image={
                      book.bookCoverImage ||
                      'https://via.placeholder.com/300x400?text=No+Cover'
                    }
                    alt={book.title}
                    sx={{
                      objectFit: 'cover',
                      borderTopLeftRadius: 8,
                      borderTopRightRadius: 8,
                    }}
                  />

                  <CardContent sx={{ flexGrow: 1, p: 2 }}>
                    <Typography
                      variant="h6"
                      fontWeight="bold"
                      gutterBottom
                      sx={{
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        color: '#333',
                      }}
                    >
                      {book.title}
                    </Typography>

                    <Typography
                      variant="body2"
                      color="text.secondary"
                      gutterBottom
                      sx={{ mb: 1 }}
                    >
                      {book.genre || 'Unknown Genre'}
                    </Typography>

                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                        mb: 2,
                        minHeight: '40px',
                      }}
                    >
                      {book.description || 'No description available'}
                    </Typography>

                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                      }}
                    >
                      <Typography
                        variant="h6"
                        fontWeight="bold"
                        color="primary"
                      >
                        ${Number(book.price).toFixed(2)}
                      </Typography>
                      {book.publishedYear && (
                        <Typography variant="caption" color="text.secondary">
                          {book.publishedYear}
                        </Typography>
                      )}
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Container>
    </Box>
  );
};

export default HomePage;
