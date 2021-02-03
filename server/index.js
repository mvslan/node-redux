const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

const app = express();
const userRouter = require("./user");

// 这玩意是这么解析的
app.use(cookieParser());
app.use(bodyParser.json());

app.get("/", function (req, res) {
  res.send("hello world1111");
});

app.use("/user", userRouter);

app.get("/data", function (req, res) {
  User.find({}, function (err, data) {
    res.json(data);
  });
});

// 使用socket.io进行通讯
const server = require("http").createServer(app);

const io = require("socket.io")(server, {
  cors: {
    origin: "*:*",
    methods: ["GET", "POST"],
    allowedHeaders: ["my-custom-header"],
    credentials: true,
  },
});

io.on("connection", function (socket) {
  console.log("------------------socket connected");
  socket.on("sendmsg", function (data) {
    console.log(data);
  });
});

server.listen(3010, function () {
  console.log("server is running!");
});
