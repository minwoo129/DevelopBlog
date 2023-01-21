const express = require("express");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const File = require("../models/file");
const { verifyToken } = require("./middlewares");
const { isActiveInServer } = require("../config");

const router = express.Router();

router.post("/token", async (req, res, next) => {
  passport.authenticate("local", (authError, user, info) => {
    if (authError) {
      res.status(500).json({
        error: true,
        code: 500,
        result: false,
        data: null,
        message: authError.message,
      });
      return;
    }
    if (!user) {
      res.status(401).json({
        error: true,
        code: 401,
        result: false,
        data: null,
        message: info.message,
      });
      return;
    }
    return req.login(user, (loginError) => {
      if (loginError) {
        res.status(500).json({
          error: true,
          code: 500,
          result: false,
          data: null,
          message: loginError.message,
        });
        return;
      }
      const token = jwt.sign(
        {
          id: user.id,
          email: user.email,
          name: user.name,
        },
        process.env.JWT_SECRET,
        {
          expiresIn: "6h",
          issuer: process.env.JWT_SIGN,
        }
      );

      res.status(200).json({
        result: true,
        error: false,
        data: { ...user, token },
      });
    });
  })(req, res, next);
});

router.post("/token/validate", verifyToken, async (req, res, next) => {
  const { id } = req.decoded;
  try {
    const user = await User.findOne({
      where: { id },
      attributes: [
        "id",
        "name",
        "email",
        "nickname",
        "profileImgIdx",
        "backgroundImgIdx",
      ],
    });
    const { profileImgIdx, backgroundImgIdx } = user.dataValues;
    const userFiles = await File.findAll({
      where: {
        id: [profileImgIdx, backgroundImgIdx],
      },
      attributes: ["id", "publishedUrl"],
    });
    let profileImg = null,
      backgroundImg = null;
    if (profileImgIdx) {
      profileImg = userFiles.find((item) => item.id == profileImgIdx);
    }
    if (backgroundImgIdx) {
      backgroundImg = userFiles.find((item) => item.id == backgroundImgIdx);
    }
    const token = jwt.sign(
      {
        id: user.dataValues.id,
        email: user.dataValues.email,
        name: user.dataValues.name,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "6h",
        issuer: process.env.JWT_SIGN,
      }
    );
    res.status(200).json({
      result: true,
      error: false,
      data: {
        ...user.dataValues,
        profileImg,
        backgroundImg,
        token,
      },
    });
  } catch (err) {
    !isActiveInServer && console.error(err);
    res.status(500).json({
      error: true,
      code: 500,
      data: null,
      message: err.message,
      result: false,
    });
  }
});

module.exports = router;
