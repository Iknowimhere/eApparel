import express from "express";
import { auth } from "../middlewares/authMiddleware.js";
import {
  createProduct,
  deleteProduct,
  getProduct,
  getProducts,
  updateProduct,
} from "../controllers/productControllers.js";
let productRoutes = express.Router();

productRoutes.post("/", auth, createProduct);
productRoutes.get("/", getProducts);
productRoutes.get("/:id", getProduct);
productRoutes.put("/:id", auth, updateProduct);
productRoutes.delete("/:id", auth, deleteProduct);

export default productRoutes;
