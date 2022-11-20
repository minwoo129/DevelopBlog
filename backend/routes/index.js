const express = require("express");

const router = express.Router();

router.get("/test", async (req, res, next) => {
  try {
    res.status(201).json({ test: "success" });
  } catch (e) {
    console.error(e);
    next(e);
  }
});

module.exports = router;
