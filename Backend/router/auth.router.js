const express = require("express")
const router = express.Router()
const authController = require("../controller/auth.controller")

// Register (public)
router.post("/register", authController.register)

// Login (public)
router.post("/login", authController.login)

module.exports = router