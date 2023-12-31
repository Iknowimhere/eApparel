import expressAsyncHandler from "express-async-handler";
import User from "../models/User.js";
import { getToken } from "../utils/getToken.js";
import { genToken } from "../utils/genToken.js";
import { verifyToken } from "../utils/verifyToken.js";

// @desc   Register User
// @route  POST /api/v1/users/register
// @access Private/Admin

export const registerUser = expressAsyncHandler(async (req, res) => {
  const { fullName, email, password } = req.body;
  let userExists = await User.findOne({ email });

  //Check if user exists in db already
  if (userExists) {
    throw new Error("User exists already");
  }
  //Register the user
  let newUser = await User.create({
    fullName,
    email,
    password,
  });
  res.json(newUser);
});

// @desc   Login User
// @route  POST /api/v1/users/login
// @access Public

export const loginUser = expressAsyncHandler(async (req, res) => {
  const { email, password } = req.body;
  let userExists = await User.findOne({ email });

  //Check if user exists in db already and check if password matches
  if (
    !userExists ||
    !(await userExists.verifyPassword(password, userExists.password))
  ) {
    throw new Error("Invalid login");
  }
  res.json({
    status: "success",
    msg: "login successful",
    userExists,
    token: await genToken(userExists._id),
  });
});

// @desc   Profile
// @route  GET /api/v1/users/profile
// @access Private

export const getProfile = expressAsyncHandler(async (req, res) => {
  res.json({
    msg: "Welcome to Profile",
  });
});
