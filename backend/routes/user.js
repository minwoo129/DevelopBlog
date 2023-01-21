const express = require("express");
const bcrypt = require("bcrypt");
const { isNotLoggedIn, verifyToken } = require("./middlewares");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const File = require("../models/file");
const { isActiveInServer } = require("../config");

const router = express.Router();

router.post("/login", async (req, res, next) => {
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
      res.status(401).status({
        error: true,
        code: 401,
        result: false,
        data: null,
        message: info.message,
      });
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
          expiresIn: "24h",
          issuer: "rmwDevelopBlog",
        }
      );

      res.status(200).json({
        result: true,
        error: false,
        data: { ...user.dataValues, token },
      });
    });
  })(req, res, next);
});

router.post("/join", isNotLoggedIn, async (req, res, next) => {
  const { email, password, name, isAdmin, adminPwd, nickname, profileImgIdx } =
    req.body;
  try {
    const exUser = await User.findOne({ where: { email } });
    if (exUser) {
      res.status(400).json({
        error: true,
        code: 400,
        message: "이미 존재하는 이메일입니다.",
        data: null,
        result: false,
      });
      return;
    }
    const hash = await bcrypt.hash(password, 12);
    let query = {
      email,
      password: hash,
      name,
      isAdmin: false,
      profileImgIdx,
    };
    if (nickname != "") {
      query = {
        ...query,
        nickname,
      };
    } else {
      const defaultNickname = email.split("@")[0];
      query = {
        ...query,
        nickname: defaultNickname,
      };
    }
    if (profileImgIdx) {
      const profileImg = await File.findOne({
        where: {
          id: profileImgIdx,
        },
      });
      query = {
        ...query,
        profileImgUrl: profileImg.dataValues.publishedUrl,
      };
    }

    if (isAdmin && adminPwd == process.env.ADMIN_CONFIRM_KEY) {
      query = {
        ...query,
        isAdmin: true,
      };
    }
    const result = await User.create(query);
    if (profileImgIdx) {
      await File.update(
        {
          userId: result.dataValues.id,
        },
        {
          where: {
            id: profileImgIdx,
          },
        }
      );
    }
    res.status(200).json({ result: true, error: false, data: null });
  } catch (error) {
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

router.get("/getOne", async (req, res, next) => {
  const { email } = req.query;
  try {
    const result = await User.findOne({ where: { email } });
    res.status(200).json({ result: true, error: false, data: { ...result } });
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

router.get("/get", verifyToken, async (req, res, next) => {
  const { id } = req.decoded;
  try {
    const user = await User.findOne({
      where: { id },
    });
    const { profileImgIdx, backgroundImgIdx } = user.dataValues;
    const imageFiles = await File.findAll({
      where: {
        id: [profileImgIdx, backgroundImgIdx],
      },
      attributes: ["id", "publishedUrl"],
    });
    let newUserData = { ...user.dataValues };
    let profileImg = null,
      backgroundImg = null;

    delete newUserData["password"];

    if (profileImgIdx) {
      profileImg = imageFiles.find((item) => item.id == profileImgIdx);
    }
    if (backgroundImgIdx) {
      backgroundImg = imageFiles.find((item) => item.id == backgroundImgIdx);
    }
    const data = {
      ...newUserData,
      profileImg,
      backgroundImg,
    };
    res.status(200).json({ error: false, result: true, data });
  } catch (err) {
    !isActiveInServer && console.error(err);
    res
      .status(500)
      .json({ error: true, code: 500, data: err.message, result: false });
  }
});

router.put("/update", verifyToken, async (req, res, next) => {
  const { profileImgIdx, backgroundImgIdx, nickname } = req.body;
  const { id } = req.decoded;
  try {
    const result = await User.update(
      {
        profileImgIdx,
        backgroundImgIdx,
        nickname,
      },
      {
        where: { id },
      }
    );
    res.status(200).json({ error: false, result: true, data: true });
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
