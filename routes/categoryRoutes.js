import express from "express";
import { auth } from "../middlewares/authMiddleware.js";
import {
  createCategory,
  deleteCategory,
  getCategories,
  getCategory,
  updateCategory,
} from "../controllers/categoryControllers.js";
let categoryRouter = express.Router();

categoryRouter.post("/", auth, createCategory);
categoryRouter.get("/", getCategories);
categoryRouter.get("/:id", getCategory);
categoryRouter.put("/:id", auth, updateCategory);
categoryRouter.delete("/:id", auth, deleteCategory);

export default categoryRouter;
