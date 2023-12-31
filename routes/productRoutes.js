import express from "express";
import { auth } from "../middlewares/authMiddleware.js";
import {
  createProduct,
  getProducts,
} from "../controllers/productControllers.js";
let productRoutes = express.Router();

productRoutes.post("/", auth, createProduct);
productRoutes.get("/", getProducts);

export default productRoutes;
