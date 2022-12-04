const Sequelize = require("sequelize");

module.exports = class User extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        email: {
          type: Sequelize.STRING(40),
          allowNull: false,
          unique: true,
        },
        name: {
          type: Sequelize.STRING(20),
          allowNull: false,
        },
        password: {
          type: Sequelize.STRING(100),
          allowNull: false,
        },
        isAdmin: {
          type: Sequelize.BOOLEAN,
          allowNull: false,
          defaultValue: false,
        },
        nickname: {
          type: Sequelize.STRING,
          allowNull: false,
        },
      },
      {
        sequelize,
        timestamps: true,
        underscored: false,
        modelName: "User",
        initialAutoIncrement: 1,
        tableName: "users",
        paranoid: false,
        charset: "utf8",
        collate: "utf8_general_ci",
      }
    );
  }

  static associate(db) {
    db.User.hasMany(db.File, { foreignKey: "userId", sourceKey: "id" });
    db.User.hasMany(db.Content, { foreignKey: "userId", sourceKey: "id" });
    db.User.hasMany(db.Comment, { foreignKey: "userId", sourceKey: "id" });
  }
};
