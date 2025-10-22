import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import BookDetailsPage from './pages/BookDetailsPage';
import CreateBookPage from './pages/CreateBooksPage';
import EditBookPage from './pages/EditBookPage';
import UsersPage from './pages/UsersPage';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/books/:id" element={<BookDetailsPage />} />
          <Route path="/create-book" element={<ProtectedRoute><CreateBookPage /></ProtectedRoute>} />
          <Route path="/edit-book/:id" element={<ProtectedRoute><EditBookPage /></ProtectedRoute>} />
          <Route path="/users" element={<ProtectedRoute adminOnly><UsersPage /></ProtectedRoute>} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;