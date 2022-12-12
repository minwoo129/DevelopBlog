const express = require("express");
const { isActiveInServer } = require("../config");
const Comment = require("../models/comment");
const { verifyToken } = require("./middlewares");

const router = express.Router();

router.post("/save", verifyToken, async (req, res, next) => {
  const { comment, commentId } = req.body;
  const { id } = req.decoded;
  try {
    if ("commentId" in req.body) {
      const { commentId } = req.body;
      const result = await Comment.update(
        {
          comment,
        },
        {
          where: {
            commentId,
          },
        }
      );
      res.status(200).json({ result: true, error: false, data: result });
      return;
    }
    const result = await Comment.create({
      comment,
      userId: id,
      commentId,
    });
    res.status(200).json({ result: true, error: false, data: true });
  } catch (err) {
    !isActiveInServer && console.error(err);
    res.status(500).json({
      error: true,
      result: false,
      data: null,
      code: 500,
      message: err.message,
    });
  }
});

router.delete("/del/:commentId", verifyToken, async (req, res, next) => {
  try {
    const result = await Comment.destroy({
      where: req.params.commentId,
    });
    res.status(200).json({ result: true, error: false, data: true });
  } catch (err) {
    !isActiveInServer && console.error(err);
    res.status(500).json({
      error: true,
      result: false,
      data: null,
      code: 500,
      message: err.message,
    });
  }
});

module.exports = router;
