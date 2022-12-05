const jwt = require("jsonwebtoken");
const AWS = require("aws-sdk");
const multer = require("multer");
const path = require("path");
const multerS3 = require("multer-s3");
const {
  accessKeyId,
  bucket,
  region,
  secretAccessKey,
} = require("../AWS/s3Key");
const { v4 } = require("uuid");
const User = require("../models/user");

AWS.config.update({
  accessKeyId,
  secretAccessKey,
  region,
});

// 로그인 여부 체크(미사용)
exports.isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.status(403).json({ error: true, code: 401, data: "로그인 필요" });
  }
};

// 미로그인 여부 체크(미사용)
exports.isNotLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) next();
  else {
    const message = encodeURIComponent("현재 로그인 상태입니다.");
    res.redirect(`/?error=${message}`);
  }
};

// 토큰 검증
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
        message: "토큰이 만료되었습니다.",
        data: null,
        result: false,
      });
    }

    return res.status(401).json({
      error: true,
      code: 401,
      message: "유효하지 않은 토큰입니다.",
      data: null,
      result: false,
    });
  }
};

exports.verifyTokenWithoutErr = (req, res, next) => {
  try {
    req.decoded = jwt.verify(req.headers.authorization, process.env.JWT_SECRET);
    req.decodeRes = true;
    return next();
  } catch (error) {
    req.decoded = null;
    req.decodeRes = false;
    return next();
  }
};

// 관리자 계정 여부 검증(토큰 검증 후 실행)
exports.checkIsAdmin = (req, res, next) => {
  User.findOne({
    where: {
      id: req.decoded.id,
    },
  })
    .then((user) => {
      if (user.dataValues.isAdmin) {
        next();
      } else {
        res.status(401).json({
          error: true,
          result: false,
          data: null,
          message: "접근 권한이 없습니다.",
          code: 401,
        });
      }
    })
    .catch((e) => {
      res.status(500).json({
        error: true,
        result: false,
        data: null,
        message: e.message,
        code: 500,
      });
    });
};

// AWS 파일 업로드(단건)
exports.AWSSingleFileUpload = (req, res, next) => {
  const upload = multer({
    storage: multerS3({
      s3: new AWS.S3(),
      bucket: "developblog",
      acl: "public-read",
      contentType: multerS3.AUTO_CONTENT_TYPE,
      key: (req, file, cb) => {
        const date = new Date();
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const day = date.getDate();
        let fileRoute = `image/${req.query.uploadType}/${year}/${
          month < 10 ? `0${month}` : `${month}`
        }${day < 10 ? `0${day}` : `${day}`}/${v4()}`;
        cb(null, fileRoute);
      },
    }),
    limits: { fieldSize: 5 * 1024 * 1024 },
  }).single("file");

  upload(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      return res.status(400).json({
        result: false,
        error: true,
        code: err.code,
        message: err.message,
        data: null,
      });
    }

    if (err) {
      return res.status(500).json({
        result: false,
        error: true,
        data: null,
        code: 500,
        message: err.message,
      });
    }
    next();
  });
};
