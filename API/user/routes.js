const express = require("express");
const { signup } = require("./controllers");
const router = express.Router();

// Create user
router.post("/signup", signup);

module.exports = router;
