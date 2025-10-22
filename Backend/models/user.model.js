const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user"
  },
  name: {
    type: String,
    required: false
  }
}, {
  versionKey: false,
  timestamps: true
});

const userModel = mongoose.model("User", userSchema);
module.exports = userModel;
