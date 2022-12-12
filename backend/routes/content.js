const express = require("express");
const { verifyToken, verifyTokenWithoutErr } = require("./middlewares");
const Content = require("../models/content");
const File = require("../models/file");
const User = require("../models/user");
const sequelize = require("sequelize");
const { isActiveInServer } = require("../config");
const Op = sequelize.Op;

const router = express.Router();

router.post("/save", verifyToken, async (req, res, next) => {
  try {
    const { title, content, thumbnailUrl, htmlContent, imageIds, public } =
      req.body;
    let newContentId = -1;

    if ("contentId" in req.body) {
      const { contentId } = req.body;
      const result = await Content.update(
        {
          title,
          content,
          thumbnailUrl,
          htmlContent,
          public,
        },
        {
          where: {
            id: contentId,
          },
        }
      );
      res.status(200).json({ error: false, result: true, data: result });
      newContentId = contentId;
      return;
    } else {
      const result = await Content.create({
        title,
        content,
        thumbnailUrl,
        htmlContent,
        userId: req.decoded.id,
        public,
      });
      newContentId = result.dataValues.id;
    }
    const file = await File.update(
      {
        contentId: newContentId,
      },
      {
        where: {
          id: imageIds,
        },
      }
    );
    res.status(200).json({ error: false, result: true, data: true });
  } catch (err) {
    !isActiveInServer && console.error(err);
    res.status(500).json({
      error: true,
      result: false,
      code: 500,
      message: err.message,
      data: null,
    });
  }
});

router.get("/get/list", verifyTokenWithoutErr, async (req, res, next) => {
  try {
    let pageNum = req.query.page; // 요청 페이지 넘버
    const { size } = req.query;
    let offset = 0;

    if (pageNum > 1) {
      offset = 1;
    }

    let where = {};

    if (req.decodeRes) {
      where = {
        [Op.or]: [
          {
            public: true,
          },
          {
            userId: req.decoded.id,
          },
        ],
      };
    } else {
      where = {
        public: true,
      };
    }

    const contents = await Content.findAll({
      include: {
        model: User,
        attributes: ["nickname"],
      },
      where,
      order: [["createdAt", "DESC"]],
    });
    res.status(200).json({ error: false, result: true, data: contents });
  } catch (err) {
    !isActiveInServer && console.error(err);
    res.status(500).json({
      error: true,
      result: false,
      code: 500,
      message: err.message,
      data: null,
    });
  }
});

router.get("/get/list/userWrite", verifyToken, async (req, res, next) => {
  const { page, size } = req.query;
  const { id } = req.decoded;
  let offset = 0,
    limit = 0;
  limit = Number(size);
  if (page > 0) {
    offset = limit * (page - 1);
  } else offset = 0;

  try {
    const result = await Content.findAndCountAll({
      where: {
        userId: id,
      },
      include: {
        model: User,
        attributes: ["nickname"],
      },
      order: [["createdAt", "DESC"]],
      offset,
      limit,
    });
    res.status(200).json({
      error: false,
      result: true,
      data: {
        contents: result.rows,
        totalPages: Math.ceil(result.count / limit),
        totalElements: result.count,
      },
    });
  } catch (err) {
    !isActiveInServer && console.error(err);
    res.status(500).json({
      error: true,
      result: false,
      code: 500,
      message: err.message,
      data: null,
    });
  }
});

router.get("/get/:id", verifyTokenWithoutErr, async (req, res, next) => {
  const { id } = req.params;
  try {
    const blog = await Content.findOne({
      where: { id },
      include: {
        model: User,
        attributes: ["nickname"],
      },
    });
    let data = {
      ...blog.dataValues,
      authorization: {
        writeComment: false,
        reviseContent: false,
        deleteContent: false,
      },
    };
    if (req.decodeRes) {
      data = {
        ...data,
        authorization: {
          ...data.authorization,
          writeComment: true,
        },
      };

      const AccessUserId = req.decoded.id;
      if (blog.userId == AccessUserId) {
        data = {
          ...data,
          authorization: {
            ...data.authorization,
            reviseContent: true,
            deleteContent: true,
          },
        };
      }
    }
    res.status(200).json({ result: true, error: false, data });
  } catch (err) {
    !isActiveInServer && console.error(err);
    res.status(500).json({
      error: true,
      result: false,
      code: 500,
      message: err.message,
      data: null,
    });
  }
});

router.delete("/del/:id", verifyToken, async (req, res, next) => {
  const { id } = req.params;
  try {
    await Content.destroy({
      where: { id },
    });
    await File.destroy({
      where: {
        contentId: id,
      },
    });
    res.status(200).json({ result: true, error: false, data: true });
  } catch (err) {
    !isActiveInServer && console.error(err);
    res.status(500).json({
      error: true,
      result: false,
      code: 500,
      message: err.message,
      data: null,
    });
  }
});

router.get("/search", async (req, res, next) => {
  const { searchTxt } = req.query;
  try {
    const result = await Content.findAll({
      where: {
        [Op.or]: [
          {
            title: {
              [Op.like]: "%" + searchTxt + "%",
            },
          },
          {
            content: {
              [Op.like]: "%" + searchTxt + "%",
            },
          },
        ],
      },
      order: [["createdAt", "DESC"]],
      include: { model: User },
    });
    res.status(200).json({ result: true, error: false, data: result });
  } catch (err) {
    !isActiveInServer && console.error(err);
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
