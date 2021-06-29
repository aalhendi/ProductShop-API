// Imports
const express = require("express");
let products = require("./products");
const cors = require("cors");

const app = express();

//Middleware
app.use(cors());

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
//========== End Product Routes ==========

//Listen @ port 8000
app.listen(8000, () => {
  console.log("The application is running on localhost:8000");
});
