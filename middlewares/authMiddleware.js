import expressAsyncHandler from "express-async-handler";
import { getToken } from "../utils/getToken.js";
import { verifyToken } from "../utils/verifyToken.js";
import User from "../models/User.js";

export const auth = expressAsyncHandler(async (req, res, next) => {
  let token = getToken(req);
  let decodedToken = await verifyToken(token);
  let user = await User.findById(decodedToken.id);
  if (!user) {
    throw new Error("this user no longer exists");
  }
  req.userId = user._id;
  next();
});
