// Imports
const express = require("express");
const cors = require("cors");
const productRoutes = require("./API/product/routes");
const e = require("express");

const app = express();

//Middleware
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Listen @ port 8000
app.use("/products", productRoutes);
app.listen(8000, () => {
  console.log("The application is running on localhost:8000");
});
