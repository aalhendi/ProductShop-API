let products = require("../../products");
const slugify = require("slugify");

exports.productFetch = (req, res) => {
  res.json(products);
};

exports.productFind = (req, res) => {
  const { productId } = req.params;
  try {
    const foundProduct = products.find((product) => +productId === product.id);
    if (foundProduct) {
      res.json(foundProduct);
    } else {
      res.status(404).json({
        message: "Product does not exist",
      });
    }
  } catch (error) {
    console.error(error);
  }
};

exports.productDelete = (req, res) => {
  const { productId } = req.params;
  try {
    const foundProduct = products.find((product) => +productId === product.id);
    if (foundProduct) {
      products = products.filter((product) => +productId !== product.id);
      res.status(204).end();
    } else {
      res.status(404).json({ message: "Product Not Found" });
    }
  } catch (error) {
    console.error(error);
  }
};

exports.productCreate = (req, res) => {
  try {
    const id = products.length + 1;
    const slug = slugify(req.body.name, { lower: true });
    const newProduct = {
      id,
      slug,
      ...req.body,
    };
    products.push(newProduct);
    res.status(201).json(newProduct); // 201 - Created
  } catch (error) {
    console.error(error);
  }
};

exports.productUpdate = (req, res) => {
  const { productId } = req.params;
  const foundProduct = products.find((product) => product.id === +productId);
  if (foundProduct) {
    for (const key in req.body) {
      foundProduct[key] = req.body[key];
    }
    foundProduct.slug = slugify(foundProduct.name, { lower: true });
    res.status(204).end(); // 204 - No Content
  } else {
    res.status(404).json({ message: "Product Not Found" });
  }
};
