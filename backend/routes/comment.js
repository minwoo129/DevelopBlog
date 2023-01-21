const express = require("express");
const { isActiveInServer } = require("../config");
const Comment = require("../models/comment");
const User = require("../models/user");
const File = require("../models/file");
const { verifyToken, verifyTokenWithoutErr } = require("./middlewares");

const router = express.Router();

router.post("/save", verifyToken, async (req, res, next) => {
  const { comment, contentId } = req.body;
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
            id: commentId,
          },
        }
      );
      res.status(200).json({ result: true, error: false, data: result });
      return;
    }
    const result = await Comment.create({
      comment,
      userId: id,
      contentId,
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
      where: {
        id: req.params.commentId,
      },
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

router.get(
  "/get/list/:contentId",
  verifyTokenWithoutErr,
  async (req, res, next) => {
    const { contentId } = req.params;
    const { page, size } = req.query;
    let offset = 0,
      limit = 0;
    limit = Number(size);
    if (page > 0) {
      offset = limit * (page - 1);
    } else offset = 0;

    try {
      const result = await Comment.findAndCountAll({
        where: { contentId },
        order: [["createdAt", "DESC"]],
        include: {
          model: User,
          attributes: ["nickname", "profileImgUrl", "id"],
        },
        limit,
        offset,
      });
      const contents = [...result.rows].reduce((result, item) => {
        let newItem = {
          ...item.dataValues,
          enableEdit: false,
          enableDelete: false,
        };
        if (req.decodeRes) {
          const { id } = req.decoded;
          if (newItem.userId == id) {
            newItem = {
              ...newItem,
              enableEdit: true,
              enableDelete: true,
            };
          }
        }
        result.push(newItem);
        return result;
      }, []);
      res.status(200).json({
        error: false,
        result: true,
        data: {
          contents,
          totalPages: Math.ceil(result.count / limit),
          totalElements: result.count,
        },
      });
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
  }
);

module.exports = router;
