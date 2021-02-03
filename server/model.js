// 链接mongoose
const mongoose = require("mongoose");
const DB_URL = "mongodb://localhost:27017/imooc";
mongoose.connect(DB_URL);
mongoose.connection.on("connected", function () {
  console.log("mongoose connect success!");
});

const models = {
  user: {
    user: { type: String, require: true },
    pwd: { type: String, require: true },
    type: { type: String, require: true },
    //头像
    avatar: { type: String },
    // 个人简介或者职位简介
    desc: { type: String },
    // 职位名
    title: { type: String },
    // 如果你是boss 还有两个字段
    company: { type: String },
    money: { type: String },
  },
  chat: {
    chatid: { type: String, require: true },
    from: { type: String, require: true },
    to: { type: String, require: true },
    read: { type: Boolean, default: false },
    content: { type: String, require: true, default: "" },
    create_time: { type: Number, default: Date.now },
  },
};

for (let key in models) {
  mongoose.model(key, new mongoose.Schema(models[key]));
}

module.exports = {
  getModels: (name) => {
    return mongoose.model(name);
  },
};

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
