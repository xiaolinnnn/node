const express = require('express')
const path = require('path')

const studentManagerRouter = express.Router()

//导入控制器
const studentManagerCTRL = require(path.join(__dirname,"../controllers/studentManagerController"))

//处理请求
//获取学生列表页面
studentManagerRouter.get('/list',studentManagerCTRL.getStudentListPage)
//获取新增页面
studentManagerRouter.get('/add',studentManagerCTRL.getAddPage);
//新增学生
studentManagerRouter.post('/add',studentManagerCTRL.addStudent);
//编辑页面
studentManagerRouter.get('/edit/:studentId',studentManagerCTRL.getEditPage);
//修改
studentManagerRouter.post('/edit/:studentId',studentManagerCTRL.editStudent);
//删除
studentManagerRouter.get('/delete/:studentId',studentManagerCTRL.deleteStudent);

module.exports = studentManagerRouter