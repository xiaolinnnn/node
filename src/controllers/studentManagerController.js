const xtpl = require("xtpl");
const path = require("path");
const MongoClient = require("mongodb").MongoClient;

// Connection URL
const url = 'mongodb://localhost:27017';
 
// Database Name
const dbName = 'nbsp';
exports.getStudentListPage = (req,res)=>{
    let searchValue = req.query.searchValue||"";
    MongoClient.connect(url, function(err, client) {
         //获取数据库操作的对象
    const db = client.db(dbName);
        const collection = db.collection('studentInfo');
        collection.find({name:{$regex:searchValue}}).toArray(function(err, docs) {
            xtpl.renderFile(path.join(__dirname,"../view/list.html"),{studentList:docs,searchValue},(err,content)=>{
                res.send(content)
            })
          });
        client.close();
      });
   
}