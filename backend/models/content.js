const Sequelize = require("sequelize");

module.exports = class Content extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        title: {
          type: Sequelize.STRING(200),
          allowNull: false,
        },
        content: {
          type: Sequelize.TEXT("long"),
          allowNull: false,
        },
        thumbnailUrl: {
          type: Sequelize.STRING,
          allowNull: false,
          defaultValue:
            "https://developblog.s3.ap-northeast-2.amazonaws.com/image/default/2022/1203/93eb6dd6-8a7a-41ad-93fd-616795fa4bae",
        },
        htmlContent: {
          type: Sequelize.TEXT("long"),
          allowNull: false,
        },
        public: {
          type: Sequelize.BOOLEAN,
          defaultValue: true,
        },
      },
      {
        sequelize,
        timestamps: true,
        underscored: false,
        initialAutoIncrement: 1,
        modelName: "Content",
        tableName: "contents",
        paranoid: true,
        charset: "utf8mb4",
        collate: "utf8mb4_general_ci",
      }
    );
  }

  static associate(db) {
    db.Content.belongsTo(db.User, { foreignKey: "userId", targetKey: "id" });
    db.Content.hasMany(db.Comment, {
      foreignKey: "commentId",
      sourceKey: "id",
    });
  }
};
