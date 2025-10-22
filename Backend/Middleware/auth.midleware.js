const jwt = require('jsonwebtoken');
const userModel = require('../models/user.model');

const auth = async (req, res, next) => {
  try {
    // Get token from header
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    // Verify and decode token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Use decoded.userId (make sure you used { userId: user._id } when generating token)
    const user = await userModel.findById(decoded.userId).select('-password');
    if (!user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    // Attach user to request
    req.user = user;
    next();
  } catch (error) {
    console.error("Auth error:", error.message);
    return res.status(401).json({ message: "Unauthorized" });
  }
};

const adminOnly = (req, res, next) => {
  // Allow both lowercase and uppercase "Admin"
  if (!req.user?.role || req.user.role.toLowerCase() !== 'admin') {
    return res.status(403).json({ message: "Forbidden: Admins only" });
  }
  next();
};

module.exports = { auth, adminOnly };
