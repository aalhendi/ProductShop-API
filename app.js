// Imports
const express = require("express");
let products = require("./products");
const cors = require("cors");
const slugify = require("slugify");

const app = express();

//Middleware
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//========== Product Routes ==========

// Products List
app.get("/products", (req, res) => {
  res.json(products);
});

// Find Product
app.get("/products/:productId", (req, res) => {
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
});

// Delete Product
app.delete("/products/:productId", (req, res) => {
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
});

// Create Product
app.post("/products/", (req, res) => {
  try {
    const id = products.length + 1;
    const slug = slugify(req.body.name, { lower: true });
    const newProduct = {
      id,
      slug,
      ...req.body,
    };
    products.push(newProduct);
    res.status(201).json(newProduct);
  } catch (error) {
    console.error(error);
  }
});

//========== End Product Routes ==========

//Listen @ port 8000
app.listen(8000, () => {
  console.log("The application is running on localhost:8000");
});
