const express = require("express");
const User = require("../schemas/user");

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const users = await User.find({});
    res.status(201).json(users);
  } catch (e) {
    console.error(e);
    next(e);
  }
});

module.exports = router;
