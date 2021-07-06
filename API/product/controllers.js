const { Product } = require("../../db/models");

exports.fetchProduct = async (productId, next) => {
  try {
    const product = await Product.findByPk(productId);
    return product;
  } catch (error) {
    next(error);
  }
};

exports.productFetch = async (req, res, next) => {
  try {
    const products = await Product.findAll();
    res.json(products);
  } catch (error) {
    next(error);
  }
};

exports.productFind = async (req, res, next) => {
  try {
    res.json(req.product);
  } catch (error) {
    next(error);
  }
};

exports.productDelete = async (req, res, next) => {
  try {
    await req.product.destroy();
    res.status(204).end();
  } catch (error) {
    next(error);
  }
};

exports.productCreate = async (req, res, next) => {
  try {
    const newProduct = await Product.create(req.body);
    res.status(201).json(newProduct); // 201 - Created
  } catch (error) {
    next(error);
  }
};

exports.productUpdate = async (req, res, next) => {
  try {
    await req.product.update(req.body);
    res.status(204).end(); // 204 - No Content
  } catch (error) {
    next(error);
  }
};
