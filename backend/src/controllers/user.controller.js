const User = require("../models/user.model");
const mongoose = require("mongoose");

exports.getUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid user ID",
      });
    }
    const user = await User.findById(id, "name email username");
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
};

exports.updateUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid user ID",
      });
    }
    const { name, username } = req.body;
    if (!name || !email || !username) {
      return res.status(400).json({
        success: false,
        message: "Please provide all the required fields",
      });
    }
    const user = await User.findById(id, "name email username");
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    const newUser = await User.findByIdAndUpdate(
      user.id,
      { name, username },
      { new: true }
    );
    if (newUser) {
      res.status(200).json({
        success: true,
        message: "User updated successfully",
      });
    } else {
      res.status(500).json({
        success: false,
        message: "Something went wrong",
      });
    }
  } catch (err) {
    next(err);
  }
};

exports.searchUser = async (req, res, next) => {
  try {
    const { query } = req.query;
    const regex = new RegExp(query, "i"); 

    const users = await User.find({
      $or: [{ name: regex }, { email: regex }, { username: regex }],
    }).select('-password');

    if (users.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No users found",
      });
    }
    res.status(200).json(users);
  } catch (err) {
    next(err);
  }
};
