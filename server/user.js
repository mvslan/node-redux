const { json } = require("express");
const express = require("express");
const Router = express.Router();
const utils = require("utility");

const model = require("./model");
const User = model.getModels("user");
const _filter = { pwd: 0, __v: 0 };

Router.post("/login", function (req, res) {
  const { user, pwd } = req.body;
  // 第一个参数是查询条件，第二个是显示条件
  User.findOne({ user, pwd }, _filter, (err, doc) => {
    if (!doc) {
      return res.json({ code: 1, msg: "用户名或密码错误！" });
    }
    res.cookie("userid", doc._id);
    res.json({ code: 0, data: doc });
  });
});
Router.post("/register", function (req, res) {
  const { user, pwd, type } = req.body;
  //查询是否已经存在
  User.findOne({ user }, (err, doc) => {
    if (doc) {
      return res.json({ code: 1, msg: "用户名重复" });
    }
    // 这里先不进行加密
    const UserModel = new User({ user, type, pwd });
    // 注册之后直接跳转到内容页面，所以需要id来设置cookie
    UserModel.save(function (err, data) {
      if (err) {
        return res.json({ code: 1, msg: "后端出错了" });
      }
      const { user, type, _id } = data;
      console.log(data);
      res.cookie("userid", _id);
      res.json({ code: 0, data });
    });

    // create没办法获取到id
    // User.create(newUser, (err, doc) => {
    //   if (err) {
    //     return res.json({ code: 1, msg: "后端出错了" });
    //   }
    //   return res.json({ code: 0 });
    // });
  });
});

//这个是给路由守卫使用的
Router.get("/info", function (req, res) {
  const { userid } = req.cookies;
  if (!userid) {
    return res.json({ code: 1, msg: "用户未登录" });
  }
  User.findOne({ _id: userid }, _filter, function (err, doc) {
    if (err) {
      return res.json({ code: 1, msg: "后端出错了" });
    }
    if (doc) {
      return res.json({ code: 0, data: doc });
    }
  });
});

Router.post("/update", function (req, res) {
  const userid = req.cookies.userid;
  if (!userid) {
    return res.json({ code: 1 });
  }
  const body = req.body;
  // 查找数据并更新
  User.findByIdAndUpdate(userid, body, function (err, doc) {
    const data = Object.assign(
      {},
      {
        user: doc.user,
        type: doc.type,
      },
      body
    );
    res.json({ code: 0, data });
  });
});

// 获取列表
Router.get("/list", function (req, res) {
  const { type } = req.query;
  User.find({ type }, function (err, doc) {
    res.json({ code: 0, data: doc });
  });
});

function md5Pwd(pwd) {
  const salt = "imooc_is_good_3957x8yza6!@#IUHJh~~";
  return utils.md5(utils.md5(pwd + salt));
}

module.exports = Router;
