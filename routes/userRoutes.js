import express from "express";
import {
  getProfile,
  loginUser,
  registerUser,
} from "../controllers/userControllers.js";
import { auth } from "../middlewares/authMiddleware.js";
let userRoutes = express.Router();

userRoutes.post("/register", registerUser);
userRoutes.post("/login", loginUser);
userRoutes.get("/profile", auth, getProfile);

export default userRoutes;
