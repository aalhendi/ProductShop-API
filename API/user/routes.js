const express = require("express");
const passport = require("passport");
const { register, login } = require("./controllers");
const router = express.Router();

// Create user
router.post("/register", register);

// Sign in
router.post(
  "/login",
  passport.authenticate("local", { session: false }),
  login
);

module.exports = router;
