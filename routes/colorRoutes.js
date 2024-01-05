import express from "express";
import { auth } from "../middlewares/authMiddleware.js";
import { createColor, deleteColor, getColor, getColors, updateColor } from "../controllers/colorControllers.js";


let colorRoutes = express.Router();

colorRoutes.post("/", auth, createColor);
colorRoutes.get("/", getColors);
colorRoutes.get("/:id", getColor);
colorRoutes.put("/:id", auth, updateColor);
colorRoutes.delete("/:id", auth, deleteColor);

export default colorRoutes;
