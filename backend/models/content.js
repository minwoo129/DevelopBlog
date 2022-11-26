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
      },
      {
        sequelize,
        timestamps: true,
        underscored: false,
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
