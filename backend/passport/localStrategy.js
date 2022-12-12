const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
const User = require("../models/user");
const File = require("../models/file");
const { isActiveInServer } = require("../config");

module.exports = () => {
  passport.use(
    new LocalStrategy(
      {
        usernameField: "email",
        passwordField: "password",
      },
      async (email, password, done) => {
        try {
          const exUser = await User.findOne({
            where: { email },
            attributes: [
              "id",
              "nickname",
              "name",
              "email",
              "profileImgIdx",
              "backgroundImgIdx",
              "password",
            ],
          });
          if (exUser) {
            const result = await bcrypt.compare(password, exUser.password);
            if (result) {
              const { profileImgIdx, backgroundImgIdx } = exUser.dataValues;
              const userFiles = await File.findAll({
                where: {
                  id: [profileImgIdx, backgroundImgIdx],
                },
                attributes: ["id", "publishedUrl"],
              });
              let profileImg = null,
                backgroundImg = null;
              if (profileImgIdx) {
                profileImg = userFiles.find((item) => item.id == profileImgIdx);
              }
              if (backgroundImgIdx) {
                backgroundImg = userFiles.find(
                  (item) => item.id == backgroundImgIdx
                );
              }
              done(null, { ...exUser.dataValues, profileImg, backgroundImg });
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
        } catch (err) {
          !isActiveInServer && console.error(err);
          done(err);
        }
      }
    )
  );
};
