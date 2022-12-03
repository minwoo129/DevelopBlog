const Sequelize = require("sequelize");
const User = require("./user");
const File = require("./file");
const Content = require("./content");
const Comment = require("./comment");

const env = process.env.NODE_ENV || "development";
const config = require("../config/config")[env];
const db = {};

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

db.sequelize = sequelize;

db.User = User;
db.File = File;
db.Content = Content;
db.Comment = Comment;

User.init(sequelize);
File.init(sequelize);
Content.init(sequelize);
Comment.init(sequelize);

User.associate(db);
File.associate(db);
Content.associate(db);
Comment.associate(db);

module.exports = db;
