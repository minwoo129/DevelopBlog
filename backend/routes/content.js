const express = require("express");
const { verifyToken } = require("./middlewares");
const Content = require("../models/content");
const File = require("../models/file");

const router = express.Router();

router.post("/save", verifyToken, async (req, res, next) => {
  console.log("query: ", req.query);
  console.log("userId: ", req.decoded.id);
  console.log("body: ", req.body);

  try {
    const { title, content, thumbnailUrl, htmlContent, imageIds } = req.body;
    if ("contentId" in req.body) {
    }
    const result = await Content.create({
      title,
      content,
      thumbnailUrl,
      htmlContent,
      userId: req.decoded.userId,
    });
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
    res.status(200).json({ error: false, result: true, data: true });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({
        error: true,
        result: false,
        code: 500,
        message: err.message,
        data: null,
      });
  }
});

module.exports = router;
