const express = require("express");
const bcrypt = require("bcrypt");
const { isNotLoggedIn, verifyToken } = require("./middlewares");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

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
  const { email, password, name, isAdmin, adminPwd } = req.body;
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
    };
    if (isAdmin && adminPwd == process.env.ADMIN_CONFIRM_KEY) {
      query = {
        ...query,
        isAdmin: true,
      };
    }
    await User.create(query);
    res.status(200).json({ result: true, error: false, data: null });
  } catch (error) {
    console.error(err);
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
    console.error(err);
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
    res
      .status(200)
      .json({ error: false, result: true, data: { ...user.dataValues } });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ error: true, code: 500, data: err.message, result: false });
  }
});

module.exports = router;
