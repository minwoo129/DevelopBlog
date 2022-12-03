const Sequelize = require("sequelize");

module.exports = class File extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        uploadType: {
          type: Sequelize.STRING(30),
          allowNull: false,
        },
        mimeType: {
          type: Sequelize.STRING(100),
          allowNull: false,
        },
        originalname: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        size: {
          type: Sequelize.INTEGER,
          allowNull: false,
          defaultValue: 0,
        },
        publishedUrl: {
          // location
          type: Sequelize.STRING,
          allowNull: false,
        },
        acl: {
          type: Sequelize.STRING(30),
          allowNull: false,
        },
        bucket: {
          type: Sequelize.STRING(30),
          allowNull: false,
          defaultValue: "developblog",
        },
        contentType: {
          type: Sequelize.STRING(30),
          allowNull: false,
        },
        encoding: {
          type: Sequelize.STRING(30),
          allowNull: false,
        },
        fieldname: {
          type: Sequelize.STRING(30),
          allowNull: false,
        },
        key: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        storageClass: {
          type: Sequelize.STRING(30),
          allowNull: false,
        },
        contentId: {
          type: Sequelize.INTEGER,
          allowNull: true,
        },
      },
      {
        sequelize,
        timestamps: true,
        underscored: false,
        initialAutoIncrement: 1,
        modelName: "File",
        tableName: "files",
        paranoid: true,
        charset: "utf8mb4",
        collate: "utf8mb4_general_ci",
      }
    );
  }

  static associate(db) {
    db.File.belongsTo(db.User, { foreignKey: "userId", targetKey: "id" });
  }
};
