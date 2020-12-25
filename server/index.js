const express = require("express");
const app = express();
// 链接mongoose
const mongoose = require("mongoose");
const DB_URL = "mongodb://localhost:27017/imooc";
mongoose.connect(DB_URL);
mongoose.connection.on("connected", function () {
  console.log("mongoose connect success!");
});

const User = mongoose.model(
  "user",
  new mongoose.Schema({
    username: { type: String, require: true },
    age: { type: Number, require: true },
  })
);
// 新增数据
// User.create(
//   {
//     username: "悟空",
//     age: 700,
//   },
//   function (err, data) {
//     if (!err) {
//       console.log(data);
//     } else {
//       console.log("创建出错了");
//       console.log(err);
//     }
//   }
// );

app.get("/", function (req, res) {
  res.send("hello world1111");
});

app.get("/data", function (req, res) {
  User.find({}, function (err, data) {
    res.json(data);
  });
});

app.listen(3010, function () {
  console.log("server is running!");
});
