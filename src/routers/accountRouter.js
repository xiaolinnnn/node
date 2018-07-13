const express = require("express");
const path = require("path");

//引入中间件
const accountCtrl = require(path.join(
  __dirname,
  "../controllers/accountController"
));
//路由级中间件和应用级中间件一样，只是它绑定的对象为 express.Router()。
const accountRouter = express.Router();

accountRouter.get("/login", accountCtrl.getLoginPage);
//获取验证码
accountRouter.get("/vcode", accountCtrl.getImage);
//获取注册页面
accountRouter.get('/register',accountCtrl.getRegister);
//处理注册请求
accountRouter.post('/register',accountCtrl.register);
//登录
accountRouter.post('/login',accountCtrl.login)
//暴露出去
module.exports = accountRouter;
