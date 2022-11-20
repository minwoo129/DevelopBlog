const express = require("express");
const { verifyToken } = require("./middlewares");

const router = express.Router();

router.get("/test", async (req, res, next) => {
  try {
    res.status(201).json({ test: "success" });
  } catch (e) {
    console.error(e);
    next(e);
  }
});

router.get("/token/test", verifyToken, async (req, res, next) => {
  res.status(200).json(req.decoded);
});

module.exports = router;
