import expressAsyncHandler from "express-async-handler";
import Product from "../models/Product.js";

// @desc   Create Product
// @route  GET /api/v1/products
// @access Private/Admin
export const createProduct = expressAsyncHandler(async (req, res) => {
  const { name, description, brand, category, sizes, colors, price, totalQty } =
    req.body;
  //Product exists
  const productExists = await Product.findOne({
    name,
  });
  if (productExists) {
    throw new Error("This product is already present");
  }
  const newProduct = await Product.create({
    name,
    description,
    brand,
    category,
    user: req.userId,
    sizes,
    colors,
    price,
    totalQty,
  });
  res.json({
    status: "success",
    message: "Successfully product added",
    newProduct,
  });
});

// @desc   Get Products
// @route  GET /api/v1/products
// @access Public
export const getProducts = expressAsyncHandler(async (req, res) => {
  const { name } = req.query;
  let productQuery = Product.find();
  //search by name
  if (req.query.name) {
    productQuery = await productQuery.find({
      name: { $regex: name, $options: "i" },
    });
  }
  let products = await productQuery;
  res.json({
    status: "Success",
    products,
  });
});
