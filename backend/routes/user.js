const express = require("express");
const AWS = require("aws-sdk");
const dynamodbAccessKey = require("../AWS/dynamodbAccessKey");
const { v4 } = require("uuid");
const bcrypt = require("bcrypt");

const router = express.Router();
AWS.config.update(dynamodbAccessKey);
const dynamoDB = new AWS.DynamoDB.DocumentClient();

router.post("/login", async (req, res, next) => {});

router.post("/join", async (req, res, next) => {
  const { email, password, name } = req.body;
  const exixtQuery = {
    TableName: "DevelopBlog_user",
    KeyConditionExpression: "email=:email",
    ExpressionAttributeValues: {
      ":email": email,
    },
  };
  try {
    const existUser = await dynamoDB.query(exixtQuery).promise();
    if (existUser.Count > 0) {
      res
        .status(400)
        .json({ error: true, code: 400, data: "이미 존재하는 이메일입니다." });
      return;
    }
    const hash = await bcrypt.hash(password, 12);
    const joinQuery = {
      TableName: "DevelopBlog_user",
      Item: {
        email,
        password: hash,
        name,
      },
    };
    const result = await dynamoDB.put(joinQuery).promise();
    res.status(200).json({ code: 200, data: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: true, code: 500, data: err });
  }
});

router.get("/getList", async (req, res, next) => {
  const query = {
    TableName: "DevelopBlog_user",
  };
  try {
    const result = await dynamoDB.scan(query).promise();
    res.status(200).json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: true, code: 500, data: err });
  }
});

router.get("/getOne", async (req, res, next) => {
  const { email } = req.query;
  let query = {
    TableName: "DevelopBlog_user",
    KeyConditionExpression: "email=:email",
    ExpressionAttributeValues: {
      ":email": email,
    },
  };
  try {
    const result = await dynamoDB.query(query).promise();
    res.status(200).json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: true, code: 500, data: err });
  }
});

module.exports = router;
