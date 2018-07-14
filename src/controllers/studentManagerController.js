const xtpl = require("xtpl");
const path = require("path");

const databasetool = require(path.join(__dirname, "../tools/databasetools"));
//列表页
exports.getStudentListPage = (req, res) => {
  let searchValue = req.query.searchValue || "";

  databasetool.findList(
    "studentInfo",
    { name: { $regex: searchValue } },
    (err, docs) => {
      xtpl.renderFile(
        path.join(__dirname, "../view/list.html"),
        { studentList: docs, searchValue,loginName:req.session.loginName },
        (err, content) => {
          res.send(content);
        }
      );
    }
  );
};
//新增页
exports.getAddPage = (req, res) => {
  xtpl.renderFile(
    path.join(__dirname, "../view/add.html"),
    {loginName:req.session.loginName},
    (err, content) => {
      res.send(content);
    }
  );
};
//新增学生
exports.addStudent = (req, res) => {
  //req.body就是post请求的参数
  databasetool.insertOne("studentInfo", req.body, (err, result) => {
    if ((result = null)) {
      //新增失败
      res.send("<script>alert('新增失败')</script>");
    } else {
      res.send(
        '<script>window.location.href = "/studentmanager/list"</script>'
      );
    }
  });
};
//获取编辑页面
exports.getEditPage = (req, res) => {
  let _id = databasetool.ObjectId(req.params.studentId);
  databasetool.findOne("studentInfo", { _id }, (err, doc) => {
    xtpl.renderFile(
      path.join(__dirname, "../view/edit.html"),
      { studentInfo: doc,loginName:req.session.loginName },
      (err, content) => {
        res.send(content);
      }
    );
  });
};
//修改学生的方法
exports.editStudent = (req, res) => {
  let _id = databasetool.ObjectId(req.params.studentId);
  databasetool.updateOne("studentInfo", { _id }, req.body, (err, result) => {
    if ((result = null)) {
      res.send("<script>alert('修改失败')</script>");
    } else {
      res.send("<script>location.href='/studentManager/list'</script>");
    }
  });
};
//删除
exports.deleteStudent = (req, res) => {
  let _id = databasetool.ObjectId(req.params.studentId);

  databasetool.deleteOne("studentInfo", { _id }, (err, result) => {
    if ((result = null)) {
      res.send("<script>alert('删除失败')</script>");
    } else {
      res.send("<script>location.href='/studentManager/list'</script>");
    }
  });
};
