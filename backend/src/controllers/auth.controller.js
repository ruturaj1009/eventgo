const User = require("../models/user.model");
const { generateToken } = require("../utils/jwt.utils");
const { passhash, matchpass } = require("../utils/pass.utils");

exports.register = async (req, res, next) => {
  try {
    const { name, email, phone, password } = req.body;
    if (!name || !email || !phone || !password) {
      return res.status(400).json({
        success: false,
        message: "Please fill all the fields",
      });
    }
    const existingUser = await User.findOne({email});
    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "Already Registered. Kindly Login..",
      });
    }
    const hashedPassword = await passhash(password.toString());
    // console.log(hashedPassword);
    const user = await User.create({
      name,
      email,
      phone,
      password: hashedPassword,
    });
    if (user) {
      return res.status(201).json({
        success: true,
        message: "User registered successfully",
      });
    }
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  } catch (err) {
    next(err);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please fill all the fields",
      });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(401)
        .json({ success: false, message: "User not Registered" });
    }
    const isPasswordValid = await matchpass(password.toString(), user.password);
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: "Wrong Password",
      });
    }
    const token = await generateToken(user._id);
    if (token) {
      res.status(200).json({ 
        success: true,
        message: "Login Successful",
        user:{
          id:user._id,
          name:user.name,
          email:user.email,
        },
        token
      });
    }
  } catch (err) {
    next(err);
  }
};
