const express = require("express");
const AWS = require("aws-sdk");
const dynamodbAccessKey = require("../AWS/dynamodbAccessKey");
const { v4 } = require("uuid");
const bcrypt = require("bcrypt");

const router = express.Router();
AWS.config.update(dynamodbAccessKey);
const dynamoDB = new AWS.DynamoDB.DocumentClient();

router.post("/", async (req, res, next) => {
  const { email, pwd, name } = req.body;

  try {
    const hash = await bcrypt.hash(pwd, 12);
    dynamoDB.put(
      {
        TableName: "devblog_user_test",
        Item: {
          id: v4().split("-").join(""),
          email,
          pwd: hash,
          name,
        },
      },
      (err, data) => {
        if (err) {
          console.error(err);
          return next(err);
        }

        res.send("ok");
      }
    );
  } catch (error) {
    console.error(error);
    return next(error);
  }
});

module.exports = router;
