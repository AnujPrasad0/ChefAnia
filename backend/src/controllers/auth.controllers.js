const userModel = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

async function registerUser(req, res) {
  const {
    email,
    fullname: { firstname, lastname },
    password,
  } = req.body;

  const isUserExists = await userModel.findOne({ email });

  if (isUserExists) {
    return res.status(400).json({
      message: "user already exists",
    });
  }

  const hashPassword = await bcrypt.hash(password, 10);

  const user = await userModel.create({
    fullname: {
      firstname,
      lastname,
    },
    email,
    password: hashPassword,
  });

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY);

  const oneMonth = 30 * 24 * 60 * 60 * 1000;

  res.cookie("token", token, {
    maxAge: oneMonth,
  });

  res.status(200).json({
    message: "User registered successfully",
    email: user.email,
    _id: user._id,
    fullName: user.fullName,
  });
}

async function loginUser(req, res) {
  const { email, password } = req.body;

  const user = await userModel.findOne({ email });

  if (!user) {
    return res.status(400).json({
      message: "User not found",
    });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    return res.status(401).json({
      message: "Invalid Password",
    });
  }

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY);

  const oneMonth = 30 * 24 * 60 * 60 * 1000;

  res.cookie("token", token, {
    maxAge: oneMonth,
  });

  res.status(200).json({
    message: "Logged in Successfully",
    _id: user._id,
    email: user.email,
    fullName: user.fullname,
  });
}

async function logoutUser(req, res) {
  res.clearCookie("token");

  res.status(200).json({
    message: "Logged out successfully",
  });
}

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
};
