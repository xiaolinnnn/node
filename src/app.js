const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const session = require('express-session')
//创建app
const app = express();
//静态中间件 中间件一定要在路由前面
app.use(express.static(path.join(__dirname, "statics")));
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

app.use(session({ secret: 'keyboard cat',resave:true,saveUninitialized:true, cookie: { maxAge: 10 * 60000 }}))
//路由
const accountRouter = require(path.join(__dirname, "./routers/accountRouter"));
app.use("/account", accountRouter);
const studentManagerRouter = require(path.join(__dirname,'./routers/studentManagerRouter'));
app.use("/studentmanager",studentManagerRouter);

//监听
app.listen(3000, "127.0.0.1", err => {
  if (err) {
    console.log(err);
  }
  console.log("success");
});
