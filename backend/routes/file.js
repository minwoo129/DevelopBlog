const express = require("express");
const fs = require("fs");
const { verifyToken, AWSSingleFileUpload } = require("./middlewares");

const router = express.Router();

try {
  fs.readdirSync("uploads");
} catch (error) {
  console.error("uploads폴더가 없어 uploads 폴더를 생성합니다.");
  fs.mkdirSync("uploads");
}

router.post("/upload", verifyToken, AWSSingleFileUpload, (req, res) => {
  res.status(200).json({ ...req.file });
});

module.exports = router;
