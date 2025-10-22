const userModel = require("../models/user.model")

const getAllUser = async () => {
  return await userModel.find().select('-password');
}

const getUserById = async (id) => {
  return await userModel.findById(id);
}

const getUserByUsername = async (username) => {
  return await userModel.findOne({ username });
}

const createUser = async (user) => {
  return await userModel.create(user);
}

const updateUserRole = async (id, role) => {
  return await userModel.findByIdAndUpdate(
    id, 
    { role }, 
    { new: true, runValidators: true }
  ).select('-password');
}

const deleteUser = async (id) => {
  return await userModel.findByIdAndDelete(id);
}

module.exports = {
  getAllUser,
  getUserById,
  getUserByUsername,
  createUser,
  updateUserRole,
  deleteUser,
}