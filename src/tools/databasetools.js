const MongoClient = require("mongodb").MongoClient;

// Connection URL
const url = "mongodb://localhost:27017";

// Database Name
const dbName = "nbsp";
//插入一条数据
exports.insertOne = (collectionName,params,callback)=>{
    MongoClient.connect(url, { useNewUrlParser: true },function(err, client) {
            const db = client.db(dbName);
            //获取集合,进行操作
            const collection = db.collection(collectionName);
            collection.insertOne(params,(err,result)=>{
                client.close();
                callback(err,result)
            })

    })
}
//查找一条记录
exports.findOne = (collectionName,params,callback)=>{
    MongoClient.connect(url, { useNewUrlParser: true },function(err, client) {
            const db = client.db(dbName);
            //获取集合,进行操作
            const collection = db.collection(collectionName);
            collection.findOne(params,(err,result)=>{
                client.close();
                callback(err,result)
            })

    })
}
//查找多条数据
exports.findList = (collectionName,params,callback)=>{
    MongoClient.connect(url, { useNewUrlParser: true },function(err, client) {
        const db = client.db(dbName);
        //获取集合,进行操作
        const collection = db.collection(collectionName);
        collection.find(params).toArray((err,docs)=>{
            client.close();
            callback(err,docs)
        })
    })
}