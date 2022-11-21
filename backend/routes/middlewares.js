const jwt = require("jsonwebtoken");
const AWS = require('aws-sdk');
const multer = require('multer');
const path = require('path');
const multerS3 = require('multer-s3');
const { accessKeyId, bucket, region, secretAccessKey } = require('../AWS/s3Key');
const { v4 } = require("uuid");

AWS.config.update({
  accessKeyId,
  secretAccessKey,
  region
})

exports.isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.status(403).json({ error: true, code: 401, data: "로그인 필요" });
  }
};

exports.isNotLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) next();
  else {
    const message = encodeURIComponent("현재 로그인 상태입니다.");
    res.redirect(`/?error=${message}`);
  }
};

exports.verifyToken = (req, res, next) => {
  try {
    req.decoded = jwt.verify(req.headers.authorization, process.env.JWT_SECRET);
    return next();
  } catch (error) {
    if (error.name == "TokenExpiredError") {
      // 유효시간 초과
      return res.status(419).json({
        error: true,
        code: 419,
        data: "토큰이 만료되었습니다.",
      });
    }

    return res.status(401).json({
      error: true,
      code: 401,
      data: "유효하지 않은 토큰입니다.",
    });
  }
};

exports.AWSSingleFileUpload = (req, res, next) => {
  const upload = multer({
    storage: multerS3({
      s3: new AWS.S3(),
      bucket: 'developblog',
      acl: 'public-read',
      contentType: multerS3.AUTO_CONTENT_TYPE,
      key: (req, file, cb) => {
        const date = new Date();
        const year = date.getFullYear();
        const month = date.getMonth()+1;
        const day = date.getDate();
        let fileRoute = `image/${year}/${month}${day}/${v4()}`
        cb(
          null,
          fileRoute
        );
      }
    }),
    limits: { fieldSize: 5 * 1024 * 1024 }
  }).single('file');

  upload(req, res, (err) => {
    if(err instanceof multer.MulterError) {
      return res.status(400).json({
        result: false,
        error: true,
        code: err.code,
        message: err.message,
        data: null
      })
    }

    if(err) {
      return res.status(500).json({
        result: false,
        error: true,
        data: null,
        code: 500,
        message: err.message
      });
    }
    next();
  })
}
