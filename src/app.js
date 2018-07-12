const express = require("express");
const path = require("path");
//创建app
const app = express();
//静态中间件
app.use(express.static(path.join(__dirname, "statics")));
//引入中间件
const accountRouter = require(path.join(__dirname, "./routers/accountRouter"));
app.use("/account", accountRouter);

//监听
app.listen(3000, "127.0.0.1", err => {
  if (err) {
    console.log(err);
  }
  console.log("success");
});
