const mongoose = require("mongoose");

const connect = () => {
  if (process.env.NODE_ENV != "production") mongoose.set("debug", true);

  mongoose.connect(
    `mongodb://${process.env.MONGODB_NICKNAME}:${process.env.MONGODB_PASSWORD}@localhost:${process.env.MONGODB_ACCESS_PORT}/admin`,
    {
      dbName: "blog",
      useNewUrlParser: true,
    },
    (err) => {
      if (err) console.log("몽고디비 연결 에러: ", err);
      else console.log("몽고디비 연결 성공");
    }
  );
};

mongoose.connection.on("error", (err) => {
  console.error("몽고디비 연결 에러: ", err);
});

mongoose.connection.on("disconnected", () => {
  console.error("몽고디비 연결이 끊겼습니다. 연결을 재시도합니다.");
  connect();
});

module.exports = connect;
