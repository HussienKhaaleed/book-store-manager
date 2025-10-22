# Book Store Management System

A full-stack web application for managing a book store with user authentication, authorization, and CRUD operations for books. This application includes both a frontend built with React and a backend built with Node.js/Express.


[![Node.js Version](https://img.shields.io/badge/Node.js-16+-green.svg)](https://nodejs.org/)
[![React Version](https://img.shields.io/badge/React-19.0.0-blue.svg)](https://reactjs.org/)
[![Last Updated](https://img.shields.io/badge/Last%20Updated-October%202025-brightgreen.svg)]()

> 📚 Modern bookstore management system with secure authentication, role-based access control, and a responsive Material UI frontend.

## Features

- **User Authentication**: Register, login, and authentication using JWT tokens
- **Role-Based Access Control**: Admin and regular user roles with different permissions
- **Book Management**: CRUD operations for books (Create, Read, Update, Delete)
- **User Management**: Admin interface for managing users
- **Responsive Design**: Built with Material UI for a responsive and modern user interface
- **Search & Filter**: Search books by title/description and sort by price

## Tech Stack

### Frontend
- **Framework**: React 19
- **Routing**: React Router v7
- **UI Library**: Material UI v7
- **State Management**: React Context API
- **HTTP Client**: Axios
- **Build Tool**: Vite

### Backend
- **Runtime**: Node.js
- **Framework**: Express
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT (JSON Web Tokens)
- **Password Encryption**: bcrypt
- **Middleware**: Custom logging, authentication middleware

## Project Structure

```
├── Backend/                # Backend Node.js/Express application
│   ├── controller/         # Request handlers
│   │   ├── auth.controller.js  # Authentication logic
│   │   ├── book.controller.js  # Book management logic
│   │   └── user.controller.js  # User management logic
│   ├── Middleware/         # Custom middleware functions
│   │   ├── auth.middleware.js  # JWT verification
│   │   └── logging.middleware.js  # Request logging
│   ├── models/             # Mongoose data models
│   │   ├── book.model.js   # Book schema definition
│   │   └── user.model.js   # User schema definition
│   ├── repo/               # Data access layer
│   │   ├── book.repo.js    # Book database operations
│   │   └── user.repo.js    # User database operations
│   ├── router/             # Route definitions
│   │   ├── auth.router.js  # Authentication routes
│   │   ├── book.router.js  # Book CRUD routes
│   │   └── user.router.js  # User management routes
│   └── index.js            # Entry point
├── Frontend/               # React frontend application
│   ├── public/             # Static files
│   ├── src/                # Source code
│   │   ├── assets/         # Images and other assets
│   │   ├── components/     # Reusable components
│   │   │   ├── Navbar.jsx  # Navigation component
│   │   │   └── ProtectedRoute.jsx  # Auth guard component
│   │   ├── context/        # React Context providers
│   │   │   └── AuthContext.jsx  # Authentication state
│   │   ├── pages/          # Page components
│   │   │   ├── BookDetailsPage.jsx  # Single book view
│   │   │   ├── CreateBooksPage.jsx  # Book creation form
│   │   │   ├── EditBookPage.jsx  # Book editing form
│   │   │   ├── HomePage.jsx  # Main landing page
│   │   │   ├── LoginPage.jsx  # User login
│   │   │   ├── RegisterPage.jsx  # User registration
│   │   │   └── UsersPage.jsx  # Admin user management
│   │   ├── api.js          # API integration
│   │   ├── App.jsx         # Main component with routes
│   │   ├── App.css         # Global styles
│   │   ├── index.css       # Base styles
│   │   └── main.jsx        # Entry point
│   ├── index.html          # HTML template
│   └── vite.config.js      # Vite configuration
└── README.md               # Project documentation
```

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- MongoDB
- npm or yarn

### Environment Variables

#### Backend
Create a `.env` file in the Backend directory with the following variables:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/bookstore
JWT_SECRET=your_jwt_secret_key
```

#### Frontend
Create a `.env` file in the Frontend directory:
```
VITE_API_BASE_URL=http://localhost:5000
```

### Installation

1. Clone the repository
   ```
   git clone <repository-url>
   cd book-store-management
   ```

2. Install backend dependencies
   ```
   cd Backend
   npm install
   ```

3. Install frontend dependencies
   ```
   cd ../Frontend
   npm install
   ```

### Running the Application

1. Start the backend server
   ```
   cd Backend
   npm start
   ```
   The server will run on http://localhost:5000 by default.

2. Start the frontend development server
   ```
   cd Frontend
   npm run dev
   ```
   The frontend will be accessible at http://localhost:5173.

## API Endpoints

### Authentication
- `POST /auth/register` - Register a new user
- `POST /auth/login` - Authenticate a user

### Books
- `GET /books` - Get all books (with optional query parameters for search/sort)
- `GET /books/:id` - Get a specific book
- `POST /books` - Create a new book (authenticated)
- `PUT /books/:id` - Update a book (authenticated)
- `DELETE /books/:id` - Delete a book (authenticated)

### Users
- `GET /users` - Get all users (admin only)
- `GET /users/me` - Get current user (authenticated)
- `PATCH /users/:id/role` - Update user role (admin only)
- `DELETE /users/:id` - Delete a user (admin only)

## User Roles and Permissions

### User
- Browse all books
- View book details
- Create, edit, and delete their own books

### Admin
- All User permissions
- Manage all books (regardless of creator)
- Manage users (view all users, change roles, delete users)

## Future Enhancements

- Implement book categories/tags for better organization
- Add shopping cart functionality
- Implement user reviews and ratings for books
- Add image upload functionality for book covers
- Implement OAuth authentication (Google, Facebook, etc.)
- Add pagination for book listings
- Implement book recommendations

---

Made with ❤️ using React, Node.js, and MongoDB.
