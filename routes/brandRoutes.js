import express from "express";
import { auth } from "../middlewares/authMiddleware.js";
import {
  createBrand,
  deleteBrand,
  getBrand,
  getBrands,
  updateBrand,
} from "../controllers/brandControllers.js";

let brandRouter = express.Router();

brandRouter.post("/", auth, createBrand);
brandRouter.get("/", getBrands);
brandRouter.get("/:id", getBrand);
brandRouter.put("/:id", auth, updateBrand);
brandRouter.delete("/:id", auth, deleteBrand);

export default brandRouter;
