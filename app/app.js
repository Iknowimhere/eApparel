import dotenv from "dotenv";
dotenv.config();
import express from "express";
import dbConnection from "../config/dbConfig.js";
import userRoutes from "../routes/userRoutes.js";
import productRoutes from "../routes/productRoutes.js";
import { globalErrorHandler } from "../middlewares/globalErrorHandler.js";
import categoryRoutes from "../routes/categoryRoutes.js";
dbConnection();
let app = express();

app.use(express.json());
app.use("/api/v1/users/", userRoutes);
app.use("/api/v1/products", productRoutes);
app.use("/api/v1/categories", categoryRoutes);

app.all("*", (req, res, next) => {
  throw new Error(`Route ${req.originalUrl} not found `);
});

app.use(globalErrorHandler);
export default app;
