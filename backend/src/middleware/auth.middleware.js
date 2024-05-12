const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

exports.authenticate = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({
        status: false,
        message: "Unauthorized Access",
      });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId).select("-password");
    if (!user) {
      return res.status(401).json({
        status: false,
        message: "Unauthorized Access",
      });
    }
    req.userId = decoded.userId;
    next();
  } catch (err) {
    res.status(401).json({
      status: false,
      message: "Unauthorized Access",
    });
  }
};
