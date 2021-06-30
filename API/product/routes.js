const express = require("express");
const {
  productFetch,
  productFind,
  productDelete,
  productCreate,
  productUpdate,
} = require("./controllers");
const router = express.Router();

// Products List
router.get("/", productFetch);

// Find Product
router.get("/:productId", productFind);

// Delete Product
router.delete("/:productId", productDelete);

// Create Product
router.post("/", productCreate);

// Update Product
router.put("/:productId", productUpdate);

module.exports = router;
