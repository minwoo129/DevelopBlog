const express = require("express");
const fs = require("fs");
const { verifyToken, AWSSingleFileUpload } = require("./middlewares");
const File = require("../models/file");

const router = express.Router();

try {
  fs.readdirSync("uploads");
} catch (error) {
  console.error("uploads폴더가 없어 uploads 폴더를 생성합니다.");
  fs.mkdirSync("uploads");
}

router.post("/upload", verifyToken, AWSSingleFileUpload, async (req, res) => {
  try {
    const {
      acl,
      bucket,
      location,
      size,
      originalname,
      mimetype,
      contentType,
      encoding,
      fieldname,
      key,
      storageClass,
    } = req.file;
    const { uploadType } = req.query;
    const { id } = req.decoded;

    const result = await File.create({
      acl,
      bucket,
      publishedUrl: location,
      size,
      originalname,
      mimeType: mimetype,
      contentType,
      encoding,
      fieldname,
      key,
      storageClass,
      uploadType,
      userId: id,
    });
    res
      .status(200)
      .json({ result: true, data: { ...result.dataValues }, error: false });
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({
        error: true,
        result: false,
        data: null,
        message: err.message,
        code: 500,
      });
  }
});

module.exports = router;
