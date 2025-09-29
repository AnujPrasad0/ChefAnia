const jwt = require("jsonwebtoken");
const userModel = require("../models/user.model");

async function authUser(req, res, next) {
  const { token } = req.cookies;

  if (!token) {
    return res.status(400).json({
      message: "Token not found",
    });
  }

  try {
    const decoded = await jwt.verify(token, process.env.JWT_SECRET_KEY);

    const user = await userModel.findById(decoded.id);

    req.user = user;

    next();
  } catch (err) {
    res.status(401).json({
      message: "Unauthorized token",
    });
  }
}

module.exports = {
  authUser,
};
