const express = require("express");
const products = require("./products");
const cors = require("cors");

const app = express();

//Middleware
app.use(cors());

//Routes
app.get("/products", (req, res) => {
  res.json(products);
});

//Listen @ port 8000
app.listen(8000, () => {
  console.log("The application is running on localhost:8000");
});
