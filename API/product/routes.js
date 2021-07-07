const express = require("express");
const multer = require("multer");
const path = require("path");

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

// Multer
const storage = multer.diskStorage({
  destination: "./media",
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}${file.originalname}`);
  },
});

const upload = multer({
  storage: storage,
  fileFilter: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    if (![".png", ".jpg", ".jpeg", ".bmp", ".jfif"].includes(ext)) {
      console.log("Invalid filetype upload attempted");
      return cb(null, false, new Error("Only .png files allowed"));
    }
    cb(null, true);
  },
});
// End Multer

// Product
// Products List
router.get("/", productFetch);

// Find Product
router.get("/:productId", productFind);

// Delete Product
router.delete("/:productId", productDelete);

// Create Product
router.post("/", upload.single("image"), productCreate);

// Update Product
router.put("/:productId", upload.single("image"), productUpdate);
// End Product

module.exports = router;
