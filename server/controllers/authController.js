import User from "../models/user.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken";

const registerUser = async (req, res, next) => {
  const { username, email } = req.body;
  const password = req.body.password;
  if (!username || !email || !password) {
    return res.status(400).json({
      message: "please provide usernamem,email and password",
    });
  }
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  try {
    const user = await User.create({ ...req.body, password: hashedPassword });
    const token = jwt.sign(
      {
        userId: user._id,
      },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_LIFETIME }
    );
    res.status(200).json({
      message: "success",
      token,
      user: { username: user.username, email: user.email },
    });
  } catch (error) {
    next(error);
  }
};

const signInUser = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({
      message: "please provide username and password",
    });
  }
  const user = await User.findOne({ username });
  if (!user) {
    return res.status(400).json({
      message: "No user with this username",
    });
  }
  const isPasswordMatch = await bcrypt.compare(password, user.password);
  if (!isPasswordMatch) {
    return res.status(401).json({
      message: "Username or password incorrect",
    });
  }
  const token = jwt.sign(
    {
      userId: user._id,
    },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_LIFETIME }
  );
  res.status(200).json({
    message: "success",
    token,
    user: { username: user.username, email: user.email },
  });
};

const getUser = async (req, res) => {
  const { userId } = req.user;
  const user = await User.findById(userId);
  res.status(200).json({
    message: "success",
    user: { username: user.username, email: user.email },
  });
};

export { registerUser, signInUser, getUser};