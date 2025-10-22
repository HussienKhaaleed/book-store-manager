const express = require("express")
const router = express.Router()
const userController = require("../controller/user.controller")
const { auth, adminOnly } = require("../Middleware/auth.midleware")

// Get current user info (auth required)
router.get("/me", auth, userController.getMe)

// Get all users (admin only)
router.get("/", auth, adminOnly, userController.getAllUser)

// Update user role (admin only)
router.patch("/:id/role", auth, adminOnly, userController.updateRole)

// Delete user (admin only)
router.delete("/:id", auth, adminOnly, userController.deleteUser)

module.exports = router