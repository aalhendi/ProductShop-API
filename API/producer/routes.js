const express = require("express");
const multer = require("multer");
const {
  producerFetch,
  producerCreate,
  productCreate,
  fetchProducer,
} = require("./controllers");
const router = express.Router();
const path = require("path");

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
  limits: { fileSize: 10485760 }, //No files larger than 10MB
});
// End Multer

// Params Middleware
router.param("producerId", async (req, res, next, producerId) => {
  const producer = await fetchProducer(producerId, next);
  if (producer) {
    req.producer = producer;
    next();
  } else {
    const error = new Error("Producer Not Found.");
    error.status = 404;
    next(error);
  }
});

// Producer List
router.get("/", producerFetch);

// Create Producer
router.post("/", upload.single("image"), producerCreate);

// Create Product
router.post("/:producerId/products", upload.single("image"), productCreate);

module.exports = router;
