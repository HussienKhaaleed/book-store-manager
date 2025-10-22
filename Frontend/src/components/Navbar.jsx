import React, { useContext } from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
  const { user, logoutUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logoutUser();
    navigate('/login');
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1, cursor: 'pointer' }} onClick={() => navigate('/')}>
          BookStore
        </Typography>
        
        {user ? (
          <Box>
            <Button color="inherit" onClick={() => navigate('/')}>Books</Button>
            <Button color="inherit" onClick={() => navigate('/create-book')}>Add Book</Button>
            {user.role === 'admin' && (
              <Button color="inherit" onClick={() => navigate('/users')}>Users</Button>
            )}
            <Button color="inherit" onClick={handleLogout}>Logout ({user.username})</Button>
          </Box>
        ) : (
          <Box>
            <Button color="inherit" onClick={() => navigate('/login')}>Login</Button>
            <Button color="inherit" onClick={() => navigate('/register')}>Register</Button>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;