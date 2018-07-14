const MongoClient = require("mongodb").MongoClient;
const ObjectId = require("mongodb").ObjectId;
exports.ObjectId = ObjectId;
// Connection URL
const url = "mongodb://localhost:27017";
// Database Name
const dbName = "nbsp";
//抽取数据库的一部分,封装
const getCollection = (collectionName, callback) => {
  MongoClient.connect(
    url,
    { useNewUrlParser: true },
    function(err, client) {
      const db = client.db(dbName);
      //获取集合,进行操作
      const collection = db.collection(collectionName);
      callback(client, collection);
    }
  );
};
//插入一条数据
exports.insertOne = (collectionName, params, callback) => {
  getCollection(collectionName, (client, collection) => {
    collection.insertOne(params, (err, result) => {
      client.close();
      callback(err, result);
    });
  });
};
//查找一条记录
exports.findOne = (collectionName, params, callback) => {
  getCollection(collectionName, (client, collection) => {
    collection.findOne(params, (err, doc) => {
      client.close();
      callback(err, doc);
    });
  });
};
//查找多条数据
exports.findList = (collectionName, params, callback) => {
  getCollection(collectionName, (client, collection) => {
    collection.find(params).toArray((err, docs) => {
      client.close();
      callback(err, docs);
    });
  });
};
//修改数据

exports.updateOne = (collectionName, condition, params, callback) => {
  getCollection(collectionName, (client, collection) => {
    collection.updateOne(condition, { $set: params }, (err, result) => {
      client.close();
      callback(err, result);
    });
  });
};
//删除数据
exports.deleteOne = (collectionName, params, callback) => {
  getCollection(collectionName, (client, collection) => {
    collection.deleteOne(params, (err, result) => {
      client.close();
      callback(err, result);
    });
  });
};
