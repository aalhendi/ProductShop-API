const express = require("express");
const passport = require("passport");
const { signup, login } = require("./controllers");
const router = express.Router();

// Create user
router.post("/signup", signup);

// Sign in
router.post(
  "/login",
  passport.authenticate("local", { session: false }),
  login
);

module.exports = router;
