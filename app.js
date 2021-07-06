// Imports
const express = require("express");
const cors = require("cors");
const productRoutes = require("./API/product/routes");

const app = express();

//Middleware
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const db = require("./db/models");

//Routes
app.use("/products", productRoutes);
app.use("/media", express.static("media"));

//Error Handling
app.use((err, req, res, next) => {
  res
    .status(err.status || 500)
    .json({ message: err.message || "Internal Server Errror." });
});

// Handle Incorrect Path
app.use((req, res, next) => {
  res.status(404).json({ message: "Path not found." });
});

const run = async () => {
  try {
    await db.sequelize.sync();
    console.log("Connection to the database successful");
    //Listen @ port 8000
    await app.listen(8000, () => {
      console.log("The application is running on localhost:8000");
    });
  } catch (error) {
    console.error("Error conencting to the database: ", error);
  }
};

run();
