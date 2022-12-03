const express = require("express");
const { verifyToken } = require("./middlewares");
const Content = require("../models/content");
const File = require("../models/file");
const User = require("../models/user");

const router = express.Router();

router.post("/save", verifyToken, async (req, res, next) => {
  try {
    const { title, content, thumbnailUrl, htmlContent, imageIds } = req.body;
    const file = await File.update(
      {
        contentId: result.dataValues.id,
      },
      {
        where: {
          id: imageIds,
        },
      }
    );
    if ("contentId" in req.body) {
      const { contentId } = req.body;
      const result = await Content.update(
        {
          title,
          content,
          thumbnailUrl,
          htmlContent,
        },
        {
          where: {
            id: contentId,
          },
        }
      );
      res.status(200).json({ error: false, result: true, data: result });
      return;
    }
    const result = await Content.create({
      title,
      content,
      thumbnailUrl,
      htmlContent,
      userId: req.decoded.id,
    });

    res.status(200).json({ error: false, result: true, data: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: true,
      result: false,
      code: 500,
      message: err.message,
      data: null,
    });
  }
});

router.get("/get/list", async (req, res, next) => {
  try {
    let pageNum = req.query.page; // 요청 페이지 넘버
    const { size } = req.query;
    let offset = 0;

    if (pageNum > 1) {
      offset = 1;
    }
    const contents = await Content.findAll({
      include: { model: User },
    });
    console.log("contents: ", contents);
    res.status(200).json({ error: false, result: true, data: contents });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: true,
      result: false,
      code: 500,
      message: err.message,
      data: null,
    });
  }
});

module.exports = router;
