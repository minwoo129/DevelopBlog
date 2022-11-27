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
          type: Sequelize.STRING,
          allowNull: false,
          defaultValue: "",
        },
        thumbnailUrl: {
          type: Sequelize.STRING,
          allowNull: false,
          defaultValue:
            "https://developblog.s3.ap-northeast-2.amazonaws.com/image/2022/1127/f93a392c-bcae-4010-8243-998d90ce7d56",
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
  }
};
