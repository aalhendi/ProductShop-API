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

app.use("/products", productRoutes);

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
