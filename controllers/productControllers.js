import expressAsyncHandler from "express-async-handler";
import Product from "../models/Product.js";
import Category from "../models/Category.js";
import Brand from "../models/Brand.js";

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
  //find the category
  const categoryFound = await Category.findOne({ name: category });
  if (!categoryFound) {
    throw new Error(
      "category not found,please first create category or check category name"
    );
  }
  //find the brand
  const brandFound = await Brand.findOne({ name: brand });
  if (!brandFound) {
    throw new Error(
      "brand not found,please first create brand or check brand name"
    );
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
  //push the product into category
  categoryFound.products.push(newProduct._id);

  //re save
  await categoryFound.save();

  //push the product into brand
  brandFound.products.push(newProduct._id);
  //re save
  await brandFound.save();
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
  let productQuery = Product.find();
  //search by name
  if (req.query.name) {
    productQuery = productQuery.find({
      name: { $regex: req.query.name, $options: "i" },
    });
  }
  //filter by brand
  if (req.query.brand) {
    productQuery = productQuery.find({
      brand: { $regex: req.query.brand, $options: "i" },
    });
  }
  //filter by category
  if (req.query.category) {
    productQuery = productQuery.find({
      category: { $regex: req.query.category, $options: "i" },
    });
  }
  //filter by colors
  if (req.query.colors) {
    productQuery = productQuery.find({
      colors: { $regex: req.query.colors, $options: "i" },
    });
  }
  // //filter by size
  if (req.query.sizes) {
    productQuery = productQuery.find({
      sizes: { $regex: req.query.sizes, $options: "i" },
    });
  }
  //filter by price range
  if (req.query.price) {
    let priceRange = req.query.price.split("-");
    productQuery = productQuery.find({
      price: { $gte: priceRange[0], $lte: priceRange[1] },
    });
  }
  //pagination
  //page
  let page = parseInt(req.query.page) ? parseInt(req.query.page) : 1;
  //limit
  let limit = parseInt(req.query.limit) ? parseInt(req.query.limit) : 10;
  //startIndex
  let startIdx = (page - 1) * limit;
  //endIndex
  let endIdx = page * limit;
  //total
  let total = await Product.countDocuments();
  productQuery = productQuery.skip(startIdx).limit(endIdx);
  //pagination
  let pagination = {};
  if (endIdx < total) {
    pagination.next = {
      page: page + 1,
      limit,
    };
  }
  if (startIdx > 0) {
    pagination.prev = {
      page: page - 1,
      limit,
    };
  }
  //await the query
  let products = await productQuery;
  res.json({
    status: "Success",
    total,
    results: products.length,
    pagination,
    message: "Fetched products successfully",
    products,
  });
});

// @desc   Get Single Product
// @route  GET /api/v1/products/:id
// @access Public

export const getProduct = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  const product = await Product.findById(id);
  if (!product) {
    throw new Error("There's no product");
  }
  res.json({
    status: "Success",
    message: "Product fetched successfully",
    product,
  });
});

// @desc   Update Product
// @route  PUT /api/v1/products/:id
// @access Private/Admin
export const updateProduct = expressAsyncHandler(async (req, res) => {
  const { name, description, brand, category, sizes, colors, price, totalQty } =
    req.body;
  const { id } = req.params;
  const updatedProduct = await Product.findByIdAndUpdate(
    id,
    {
      name,
      description,
      brand,
      category,
      sizes,
      colors,
      price,
      totalQty,
    },
    { new: true }
  );
  res.json({
    status: "success",
    message: "Successfully product updated",
    updatedProduct,
  });
});

// @desc   Delete Product
// @route  DELETE /api/v1/products/:id
// @access Private/Admin
export const deleteProduct = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  await Product.findByIdAndDelete(id);
  res.json({
    status: "success",
    message: "Successfully product deleted",
  });
});
