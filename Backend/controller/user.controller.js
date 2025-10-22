const userRepo = require("../repo/user.repo");

const getMe = async (req, res) => {
  try {
    const user = req.user;
    const userResponse = {
      userId: user._id,
      username: user.username,
      name: user.name,
      role: user.role,
      isAdmin: user.role.toLowerCase() === 'admin' // ✅ FIX: return admin flag
    };
    return res.json(userResponse);
  } catch (error) {
    console.error("GetMe error:", error.message);
    return res.status(400).json({ message: "Invalid request" });
  }
};

const getAllUser = async (req, res) => {
  try {
    const users = await userRepo.getAllUser();
    return res.json(users);
  } catch (error) {
    console.error("GetAllUser error:", error.message);
    return res.status(400).json({ message: "Invalid request" });
  }
};

const updateRole = async (req, res) => {
  try {
    const { id } = req.params;
    const { role } = req.body;

    if (!role || !['user', 'admin'].includes(role.toLowerCase())) {
      return res.status(400).json({ message: "Invalid role" });
    }

    const user = await userRepo.getUserById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const updatedUser = await userRepo.updateUserRole(id, role.toLowerCase());
    return res.json(updatedUser);
  } catch (error) {
    console.error("UpdateRole error:", error.message);
    return res.status(400).json({ message: "Invalid request" });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await userRepo.getUserById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    await userRepo.deleteUser(id);
    return res.json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("DeleteUser error:", error.message);
    return res.status(400).json({ message: "Invalid request" });
  }
};

module.exports = {
  getMe,
  getAllUser,
  updateRole,
  deleteUser
};
