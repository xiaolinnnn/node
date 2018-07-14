const xtpl = require("xtpl");
const path = require("path");

const databasetool = require(path.join(__dirname, "../tools/databasetools"));

exports.getStudentListPage = (req, res) => {
  let searchValue = req.query.searchValue || "";

  databasetool.findList(
    "studentInfo",
    { name: { $regex: searchValue } },
    (err, docs) => {
      xtpl.renderFile(
        path.join(__dirname, "../view/list.html"),
        { studentList: docs, searchValue },
        (err, content) => {
          res.send(content);
        }
      );
    }
  );
};
exports.getAddPage = (req,res)=>{
    xtpl.renderFile(path.join(__dirname,"../view/add.html"),{},(err,content)=>{
        res.send(content);
    })
}
//新增学生
exports.addStudent = (req, res) => {
  //req.body就是post请求的参数
  databasetool.insertOne("studentInfo", req.body, (err, result) => {
    if ((result = null)) {
      //新增失败
      res.send("<script>alert('新增失败')</script>");
    } else {
        res.send('<script>window.location.href = "/studentmanager/list"</script>')
    }
  });
};
