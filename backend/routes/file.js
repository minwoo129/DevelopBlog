const express = require("express");
const AWS = require("aws-sdk");
const {
  accessKeyId,
  region,
  secretAccessKey,
  uploadBucket,
} = require("../AWS/s3Key");
const fs = require("fs");
const multerS3 = require("multer-s3");
const multer = require("multer");
const path = require("path");
const { verifyToken } = require("./middlewares");

const router = express.Router();

try {
  fs.readdirSync("uploads");
} catch (error) {
  console.error("uploads폴더가 없어 uploads 폴더를 생성합니다.");
  fs.mkdirSync("uploads");
}

AWS.config.update({
  accessKeyId,
  secretAccessKey,
  region,
});

const s3 = new AWS.S3({
  accessKeyId,
  secretAccessKey,
  region,
});

const upload = multer({
  storage: multerS3({
    s3,
    bucket: "developblog",
    key(req, file, cb) {
      cb(null, `original/${Date.now()}_${path.basename(file.originalname)}`);
    },
  }),
  limits: { fieldSize: 5 * 1024 * 1024 },
});

router.post("/upload", verifyToken, upload.single("img"), (req, res) => {
  console.log("file: ", req.file);
  res.status(200).json({ test: "ok" });
});

module.exports = router;
