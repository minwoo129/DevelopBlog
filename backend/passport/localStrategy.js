const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const AWS = require("aws-sdk");
const dynamodbAccessKey = require("../AWS/dynamodbAccessKey");
const bcrypt = require("bcrypt");

AWS.config.update(dynamodbAccessKey);
const dynamoDB = new AWS.DynamoDB.DocumentClient();

module.exports = () => {
  passport.use(
    new LocalStrategy(
      {
        usernameField: "email",
        passwordField: "password",
      },
      async (email, password, done) => {
        const exixtQuery = {
          TableName: "DevelopBlog_user",
          KeyConditionExpression: "email=:email",
          ExpressionAttributeValues: {
            ":email": email,
          },
        };
        try {
          const exUser = await dynamoDB.query(exixtQuery).promise();
          if (exUser.Count > 0) {
            const result = await bcrypt.compare(
              password,
              exUser.Items[0].password
            );
            if (result) {
              done(null, exUser.Items[0]);
            } else {
              done(null, false, {
                message: "아이디 또는 비밀번호가 일치하지 않습니다.",
              });
            }
          } else {
            done(null, false, {
              message: "아이디 또는 비밀번호가 일치하지 않습니다.",
            });
          }
        } catch (e) {
          console.error(e);
          done(e);
        }
      }
    )
  );
};
