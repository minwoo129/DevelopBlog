const express = require("express");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const { verifyToken } = require("./middlewares");

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
          issuer: process.env.JWT_SIGN,
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

router.post("/token/confirm", verifyToken, async (req, res, next) => {
  const { id } = req.decoded;
  try {
    const user = await User.findOne({
      where: { id },
    });
    const token = jwt.sign(
      {
        id: user.dataValues.id,
        email: user.dataValues.email,
        name: user.dataValues.name,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "24h",
        issuer: process.env.JWT_SIGN,
      }
    );
    res
      .status(200)
      .json({
        result: true,
        error: false,
        data: { ...user.dataValues, token },
      });
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

module.exports = router;
