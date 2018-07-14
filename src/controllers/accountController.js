const path = require("path");
const captchapng = require("captchapng");
const databasetool = require(path.join(__dirname, "../tools/databasetools"));
exports.getLoginPage = (req, res) => {
  res.sendFile(path.join(__dirname, "../view/login.html"));
};
exports.getImage = (req, res) => {
  //1.利用一个第三方的包生成 一张带数字的图片
  const random = parseInt(Math.random() * 9000 + 1000);

  //2.存起来?，存储到session中去了
  req.session.vcode = random;
  var p = new captchapng(80, 30, random); // width,height,numeric captcha
  p.color(0, 0, 0, 0); // First color: background (red, green, blue, alpha)
  p.color(80, 80, 80, 255); // Second color: paint (red, green, blue, alpha)

  var img = p.getBase64();
  var imgbase64 = new Buffer(img, "base64");
  res.writeHead(200, {
    "Content-Type": "image/png"
  });
  res.end(imgbase64);
};
//注册页面
exports.getRegister = (req, res) => {
  res.sendFile(path.join(__dirname, "../view/register.html"));
};
//处理注册请求
/**
 * 暴露出去，注册的方法
 * status : 0 代表成功
 *          1 用户名存在
 *          2 注册失败
 */
exports.register = (req, res) => {
  const result = { status: 0, message: "注册成功" };
  const { username } = req.body;
  //console.log(username);

  databasetool.findOne("userInfo", { username }, (err, doc) => {
    if (doc != null) {
      result.status = 1;
      result.message = "用户名已存在";
      res.json(result);
    } else {
      databasetool.insertOne("userInfo", req.body, (err, result1) => {
        if (result1 == null) {
          result.status = 2;
          result.message = "注册失败!";
        }

        res.json(result);
      });
    }
  });
};

//登录
//  暴露出一个方法，该方法处理具体的登录请求
//   status : 0 成功
//            1 验证码错误
//            2 用户名或是密码错误
exports.login = (req, res) => {
  const result = { status: 0, message: "登录成功" };
  //1.获取到请求体中的内容
  const { username, password, vcode } = req.body;
  //2.验证验证码
  if (vcode != req.session.vcode) {
    result.status = 1;
    result.message = "验证码错误!";

    res.json(result);

    return;
  }
  //验证用户名和密码 //2.1 node连接到mongodb服务端

  databasetool.findOne("userInfo", { username, password }, (err, doc) => {
    if (doc == null) {
      //没查询到
      result.status = 2;
      result.message = "用户名或密码错误";
    }else{
      req.session.loginName = username;
    }
    res.json(result);
  });
};
//登出
exports.logout = (req,res)=>{
   //1.清空session中的用户名
   req.session.loginName = null

   //2.通过响应的形式，跳转到登录页面
   res.send('<script>location.href="/account/login"</script>')
}
