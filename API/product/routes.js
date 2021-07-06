const express = require("express");
const {
  productFetch,
  productFind,
  productDelete,
  productCreate,
  productUpdate,
  fetchProduct,
} = require("./controllers");
const router = express.Router();

// Param middleware
router.param("productId", async (req, res, next, productId) => {
  const product = await fetchProduct(productId, next);
  if (product) {
    req.product = product;
    next();
  } else {
    const error = new Error("Product Not Found.");
    error.status = 404;
    next(error);
  }
});

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
