const passport = require("passport");
const local = require("./localStrategy");
const AWS = require("aws-sdk");
const dynamodbAccessKey = require("../AWS/dynamodbAccessKey");

AWS.config.update(dynamodbAccessKey);
const dynamoDB = new AWS.DynamoDB.DocumentClient();

module.exports = () => {
  passport.serializeUser((user, done) => {
    done(null, user.email);
  });
  passport.deserializeUser((email, done) => {
    const exixtQuery = {
      TableName: "DevelopBlog_user",
      KeyConditionExpression: "email=:email",
      ExpressionAttributeValues: {
        ":email": email,
      },
    };
    dynamoDB.query(exixtQuery, (err, data) => {
      if (err) {
        done(err);
        return;
      }
      done(null, data.Items[0]);
      return;
    });
  });

  local();
};
